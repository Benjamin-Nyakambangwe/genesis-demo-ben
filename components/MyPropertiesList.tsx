"use client";

import React from "react";
import PropertyCardWide from "./PropertyCardWide";
import { Property } from "@/types";

const MyPropertiesList = ({ properties }: { properties: Property[] }) => {
  return (
    <>
      {properties.map((property) => (
        <PropertyCardWide key={property.id} property={property} />
      ))}
    </>
  )
}

export default MyPropertiesList