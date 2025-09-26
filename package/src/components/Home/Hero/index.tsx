'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SponsorsCarousel from '@/components/Home/Sponsors/SponsorsCarousel'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const Hero: React.FC = () => {
  return (
    <section 
      className='!py-0'
      style={{
        backgroundColor: 'black',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='relative min-h-screen pt-24'>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0 flex flex-col justify-center flex-grow pt-24 md:pt-32 pb-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-1'>
            <div className='text-white text-center lg:text-start z-10 order-2 lg:order-1'>
              <h1 className='text-inherit text-4xl sm:text-6xl md:text-7xl font-semibold -tracking-wider mt-4 mb-6 leading-tight'>
                <Image
                  src={'/images/terdimage/CampFest2025 Logo.jpg'}
                  alt='Campfest 2025 Logo'
                  width={600}
                  height={250}
                  priority={true}
                  className="mx-auto lg:mx-0"
                />
              </h1>
              <div className='flex flex-col xs:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mt-6'>
                <Link href="/tickets" className='px-6 py-3 sm:px-8 sm:py-4 border border-white bg-white text-dark duration-300 hover:bg-transparent hover:text-white text-sm sm:text-base font-semibold rounded-full hover:cursor-pointer'>
                  Buy tickets
                </Link>
                <Link href="/properties" className='px-6 py-3 sm:px-8 sm:py-4 border border-white bg-transparent text-white hover:bg-white hover:text-dark duration-300 text-sm sm:text-base font-semibold rounded-full hover:cursor-pointer active:scale-95 transition-all'>
                  Sponsors
                </Link>
              </div>
            </div>

            <div className='w-full order-1 lg:order-2'>
              <Carousel
                plugins={[
                  Autoplay({ delay: 3000 })
                ]}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                    <CarouselItem>
                        <Image
                            src={'/images/hero_image/KampCharlie Nae Homepage pic1.jpg'}
                            alt='heroImg'
                            width={1200}
                            height={1120}
                            priority={false}
                            unoptimized={true}
                            className="w-full h-auto object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src={'/images/hero_image/pic1.jpg'}
                            alt='heroImg'
                            width={1200}
                            height={1120}
                            priority={false}
                            unoptimized={true}
                            className="w-full h-auto object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src={'/images/hero_image/pic2.jpg'}
                            alt='heroImg'
                            width={1200}
                            height={1120}
                            priority={false}
                            unoptimized={true}
                            className="w-full h-auto object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src={'/images/hero_image/pic3.jpg'}
                            alt='heroImg'
                            width={1200}
                            height={1120}
                            priority={false}
                            unoptimized={true}
                            className="w-full h-auto object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src={'/images/hero_image/pic4.jpg'}
                            alt='heroImg'
                            width={1200}
                            height={1120}
                            priority={false}
                            unoptimized={true}
                            className="w-full h-auto object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src={'/images/hero_image/pic5.jpg'}
                            alt='heroImg'
                            width={1200}
                            height={1120}
                            priority={false}
                            unoptimized={true}
                            className="w-full h-auto object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src={'/images/hero_image/pic6.jpg'}
                            alt='heroImg'
                            width={1200}
                            height={1120}
                            priority={false}
                            unoptimized={true}
                            className="w-full h-auto object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src={'/images/hero_image/pic7.jpg'}
                            alt='heroImg'
                            width={1200}
                            height={1120}
                            priority={false}
                            unoptimized={true}
                            className="w-full h-auto object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>

        <div className='mt-6'>
          <SponsorsCarousel />
        </div>
      </div>
    </section>
  )
}

export default Hero
