import SponsorCard from '@/components/Sponsors/SponsorCard/SponsorCard'
import { sponsors } from '@/app/api/sponsors'

const SponsorListing: React.FC = () => {
  return (
    <section className='pt-0! bg-black'>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-4">Our Valued Sponsors</h2>
        <p className="text-lg text-gray-300">We extend our sincere gratitude to all our sponsors who make CampFest 2025 possible. Their support helps us create an unforgettable experience for everyone.</p>
      </div>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
          {sponsors.map((item, index) => (
            <div key={index} className=''>
              <SponsorCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SponsorListing
