'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SponsorsCarousel from '@/components/Home/Sponsors/SponsorsCarousel'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  // const [showSponsors, setShowSponsors] = React.useState(false);

  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSponsors(true);
  //   }, 50); // A small delay to allow initial render

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <section 
      className='min-h-screen'
      style={{
        backgroundColor: 'black',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='relative flex flex-col justify-between'>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0 flex flex-col justify-center flex-grow min-h-[calc(100vh-var(--header-height-mobile))] lg:min-h-[calc(100vh-var(--header-height-desktop))] pb-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-8'>
            <div className='text-white text-center lg:text-start z-10 order-2 lg:order-1'>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <Icon icon="solar:user-bold" width={24} height={24} className="text-white" />
                <p className="text-xl font-semibold text-white">200 attending</p>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <Icon icon="mdi:car" width={24} height={24} className="text-white" />
                <p className="text-xl font-semibold text-white">100 rigs</p>
              </div>
              <h1 className='text-inherit text-4xl sm:text-6xl md:text-7xl font-semibold -tracking-wider mt-4 mb-6 leading-tight'>
                <Image
                  src={'/images/terdimage/CampFest2025 Logo.jpg'}
                  alt='Campfest 2025 Logo'
                  width={600}
                  height={250}
                  priority={true}
                  className="mx-auto lg:mx-0 h-auto w-auto"
                />
              </h1>
              <div className='flex flex-col xs:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mt-6'>
                <Link href="/tickets" className='px-6 py-3 sm:px-8 sm:py-4 border border-white bg-white text-dark duration-300 hover:bg-transparent hover:text-white text-sm sm:text-base font-semibold rounded-full hover:cursor-pointer'>
                  Buy tickets
                </Link>
                <Link href="#info-section" className='px-6 py-3 sm:px-8 sm:py-4 border border-white bg-transparent text-white hover:bg-white hover:text-dark duration-300 text-sm sm:text-base font-semibold rounded-full hover:cursor-pointer'>
                  Event Info
                </Link>
                <motion.button
                  onClick={() => {
                    document.getElementById('sponsors')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className='px-6 py-3 sm:px-8 sm:py-4 border border-white bg-transparent text-white hover:bg-white hover:text-dark duration-300 text-sm sm:text-base font-semibold rounded-full hover:cursor-pointer active:scale-95 transition-all'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9, opacity: 0.8 }}
                  transition={{ duration: 0.1 }}
                >
                  Sponsors
                </motion.button>
              </div>
            </div>

            <div className='w-full order-1 lg:order-2 pt-10 lg:pt-[var(--carousel-top-padding)]'>
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
                    <CarouselItem className="h-[250px] sm:h-[400px] md:h-[500px]">
                        <Image
                            src={'/images/hero_image/KampCharlie Nae Homepage pic1.jpg'}
                            alt='heroImg'
                            width={1200}
                            height={1120}
                            priority={true}
                            unoptimized={true}
                            className="w-full h-auto object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                    </CarouselItem>
                    <CarouselItem className="h-[300px] sm:h-[400px] md:h-[500px]">
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
                    <CarouselItem className="h-[300px] sm:h-[400px] md:h-[500px]">
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
                    <CarouselItem className="h-[300px] sm:h-[400px] md:h-[500px]">
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
                    <CarouselItem className="h-[300px] sm:h-[400px] md:h-[500px]">
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
                    <CarouselItem className="h-[300px] sm:h-[400px] md:h-[500px]">
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
                    <CarouselItem className="h-[300px] sm:h-[400px] md:h-[500px]">
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
                    <CarouselItem className="h-[300px] sm:h-[400px] md:h-[500px]">
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
          <div className='w-full flex-shrink-0'>
            <SponsorsCarousel />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero
