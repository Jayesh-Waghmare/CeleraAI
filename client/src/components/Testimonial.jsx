const Testimonial = () => {
    const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000',
            name: 'Liam Mitchell',
            handle: '@liamdev',
            date: 'July 2, 2025',
            quote: 'CeleraAI’s AI‑powered resume review gave me clarity and confidence—landing interviews became effortless.'
        },
        {
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
            name: 'Olivia Bennett',
            handle: '@oliviacreations',
            date: 'July 11, 2025',
            quote: 'The background-remover tool elevated my content—no more distracting elements, only polished visuals.'
        },
        {
            image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=200&h=200&q=80',
            name: 'Noah Adams',
            handle: '@noahideas',
            date: 'July 9, 2025',
            quote: 'CeleraAI’s blog title generator sparked creativity and we doubled our article output in days.'
        },
        {
            image: 'https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFuJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000',
            name: 'Ethan Walker',
            handle: '@ethanbuilds',
            date: 'July 14, 2025',
            quote: 'Thanks to the AI image creator, our community visuals now reflect our public engagement is through the roof.'
        },
        {
            image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=200',
            name: 'Sophia Clark',
            handle: '@sophiadesigns',
            date: 'July 16, 2025',
            quote: 'It’s like having a full creative team in one AI-powered dashboard.'
        },
        {
            image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200',
            name: 'Emily Carter',
            handle: '@emwritesblogs',
            date: 'June 12, 2025',
            quote: 'Uploading my draft to CeleraAI and getting a full article draft in minutes? Game changer.'
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200',
            name: 'Jordan Lee',
            handle: '@jordantalks',
            date: 'June 5, 2025',
            quote: 'CeleraAI’s tone analysis ensured our blog stayed consistent and true to voice across all posts.'
        },
        {
            image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
            name: 'Marcus Chen',
            handle: '@iammarcus',
            date: 'April 20, 2025',
            quote: 'The resume‑review feature uncovered key strengths I never noticed—now I’m landing roles I once thought out of reach.'
        },
        {
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200',
            name: 'Avery Johnson',
            handle: '@averywrites',
            date: 'May 10, 2025',
            quote: 'From catchy blog ideas to professional visuals, CeleraAI is my creative co‑pilot.'
        },
        {
            image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=200&q=80',
            name: 'Jamie Stewart',
            handle: '@jamiecreatesvisual',
            date: 'July 17, 2025',
            quote: 'With background removal and image generation in one dashboard, I create brand‑worthy visuals in minutes.'
        }
    ];

    const topRow    = cardsData.filter((_, i) => i % 2 === 0);
    const bottomRow = cardsData.filter((_, i) => i % 2 !== 0);

    const CreateCard = ({ card }) => (
        <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0">
            <div className="flex gap-2">
                <img className="size-11 rounded-full" src={card.image} alt="User Image" />
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p>{card.name}</p>
                        <svg className="mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" fill="#2196F3" />
                        </svg>
                    </div>
                    <span className="text-xs text-slate-500">{card.handle}</span>
                </div>
            </div>
            <p className="text-sm py-4 text-gray-800">{card.quote}</p>
            <div className="flex items-center justify-between text-slate-500 text-xs">
                <div className="flex items-center gap-1">
                    <span>Posted on</span>
                    <a href="https://x.com" target="_blank" className="hover:text-sky-500">
                        <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z" fill="currentColor" />
                        </svg>
                    </a>
                </div>
                <p>{card.date}</p>
            </div>
        </div>
    );

    return (
        <>
            <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }

            .marquee-inner {
                display: flex;
                width: fit-content;
                animation: marqueeScroll 40s linear infinite;
            }

            .marquee-reverse {
                animation-direction: reverse;
            }
            `}</style>


            <div className='text-center'>
                <h2 className='text-slate-700 text-[42px] font-semibold'>Loved by Creators</h2>
                <p className='text-gray-500 max-w-lg mx-auto'>Don't just take our word for it. Here's what our users are saying.</p>
            </div>

            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
                    { topRow.concat(topRow).map((card, idx) => (
                        <CreateCard key={idx} card={card} />
                    ))}

                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>

            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
                    { bottomRow.concat(bottomRow).map((card, idx) => (
                        <CreateCard key={idx} card={card} />
                    ))}

                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>
        </>
    );
};

export default Testimonial;
