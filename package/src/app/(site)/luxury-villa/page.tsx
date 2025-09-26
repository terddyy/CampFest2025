import LuxuryVillas from "@/components/Properties/LuxuryVilla";
import React from "react";
import { Metadata } from "next/types";
export const metadata: Metadata = {
    title: "Property List | Homely",
};

const page = () => {
    return (
        <LuxuryVillas />
    );
};

export default page;