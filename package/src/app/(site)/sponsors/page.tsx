import SponsorListing from "@/components/Sponsors/SponsorList";
import React from "react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Our Sponsors | Homely",
};

export default function SponsorsPage() {
  return <SponsorListing />;
}

