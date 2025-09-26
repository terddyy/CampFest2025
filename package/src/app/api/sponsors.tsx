import { Sponsor } from '@/types/sponsor'

export const sponsors: Sponsor[] = [
  {
    name: 'Bluetti',
    slug: 'bluetti',
    logo: '/images/sponsorslogo/Bluetti Logo.png',
    description: 'Innovative power solutions for outdoor adventures.',
    website: 'https://www.bluettipower.ph/',
    facebook: 'https://www.facebook.com/BluettiSEA',
    instagram: 'https://www.instagram.com/bluetti_philippines',
    tiktok: 'https://www.tiktok.com/@bluetti.philippines',
    lazada: 'https://bit.ly/41v9r00',
    shopee: 'https://bit.ly/3HVHKa3',
    email: 'sale-asia@bluettipower.com',
  },
  {
    name: 'Clapmoto',
    slug: 'clapmoto',
    logo: '/images/sponsorslogo/Clapmoto Logo.jpg',
    description: 'High-quality motor accessories and gear.',
    website: '#',
    facebook: 'https://www.facebook.com/clapmotoproject',
    email: 'clapmotoproject@gmail.com',
    contactNumber: '+63 915 502 0130',
  },
  {
    name: 'Gorilla',
    slug: 'gorilla',
    logo: '/images/sponsorslogo/Gorilla LOGO-cropped.JPG',
    description: 'Durable and reliable outdoor equipment.',
    website: '#',
    facebook: 'https://www.facebook.com/GorillaOutdoors',
    instagram: 'https://www.instagram.com/gorilla_outdoors/',
    email: 'gandamthematrix@yahoo.com',
    contactNumber: '+63 927 760 8338',
  },
  {
    name: 'Maarte Campers Outdoor Gears',
    slug: 'maarte-campers-outdoor-gears',
    logo: '/images/sponsorslogo/Maarte Campers Outdoor Gears Logo.jpg',
    description: 'Stylish and functional outdoor camping gear.',
    website: '#',
    facebook: 'https://www.facebook.com/mcoutdoorgears',
    instagram: 'https://www.instagram.com/mcoutdoorgears/',
    tiktok: 'https://www.tiktok.com/@maartecampers',
    lazada: 'http://lazada.com.ph/shop/maarte-campers-outdoor-gears',
    shopee: 'http://shopee.ph/maartecampers',
    email: 'mcoutdoorgears@gmail.com',
    contactNumber: '+63 920 802 0327',
  },
];

export async function getSponsors(): Promise<Sponsor[]> {
  return sponsors;
}