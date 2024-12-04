"use client";

import React from "react";
import PropertyCardWide from "./PropertyCardWide";
import { Property } from "@/types";

const MyPropertiesList = ({ properties }: { properties: Property[] }) => {
  return (
    <div
      className={`grid grid-cols-1 ${
        properties.length > 1 ? "md:grid-cols-2" : ""
      } gap-6`}
    >
      {properties.map((property) => (
        <PropertyCardWide key={property.id} property={property} />
      ))}
    </div>
  );
};

export default MyPropertiesList;
