import { Sponsor } from '@/types/sponsor'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'

const SponsorCard: React.FC<{ item: Sponsor }> = ({ item }) => {
  const { name, logo, description, slug, website } = item

  return (
    <div>
      <div className='relative rounded-2xl border border-dark/10 dark:border-white/10 group hover:shadow-3xl duration-300 dark:hover:shadow-white/20'>
        <div className='overflow-hidden rounded-t-2xl flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-800'>
          <Link href={`/sponsors/${slug}`}>
            {logo && (
              <Image
                src={logo}
                alt={name}
                width={300}
                height={192} // Adjusted to match container height (h-48)
                className='object-contain p-4 max-h-full max-w-full'
                unoptimized={true}
              />
            )}
          </Link>
          <div className='absolute top-6 right-6 p-4 bg-white rounded-full hidden group-hover:block'>
            <Icon
              icon={'solar:arrow-right-linear'}
              width={24}
              height={24}
              className='text-black'
            />
          </div>
        </div>
        <div className='p-6'>
          <div className='flex flex-col gap-5 justify-between mb-6'>
            <div>
              <Link href={`/sponsors/${slug}`}>
                <h3 className='text-xl font-medium text-black dark:text-white duration-300 group-hover:text-primary'>
                  {name}
                </h3>
              </Link>
              <div className="h-20 overflow-hidden relative mb-4">
                <p className='text-base font-normal text-black/50 dark:text-white/50'>
                  {description}
                </p>
                {description.length > 100 && (
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-black to-transparent flex items-end justify-center">
                    <Link href={`/sponsors/${slug}`} className="text-primary hover:underline">
                      See more
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Link href={website} target="_blank" rel="noopener noreferrer" className='text-primary hover:underline'>
                  Visit Website
                </Link>
                {item.facebook && (
                  <Link href={item.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Icon icon="ri:facebook-fill" width={24} height={24} className="text-blue-600 hover:text-blue-800 transition-colors duration-200" />
                  </Link>
                )}
                {item.instagram && (
                  <Link href={item.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Icon icon="ri:instagram-fill" width={24} height={24} className="text-pink-600 hover:text-pink-800 transition-colors duration-200" />
                  </Link>
                )}
                {item.twitter && (
                  <Link href={item.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Icon icon="ri:twitter-fill" width={24} height={24} className="text-blue-400 hover:text-blue-600 transition-colors duration-200" />
                  </Link>
                )}
                {item.linkedin && (
                  <Link href={item.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Icon icon="ri:linkedin-fill" width={24} height={24} className="text-blue-700 hover:text-blue-900 transition-colors duration-200" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SponsorCard
