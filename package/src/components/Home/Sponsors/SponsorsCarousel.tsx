'use client'
import Image from 'next/image'

const logos = [
  { src: '/images/terdimage/2025-JustCamping logo-8x8 flag-01.png', alt: 'Placeholder 1' },
  { src: '/images/terdimage/CampFest2025 Logo.jpg', alt: 'Placeholder 2' },
  { src: '/images/terdimage/kamp charlie nae.jpg', alt: 'Placeholder 3' },
  { src: '/images/terdimage/campfestbg.png', alt: 'Placeholder 4' },
  { src: '/images/terdimage/campfestimage.jpg', alt: 'Placeholder 5' },
  { src: '/images/terdimage/2025-JustCamping logo-8x8 flag-01.png', alt: 'Placeholder 6' },
  { src: '/images/terdimage/CampFest2025 Logo.jpg', alt: 'Placeholder 7' },
  { src: '/images/terdimage/kamp charlie nae.jpg', alt: 'Placeholder 8' },
  { src: '/images/terdimage/campfestbg.png', alt: 'Placeholder 9' },
  { src: '/images/terdimage/campfestimage.jpg', alt: 'Placeholder 10' },
];

export default function SponsorsCarousel() {
  return (
    <section className='py-0'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <h2 className='mx-auto w-fit text-center uppercase tracking-wide text-white text-2xl sm:text-3xl font-extrabold mb-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] [text-shadow:0_0_18px_rgba(255,255,255,0.8),0_0_8px_rgba(255,255,255,0.6)]'>
          Our Sponsors
        </h2>
        <div className='relative w-full overflow-hidden whitespace-nowrap py-4'>
          <div className='animate-scroll flex'>
            {logos.map((logo, index) => (
              <div key={index} className='shrink-0 flex justify-center items-center mx-10'>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={50}
                  className='h-8 sm:h-10 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                  priority={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
