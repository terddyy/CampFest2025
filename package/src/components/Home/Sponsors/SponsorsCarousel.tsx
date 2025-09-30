'use client'
import Image from 'next/image'

export default function SponsorsCarousel() {
  return (
    <section className='py-0'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        
        <div className='relative w-full overflow-hidden whitespace-nowrap py-4'>
          <div className='animate-scroll flex'>
            <div className='shrink-0 flex justify-center items-center mx-5 sm:mx-10'>
              <Image
                src='/images/sponsorslogo/Bluetti Logo.png'
                alt='Bluetti Southeast Asia Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-5 sm:mx-10'>
              <Image
                src='/images/sponsorslogo/clapmotovectorized.png'
                alt='CLAP MOTO Project Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-5 sm:mx-10'>
              <Image
                src='/images/sponsorslogo/Gorilla LOGO-cropped.JPG'
                alt='Gorilla Outdoors Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-5 sm:mx-10'>
              <Image
                src='/images/sponsorslogo/Maarte Campers Outdoor Gears Logo.jpg'
                alt='Maarte Campers Outdoor Gears Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-5 sm:mx-10'>
              <Image
                src='/images/sponsorslogo/Cobb Philippines Logo (1).jpg'
                alt='COBB Philippines Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            {/* Duplicate for infinite scroll effect */}
            <div className='shrink-0 flex justify-center items-center mx-5 sm:mx-10'>
              <Image
                src='/images/sponsorslogo/Bluetti Logo.png'
                alt='Bluetti Southeast Asia Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-5 sm:mx-10'>
              <Image
                src='/images/sponsorslogo/clapmotovectorized.png'
                alt='CLAP MOTO Project Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-5 sm:mx-10'>
              <Image
                src='/images/sponsorslogo/Gorilla LOGO-cropped.JPG'
                alt='Gorilla Outdoors Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-5 sm:mx-10'>
              <Image
                src='/images/sponsorslogo/Maarte Campers Outdoor Gears Logo.jpg'
                alt='Maarte Campers Outdoor Gears Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
            <div className='shrink-0 flex justify-center items-center mx-5 sm:mx-10'>
              <Image
                src='/images/sponsorslogo/Cobb Philippines Logo (1).jpg'
                alt='COBB Philippines Logo'
                width={200}
                height={75}
                className='h-12 sm:h-16 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
