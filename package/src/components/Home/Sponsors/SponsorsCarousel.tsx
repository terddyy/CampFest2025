'use client'
import Image from 'next/image'

const logos = [
  { src: '/images/header/logo.svg', alt: 'Logo' },
  { src: '/images/documentation/axios.svg', alt: 'Axios' },
  { src: '/images/documentation/Categories=Nextjs.svg', alt: 'Next.js' },
  { src: '/images/documentation/Categories=React.svg', alt: 'React' },
  { src: '/images/documentation/Categories=Tailwind.svg', alt: 'Tailwind' },
  { src: '/images/documentation/Categories=Typescript.svg', alt: 'TypeScript' },
]

// Duplicate array for seamless loop
const repeated = [...logos, ...logos, ...logos]

export default function SponsorsCarousel() {
  return (
    <section className='py-6 sm:py-8'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <h2 className='mx-auto w-fit text-center uppercase tracking-wide text-white text-2xl sm:text-3xl font-extrabold mb-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] [text-shadow:0_0_18px_rgba(255,255,255,0.8),0_0_8px_rgba(255,255,255,0.6)]'>
          Our Sponsors
        </h2>
        <div className='group relative overflow-hidden'>
          <div className='flex items-center gap-10 sm:gap-14 md:gap-20 group-hover:[animation-play-state:paused] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'>
            <div className='flex animate-[slideLeft_linear_infinite_28s] gap-10 sm:gap-14 md:gap-20'>
              {repeated.map((logo, index) => (
                <div key={index} className='shrink-0'>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={140}
                    height={50}
                    className='h-8 sm:h-10 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes slideLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  )
}


