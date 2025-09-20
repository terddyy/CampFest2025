import Image from 'next/image'
import Link from 'next/link'

const Hero: React.FC = () => {
  return (
    <section 
      className='!py-0'
      style={{
        backgroundImage: `url('/images/terdimage/campfestbg.png')`,
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
              <p className='text-inherit text-sm md:text-base font-medium'>Palm springs, CA</p>
              <h1 className='text-inherit text-4xl sm:text-6xl md:text-7xl font-semibold -tracking-wider mt-4 mb-6 leading-tight'>
                Designing for Tomorrow
              </h1>
              <div className='flex flex-col xs:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mt-6'>
                <Link href="/contactus" className='px-6 py-3 sm:px-8 sm:py-4 border border-white bg-white text-dark duration-300 hover:bg-transparent hover:text-white text-sm sm:text-base font-semibold rounded-full hover:cursor-pointer'>
                  Get in touch
                </Link>
                <Link href="/properties" className='px-6 py-3 sm:px-8 sm:py-4 border border-white bg-transparent text-white hover:bg-white hover:text-dark duration-300 text-sm sm:text-base font-semibold rounded-full hover:cursor-pointer active:scale-95 transition-all'>
                  Other Properties
                </Link>
              </div>
            </div>

            <div className='w-full order-1 lg:order-2'>
              <Image
                src={'/images/terdimage/campfestimage.jpg'}
                alt='heroImg'
                width={1200}
                height={1120}
                priority={false}
                unoptimized={true}
                className="w-full h-auto object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <div className='container max-w-6xl mx-auto px-5 2xl:px-0 pb-12'>
          <div className='bg-white rounded-2xl shadow-md px-6 sm:px-10 py-8'>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 text-center text-black'>
              <div className='flex flex-col items-center gap-2'>
                <Image
                  src={'/images/hero/sofa.svg'}
                  alt='sofa'
                  width={32}
                  height={32}
                  className='block'
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
