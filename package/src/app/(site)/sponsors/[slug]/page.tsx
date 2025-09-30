import { notFound } from 'next/navigation'
import { getSponsors } from '@/app/api/sponsors'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import BackButton from '@/components/shared/BackButton'

interface SponsorPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const sponsors = await getSponsors()
  return sponsors.map((sponsor) => ({
    slug: sponsor.slug,
  }))
}

const SponsorDetailPage = async ({ params: paramsPromise }: SponsorPageProps) => {
  const params = await paramsPromise;
  const sponsors = await getSponsors()
  const sponsor = sponsors.find((s) => s.slug === params.slug)

  if (!sponsor) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-20 lg:py-[120px] relative z-[1] overflow-hidden">
        <div className="container max-w-6xl mx-auto px-5 2xl:px-0">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Back Button */}
            <div className="w-full flex justify-start mb-8">
              <BackButton href="/" text="Back to Home" />
            </div>

            {/* Sponsor Logo */}
            <div className="mb-8">
              <Image 
                src={sponsor.logo} 
                alt={sponsor.name} 
                width={200} 
                height={200} 
                className="h-auto w-auto max-h-[200px] max-w-full rounded-2xl bg-white/5 p-4" 
              />
            </div>

            {/* Sponsor Name */}
            <h1 className="lg:text-6xl text-4xl mb-4 font-bold leading-[1.2] text-white">
              {sponsor.name}
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-xl lg:max-w-3xl leading-[1.4] mb-12">
              {sponsor.description}
            </p>

            {/* Contact Information */}
            <div className="w-full max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Details */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
                  
                  {sponsor.email && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
                        <Icon icon="ph:envelope-simple" className="w-6 h-6 text-teal-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <a 
                          href={`mailto:${sponsor.email}`}
                          className="text-white hover:text-teal-400 transition-colors duration-300"
                        >
                          {sponsor.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {sponsor.contactNumber && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
                        <Icon icon="ph:phone" className="w-6 h-6 text-teal-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <a 
                          href={`tel:${sponsor.contactNumber}`}
                          className="text-white hover:text-teal-400 transition-colors duration-300"
                        >
                          {sponsor.contactNumber}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Media & Links */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-white mb-6">Connect With Us</h2>
                  
                  <div className="space-y-4">
                    {sponsor.website && sponsor.website !== '#' && (
                      <Link 
                        href={sponsor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-zinc-900/60 hover:bg-zinc-800/80 rounded-xl transition-all duration-300 border border-zinc-800/50"
                      >
                        <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
                          <Icon icon="ph:globe" className="w-6 h-6 text-teal-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Visit Website</p>
                          <p className="text-gray-400 text-sm">Official website</p>
                        </div>
                      </Link>
                    )}

                    {/* Social Media Links */}
                    <div className="grid grid-cols-2 gap-2">
                      {sponsor.facebook && (
                        <Link 
                          href={sponsor.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-all duration-300 border border-blue-600/30"
                        >
                          <Icon icon="ph:facebook-logo" className="w-5 h-5 text-blue-400" />
                          <span className="text-white text-sm">Facebook</span>
                        </Link>
                      )}

                      {sponsor.instagram && (
                        <Link 
                          href={sponsor.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-pink-500/20 hover:bg-pink-500/30 rounded-lg transition-all duration-300 border border-pink-500/30"
                        >
                          <Icon icon="ph:instagram-logo" className="w-5 h-5 text-pink-400" />
                          <span className="text-white text-sm">Instagram</span>
                        </Link>
                      )}

                      {sponsor.twitter && (
                        <Link 
                          href={sponsor.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-blue-400/20 hover:bg-blue-400/30 rounded-lg transition-all duration-300 border border-blue-400/30"
                        >
                          <Icon icon="ph:twitter-logo" className="w-5 h-5 text-blue-300" />
                          <span className="text-white text-sm">Twitter</span>
                        </Link>
                      )}

                      {sponsor.linkedin && (
                        <Link 
                          href={sponsor.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-blue-700/20 hover:bg-blue-700/30 rounded-lg transition-all duration-300 border border-blue-700/30"
                        >
                          <Icon icon="ph:linkedin-logo" className="w-5 h-5 text-blue-600" />
                          <span className="text-white text-sm">LinkedIn</span>
                        </Link>
                      )}

                      {sponsor.tiktok && (
                        <Link 
                          href={sponsor.tiktok} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-black/20 hover:bg-black/30 rounded-lg transition-all duration-300 border border-gray-600/30"
                        >
                          <Icon icon="ic:baseline-tiktok" className="w-5 h-5 text-white" />
                          <span className="text-white text-sm">TikTok</span>
                        </Link>
                      )}

                      {sponsor.lazada && (
                        <Link 
                          href={sponsor.lazada} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all duration-300 border border-red-500/30"
                        >
                          <Icon icon="simple-icons:lazada" className="w-5 h-5 text-red-400" />
                          <span className="text-white text-sm">Lazada</span>
                        </Link>
                      )}

                      {sponsor.shopee && (
                        <Link 
                          href={sponsor.shopee} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg transition-all duration-300 border border-orange-500/30"
                        >
                          <Icon icon="simple-icons:shopee" className="w-5 h-5 text-orange-400" />
                          <span className="text-white text-sm">Shopee</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SponsorDetailPage
