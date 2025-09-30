import Appartment from "@/components/Properties/Appartment";
import React from "react";
import { Metadata } from "next/types";
export const metadata: Metadata = {
    title: "Property List | Homely",
};

const page = () => {
    return (
        <Appartment />
    );
};

export default page;