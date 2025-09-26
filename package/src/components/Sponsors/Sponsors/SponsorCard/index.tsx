import { Sponsor } from '@/types/sponsor'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'

interface SponsorCardProps {
  sponsor: Sponsor
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor }) => {
  return (
    <div className='col-span-12 lg:col-span-4 md:col-span-6'>
      <Link href="/sponsors">
        <div className='bg-light dark:bg-dark-2 rounded-2xl p-6 group'>
          <div className='flex justify-center items-center h-40'>
            <Image src={sponsor.logo} alt={sponsor.name} width={150} height={150} className='h-auto w-auto max-h-full max-w-full' />
          </div>
          <h3 className='text-dark dark:text-white text-2xl font-medium mt-4 group-hover:text-primary duration-300'>{sponsor.name}</h3>
          <p className='text-dark/50 dark:text-white/50 text-base mt-2'>{sponsor.description}</p>
          <div className='flex flex-wrap gap-3 mt-4'>
            {sponsor.website && (
              <Link href={sponsor.website} target='_blank' rel='noopener noreferrer' className='bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-1'>
                <Icon icon='ph:globe' /> Website
              </Link>
            )}
            {sponsor.facebook && (
              <Link href={sponsor.facebook} target='_blank' rel='noopener noreferrer' className='bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-1'>
                <Icon icon='ph:facebook-logo' /> Facebook
              </Link>
            )}
            {sponsor.instagram && (
              <Link href={sponsor.instagram} target='_blank' rel='noopener noreferrer' className='bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-1'>
                <Icon icon='ph:instagram-logo' /> Instagram
              </Link>
            )}
            {sponsor.twitter && (
              <Link href={sponsor.twitter} target='_blank' rel='noopener noreferrer' className='bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-1'>
                <Icon icon='ph:twitter-logo' /> Twitter
              </Link>
            )}
            {sponsor.linkedin && (
              <Link href={sponsor.linkedin} target='_blank' rel='noopener noreferrer' className='bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-1'>
                <Icon icon='ph:linkedin-logo' /> LinkedIn
              </Link>
            )}
            {sponsor.tiktok && (
              <Link href={sponsor.tiktok} target='_blank' rel='noopener noreferrer' className='bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-1'>
                <Icon icon='ic:baseline-tiktok' /> TikTok
              </Link>
            )}
            {sponsor.lazada && (
              <Link href={sponsor.lazada} target='_blank' rel='noopener noreferrer' className='bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-1'>
                Lazada
              </Link>
            )}
            {sponsor.shopee && (
              <Link href={sponsor.shopee} target='_blank' rel='noopener noreferrer' className='bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-1'>
                Shopee
              </Link>
            )}
            {sponsor.email && (
              <a href={`mailto:${sponsor.email}`} className='bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-1'>
                <Icon icon='ph:envelope-simple' /> Email
              </a>
            )}
            {sponsor.contactNumber && (
              <a href={`tel:${sponsor.contactNumber}`} className='bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-1'>
                <Icon icon='ph:phone' /> Phone
              </a>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SponsorCard
