import { Sponsor } from '@/types/sponsor'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'

interface SponsorCardProps {
  sponsor: Sponsor;
  className?: string; // Add this line
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, className }) => {
  return (
    <div className={`min-h-[300px] ${className || ''}`}>
      <div className='p-6 group border border-white rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 transition-all duration-300 h-full flex flex-col'>
        <Link href={`/sponsors/${sponsor.slug}`}>
          <div className='flex justify-center items-center h-40'>
            <Image src={sponsor.logo} alt={sponsor.name} width={150} height={150} className='h-auto w-auto max-h-full max-w-full' />
          </div>
          <h3 className='text-white text-2xl font-medium mt-4 group-hover:text-teal-400 duration-300 text-center'>{sponsor.name}</h3>
        </Link>
        <p className='text-gray-400 text-base mt-2 flex-grow text-center'>{sponsor.description}</p>
        <div className='mt-6 space-y-3 flex-grow'>
          {/* Visit Website Link */}
          {sponsor.website && sponsor.website !== '#' && (
            <div className='flex justify-center items-center'>
              <Link href={sponsor.website} target='_blank' rel='noopener noreferrer' className='text-teal-400 hover:text-teal-300 text-sm font-medium flex items-center gap-2 transition-all duration-300 p-1 rounded-full flex items-center justify-center'>
                <Icon icon='ph:globe' className='w-4 h-4' />
                Visit Website
              </Link>
            </div>
          )}
          
          {/* Social Icons */}
          <div className='flex flex-wrap justify-center items-center gap-4'>
            {sponsor.facebook && (
              <Link href={sponsor.facebook} target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-500 transition-all duration-300 p-1 rounded-full flex items-center justify-center'>
                <Icon icon='ph:facebook-logo' className='w-6 h-6' />
              </Link>
            )}
            {sponsor.instagram && (
              <Link href={sponsor.instagram} target='_blank' rel='noopener noreferrer' className='text-pink-500 hover:text-pink-400 transition-all duration-300 p-1 rounded-full flex items-center justify-center'>
                <Icon icon='ph:instagram-logo' className='w-6 h-6' />
              </Link>
            )}
            {sponsor.twitter && (
              <Link href={sponsor.twitter} target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:text-blue-300 transition-all duration-300 p-1 rounded-full flex items-center justify-center'>
                <Icon icon='ph:twitter-logo' className='w-6 h-6' />
              </Link>
            )}
            {sponsor.linkedin && (
              <Link href={sponsor.linkedin} target='_blank' rel='noopener noreferrer' className='text-blue-700 hover:text-blue-600 transition-all duration-300 p-1 rounded-full flex items-center justify-center'>
                <Icon icon='ph:linkedin-logo' className='w-6 h-6' />
              </Link>
            )}
            {sponsor.tiktok && (
              <Link href={sponsor.tiktok} target='_blank' rel='noopener noreferrer' className='text-white hover:text-gray-300 transition-all duration-300 p-1 rounded-full flex items-center justify-center'>
                <Icon icon='ic:baseline-tiktok' className='w-6 h-6' />
              </Link>
            )}
            {sponsor.lazada && (
              <Link href={sponsor.lazada} target='_blank' rel='noopener noreferrer' className='transition-all duration-300'>
                <Image src='/images/terdimage/Lazada-Icon-Logo-Vector.svg-.png' alt='Lazada' width={24} height={24} className='w-6 h-6' />
              </Link>
            )}
            {sponsor.shopee && (
              <Link href={sponsor.shopee} target='_blank' rel='noopener noreferrer' className='text-orange-500 hover:text-orange-400 transition-all duration-300 flex items-center justify-center bg-orange-500'>
                <Icon icon='simple-icons:shopee' className='w-6 h-6 text-white' />
              </Link>
            )}
            {sponsor.email && (
              <a href={`mailto:${sponsor.email}`} className='text-gray-500 hover:text-gray-400 transition-all duration-300 p-1 rounded-full flex items-center justify-center'>
                <Icon icon='ph:envelope-simple' className='w-6 h-6' />
              </a>
            )}
            {sponsor.contactNumber && (
              <a href={`tel:${sponsor.contactNumber}`} className='text-gray-500 hover:text-gray-400 transition-all duration-300 p-1 rounded-full flex items-center justify-center'>
                <Icon icon='ph:phone' className='w-6 h-6' />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SponsorCard

