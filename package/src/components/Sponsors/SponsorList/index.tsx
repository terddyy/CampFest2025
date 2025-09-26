import SponsorCard from '@/components/Sponsors/SponsorCard'
import { sponsors } from '@/app/api/sponsors'

const SponsorList = () => {
  return (
    <section className='py-20 lg:py-[120px] bg-light dark:bg-dark relative z-[1]'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='text-center'>
          <p className='text-dark/75 dark:text-white/75 text-base font-semibold flex items-center justify-center gap-2.5'>
            Our Sponsors
          </p>
          <h2 className='lg:text-52 text-40 mt-4 mb-2 lg:max-w-full font-medium leading-[1.2] text-dark dark:text-white'>
            Meet Our Amazing Sponsors
          </h2>
          <p className='text-dark/50 dark:text-white/50 text-lg lg:max-w-full leading-[1.3] md:max-w-3/4 mx-auto'>
            We are proud to partner with these incredible brands and organizations for CampFest 2025.
          </p>
        </div>
        <div className='grid grid-cols-12 gap-8 mt-14'>
          {sponsors.map((sponsor, index) => (
            <SponsorCard key={index} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SponsorList

