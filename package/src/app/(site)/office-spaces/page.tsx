import OfficeSpace from "@/components/Properties/OfficeSpaces";
import React from "react";
import { Metadata } from "next/types";
export const metadata: Metadata = {
    title: "Property List | Homely",
};

const page = () => {
    return (
        <OfficeSpace />
    );
};

export default page;