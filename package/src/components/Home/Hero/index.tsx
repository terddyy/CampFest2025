import Image from 'next/image'
import Link from 'next/link'

const Hero: React.FC = () => {
  return (
    <section className='!py-0'>
      <div className='bg-gradient-to-b from-skyblue via-lightskyblue dark:via-[#4298b0] to-white/10 dark:to-black/10 overflow-hidden relative'>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-24 md:pt-32 pb-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12'>
            <div className='text-white dark:text-dark text-center md:text-start z-10'>
              <p className='text-inherit text-sm md:text-base font-medium'>Palm springs, CA</p>
              <h1 className='text-inherit text-4xl sm:text-6xl md:text-7xl font-semibold -tracking-wider mt-4 mb-6 leading-tight'>
                Designing for Tomorrow
              </h1>
              <div className='flex flex-col xs:flex-row justify-center md:justify-start gap-3 sm:gap-4 mt-6'>
                <Link href="/contactus" className='px-6 py-3 sm:px-8 sm:py-4 border border-white dark:border-dark bg-white dark:bg-dark text-dark dark:text-white duration-300 dark:hover:text-dark hover:bg-transparent hover:text-white text-sm sm:text-base font-semibold rounded-full hover:cursor-pointer'>
                  Get in touch
                </Link>
                <Link href="/properties" className='px-6 py-3 sm:px-8 sm:py-4 border border-white dark:border-dark bg-transparent text-white dark:text-dark hover:bg-white dark:hover:bg-dark dark:hover:text-white hover:text-dark duration-300 text-sm sm:text-base font-semibold rounded-full hover:cursor-pointer'>
                  Other Properties
                </Link>
              </div>
            </div>

            <div className='w-full'>
              <Image
                src={'/images/hero/heroBanner.png'}
                alt='heroImg'
                width={1082}
                height={1016}
                priority={false}
                unoptimized={true}
                className="w-full h-auto object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className='container max-w-6xl mx-auto px-5 2xl:px-0 pb-12'>
          <div className='bg-white dark:bg-black rounded-2xl shadow-md dark:shadow-white/10 px-6 sm:px-10 py-8'>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 text-center dark:text-white text-black'>
              <div className='flex flex-col items-center gap-2'>
                <Image
                  src={'/images/hero/sofa.svg'}
                  alt='sofa'
                  width={32}
                  height={32}
                  className='block dark:hidden'
                  unoptimized={true}
                />
                <Image
                  src={'/images/hero/dark-sofa.svg'}
                  alt='sofa'
                  width={32}
                  height={32}
                  className='hidden dark:block'
                  unoptimized={true}
                />
                <p className='text-sm sm:text-base font-normal text-inherit'>
                  1 Bedroom
                </p>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <p className='text-sm sm:text-base font-normal text-inherit'>
                  For as low as 47k for 60 months
                </p>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <p className='text-sm sm:text-base font-normal text-inherit'>
                  55 sqm
                </p>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <p className='text-sm sm:text-base font-normal text-inherit'>
                  Pre selling
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
