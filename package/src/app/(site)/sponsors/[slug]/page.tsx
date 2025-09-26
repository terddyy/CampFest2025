import React from 'react';
import { Metadata } from 'next';
import { sponsors } from '@/app/api/sponsors';
import Image from 'next/image';
import Link from 'next/link';

type SponsorDetailsProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: SponsorDetailsProps): Promise<Metadata> {
  const sponsor = sponsors.find((s) => s.slug === params.slug);

  return {
    title: sponsor ? `${sponsor.name} | Sponsors` : 'Sponsor Not Found',
  };
}

const SponsorDetailsPage: React.FC<SponsorDetailsProps> = ({ params }) => {
  const sponsor = sponsors.find((s) => s.slug === params.slug);

  if (!sponsor) {
    return <div className="container mx-auto py-12 text-white">Sponsor Not Found</div>;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-5 2xl:px-0">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mb-6">{sponsor.name}</h1>
          {sponsor.logo && (
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              width={200}
              height={100}
              className="object-contain mb-8"
            />
          )}
          <p className="text-lg text-white/70 text-center max-w-2xl mb-8">{sponsor.description}</p>
          {sponsor.website && (
            <Link
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-xl"
            >
              Visit Sponsor Website
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default SponsorDetailsPage;
