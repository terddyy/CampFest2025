import SponsorCard from '@/components/Sponsors/SponsorCard'
import { sponsors } from '@/app/api/sponsors'

const SponsorList = () => {
  const numSponsors = sponsors.length;
  const minCards = 5; // Display at least 5 cards
  const placeholders = Array.from({ length: Math.max(0, minCards - numSponsors) });

  return (
    <section id="sponsors" className='py-20 lg:py-[120px] bg-black relative z-[1]'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='text-center'>
         
          <h2 className='lg:text-52 text-40 md:text-52 mt-4 mb-2 lg:max-w-full font-medium leading-[1.2] text-white'>
            Meet Our Amazing Sponsors
          </h2>
          <p className='text-gray-400 text-lg lg:max-w-full leading-[1.3] md:max-w-3/4 mx-auto'>
            We are proud to partner with these incredible brands and organizations for CampFest 2025.
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14'>
          {sponsors.map((sponsor, index) => (
            <SponsorCard key={index} sponsor={sponsor} />
          ))}
          {placeholders.map((_, index) => (
            <div key={`placeholder-${index}`}>
              <div className='bg-zinc-900/60 rounded-2xl p-6 group h-full flex items-center justify-center backdrop-blur-sm border border-zinc-800/50'>
                <p className='text-gray-300 text-xl font-bold tracking-wide animate-pulse'>Stay Tuned for More Sponsors!</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SponsorList

