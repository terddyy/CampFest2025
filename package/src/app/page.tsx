import Hero from '@/components/Home/Hero'
import SponsorListing from "@/components/Sponsors/SponsorList";
import Info from "@/components/Home/Info";

export default function Home() {
  return (
    <main>
      <Hero />
      <Info />
      <SponsorListing />
    </main>
  )
}
