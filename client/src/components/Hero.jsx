import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
  const navigate = useNavigate()
  const companyLogos = ["slack", "framer", "netflix", "google", "linkedin", "instagram", "facebook"];

  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center items-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen pt-30'>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
      
      <div className='text-center mb-6'>
        <h3 className='text-3xl sm:text-5xl md:text-5xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>
          Craft Next-Level Content <br/> with <span className='text-primary'>AI tools</span>
        </h3>
        <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
        <button 
          onClick={() => navigate('/ai')} 
          className='bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer'
        >
          Start creating now
        </button>
      </div>

      <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
        <img src={assets.user_group} alt="" className='h-8'/> 
        Trusted by 10K+ people
      </div>

      {/* Company Logos Marquee */}
      <div className='mt-12 mb-8'>
        <p className='text-center text-sm text-gray-500 mb-6'>Trusted by leading companies</p>
        <div className="overflow-hidden w-full relative max-w-4xl mx-auto select-none">
          <div className="absolute left-0 top-0 h-full w-16 sm:w-20 z-10 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="marquee-inner flex will-change-transform min-w-[200%]" style={{ 
            animationDuration: window.innerWidth < 640 ? "12s" : window.innerWidth < 1024 ? "16s" : "20s" 
          }}>
            <div className="flex items-center">
              {[...companyLogos, ...companyLogos].map((company, index) => (
                <div key={index} className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 transition-all duration-300">
                  <img 
                    src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
                    alt={company} 
                    className="h-6 sm:h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300" 
                    draggable={false} 
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-16 sm:w-20 z-10 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent" />
        </div>
      </div>
    </div>
  )
}

export default Hero