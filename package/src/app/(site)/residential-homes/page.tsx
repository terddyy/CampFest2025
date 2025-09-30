import ResidentialList from "@/components/Properties/Residential";
import React from "react";
import { Metadata } from "next/types";
export const metadata: Metadata = {
    title: "Property List | Homely",
};

const page = () => {
    return (
        <ResidentialList />
    );
};

export default page;