import OpenAI from "openai"
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
import pdf from 'pdf-parse/lib/pdf-parse.js'
import { Buffer } from 'buffer';

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
})

export const generateArticle = async (req, res) => {
    try{
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >= 10){
            return res.json({success: false, message: "Limit reached. Upgrade to continue."})
        }

        // Generate the response
        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {role: "user", content: prompt}
            ],
            temperature: 0.7,
            max_tokens: length,
        });

        const content = response.choices[0].message.content

        // Store the response in the database
        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES(${userId}, ${prompt}, ${content}, 'article')`;

        if(plan !== 'premium'){
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage+1
                }
            })
        }
        
        res.json({success: true, content})
    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

export const generateBlogTitle = async (req, res) => {
    try{
        const { userId } = req.auth();
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >= 10){
            return res.json({success: false, message: "Limit reached. Upgrade to continue."})
        }

        // Generate the response
        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {role: "user", content: prompt}
            ],
            temperature: 0.7,
            max_tokens: 100,
        });

        const content = response.choices[0].message.content

        // Store the response in the database
        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES(${userId}, ${prompt}, ${content}, 'blog-title')`;

        if(plan !== 'premium'){
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage+1
                }
            })
        }
        
        res.json({success: true, content})
    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== 'premium') {
      return res.json({
        success: false,
        message: 'This feature is only available for premium subscriptions',
      });
    }

    const HF_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0';

    // Generate the response
    const response = await axios({
      method: 'POST',
      url: HF_URL,
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'image/png',
      },
      data: JSON.stringify({
        inputs: prompt,
      }),
      responseType: 'arraybuffer',
    });

    // base64 image
    const base64Image = `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;

    // upload it in the cloudinary
    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    // store it in the database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    const errMsg = error.response?.data || error.message;
    console.error('Image Generation Error:', errMsg);
    res.json({ success: false, message: 'Image generation failed: ' + errMsg });
  }
};

// export const generateImage = async (req, res) => {
//     try{
//         const { userId } = req.auth();
//         const { prompt, publish } = req.body;
//         const plan = req.plan;

//         if(plan !== 'premium'){
//             return res.json({success: false, message: "This feature is only available for premium subscriptions"})
//         }

//         const formData= new FormData()
//         formData.append('prompt', prompt)

//         // Get the response from the AI call
//         const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
//             headers: {'x-api-key': process.env.CLIPDROP_API_KEY},
//             responseType: "arraybuffer"
//         })

//         // base64 image
//         const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

//         // upload in the cloudinary
//         const {secure_url} = await cloudinary.uploader.upload(base64Image)
        
//         // Store the response in the database
//         await sql` INSERT INTO creations (user_id, prompt, content, type, publish)
//         VALUES(${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`;
        
//         res.json({success: true, content: secure_url})
//     }
//     catch(error){
//         console.log(error.message)
//         res.json({success: false, message: error.message})
//     }
// }

export const removeImageBackground = async (req, res) => {
    try{
        const { userId } = req.auth();
        const image = req.file;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({success: false, message: "This feature is only available for premium subscriptions"})
        }

        // Remove the background image and upload in the cloudinary
        const {secure_url} = await cloudinary.uploader.upload(image.path, {
            transformation: [
                {
                    effect: 'background_removal',
                    background_removal: 'remove_the_background'
                }
            ]
        });
        
        // Store the response in the database
        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES(${userId}, 'Remove background from image', ${secure_url}, 'image')`;
        
        res.json({success: true, content: secure_url})
    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

export const removeImageObject = async (req, res) => {
    try{
        const { userId } = req.auth();
        const { object } = req.body;
        const image = req.file;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({success: false, message: "This feature is only available for premium subscriptions"})
        }

        // upload in the cloudinary
        const {public_id} = await cloudinary.uploader.upload(image.path);

        // Remove the object from the uploaded image
        const imageUrl = cloudinary.url(public_id, {
            transformation: [{effect: `gen_remove:${object}`}],
            resource_type: 'image'
        })
        
        // Store the response in the database
        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES(${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;
        
        res.json({success: true, content: imageUrl})
    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

export const resumeReview = async (req, res) => {
    try{
        const { userId } = req.auth();
        const resume = req.file;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({success: false, message: "This feature is only available for premium subscriptions"})
        }

        if(resume.size > 5 * 1024 * 1024){
            return res.json({success: false, message: "Resume file size exceeds allowed size (5MB)"})
        }

        const dataBuffer = fs.readFileSync(resume.path)

        // Parse the resume and get the text
        const pdfData = await pdf(dataBuffer)

        const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{role: "user", content: prompt, }],
            temperature: 0.7,
            max_tokens: 1000,
        })

        const content = response.choices[0].message.content
        
        // Store the response in the database
        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;
        
        res.json({success: true, content})
    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}