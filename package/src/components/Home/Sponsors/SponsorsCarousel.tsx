'use client'
import Image from 'next/image'

export default function SponsorsCarousel() {
  return (
    <section className='py-0'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <h2 className='mx-auto w-fit text-center uppercase tracking-wide text-white text-2xl sm:text-3xl font-extrabold mb-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] [text-shadow:0_0_18px_rgba(255,255,255,0.8),0_0_8px_rgba(255,255,255,0.6)]'>
          Our Sponsors
        </h2>
        <div className='relative w-full overflow-hidden whitespace-nowrap py-4'>
          <div className='animate-scroll flex'>
            <div className='shrink-0 flex justify-center items-center mx-10'>
              <Image
                src='/images/sponsorslogo/Bluetti Logo.png'
                alt='Bluetti Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-10'>
              <Image
                src='/images/sponsorslogo/Clapmoto Logo.jpg'
                alt='Clapmoto Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-10'>
              <Image
                src='/images/sponsorslogo/Gorilla LOGO-cropped.JPG'
                alt='Gorilla Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-10'>
              <Image
                src='/images/sponsorslogo/Maarte Campers Outdoor Gears Logo.jpg'
                alt='Maarte Campers Outdoor Gears Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-10'>
              <Image
                src='/images/sponsorslogo/Bluetti Logo.png'
                alt='Bluetti Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-10'>
              <Image
                src='/images/sponsorslogo/Clapmoto Logo.jpg'
                alt='Clapmoto Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-10'>
              <Image
                src='/images/sponsorslogo/Gorilla LOGO-cropped.JPG'
                alt='Gorilla Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-10'>
              <Image
                src='/images/sponsorslogo/Maarte Campers Outdoor Gears Logo.jpg'
                alt='Maarte Campers Outdoor Gears Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            
            <div className='shrink-0 flex justify-center items-center mx-10 w-[200px] h-[75px] bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm font-bold rounded-md'>
              Placeholder Logo
            </div>
            <div className='shrink-0 flex justify-center items-center mx-10 w-[200px] h-[75px] bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm font-bold rounded-md'>
              Placeholder Logo
            </div>
            <div className='shrink-0 flex justify-center items-center mx-10 w-[200px] h-[75px] bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm font-bold rounded-md'>
              Placeholder Logo
            </div>
            <div className='shrink-0 flex justify-center items-center mx-10 w-[200px] h-[75px] bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm font-bold rounded-md'>
              Placeholder Logo
            </div>
            <div className='shrink-0 flex justify-center items-center mx-10 w-[200px] h-[75px] bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm font-bold rounded-md'>
              Placeholder Logo
            </div>
            <div className='shrink-0 flex justify-center items-center mx-10 w-[200px] h-[75px] bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm font-bold rounded-md'>
              Placeholder Logo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
