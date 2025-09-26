import HeroSub from "@/components/shared/HeroSub";
import SponsorListing from "@/components/Sponsors/SponsorList";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Sponsors | CampFest",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Meet Our Valued Sponsors."
                description="We are grateful for the generous support of our sponsors, making CampFest 2025 possible."
                badge="Sponsors"
            />
            <SponsorListing />
        </>
    );
};

export default page;
