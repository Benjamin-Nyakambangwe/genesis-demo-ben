"use client";

import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import PropertyCardWide from "./PropertyCardWide";
import { useBearStore } from "@/store/listings";
import { Property } from "@/types";
import { useFilterState } from "@/store/filter";

interface FilterStore {
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  maxBedrooms: number;
  maxBathrooms: number;
  minBathrooms: number;
  minArea: number;
  maxArea: number;
  propertyType: string;
  location: string;
  hasPool: boolean;
  hasGarden: boolean;
  acceptsSmokers: boolean;
  acceptsPets: boolean;
  updateMinPrice: (num: number) => void;
  updateMaxPrice: (num: number) => void;
  updateMinBedrooms: (num: number) => void;
  updateMaxBedrooms: (num: number) => void;
  updateMinArea: (num: number) => void;
  updateMaxArea: (num: number) => void;
  updatePropertyType: (str: string) => void;
  updateLocation: (str: string) => void;
  updateMinBathrooms: (num: number) => void;
  updateMaxBathrooms: (num: number) => void;
  updateAcceptsPets: (bool: boolean) => void;
  updateAcceptsSmokers: (bool: boolean | null) => void;
  updateHasPool: (bool: boolean | null) => void;
  updateHasGarden: (bool: boolean | null) => void;
}

async function getProperties(
  propertyType: string,
  location: string,
  minPrice: number,
  maxPrice: number,
  minBedrooms: number,
  maxBedrooms: number,
  minBathrooms: number,
  maxBathrooms: number,
  minArea: number,
  maxArea: number,
  hasPool: boolean,
  hasGarden: boolean,
  hasSolarPower: boolean,
  hasBorehole: boolean,
  acceptsSmokers: boolean,
  acceptsPets: boolean
) {
  const myHeaders = new Headers();

  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties-filter/`;
  let queryParams = [];

  if (propertyType) {
    queryParams.push(`type=${propertyType}`);
  }

  if (location) {
    queryParams.push(`location=${location}`);
  }

  if (minPrice) {
    queryParams.push(`price_min=${minPrice}`);
  }

  if (maxPrice) {
    queryParams.push(`price_max=${maxPrice}`);
  }

  if (minBedrooms) {
    queryParams.push(`bedrooms_min=${minBedrooms}`);
  }

  if (maxBedrooms) {
    queryParams.push(`bedrooms_max=${maxBedrooms}`);
  }

  if (minBathrooms) {
    queryParams.push(`bathrooms_min=${minBathrooms}`);
  }

  if (maxBathrooms) {
    queryParams.push(`bathrooms_max=${maxBathrooms}`);
  }

  if (minArea) {
    queryParams.push(`area_min=${minArea}`);
  }

  if (maxArea) {
    queryParams.push(`area_max=${maxArea}`);
  }

  if (hasPool) {
    queryParams.push(`pool=${hasPool}`);
  }

  if (hasGarden) {
    queryParams.push(`garden=${hasGarden}`);
  }

  if (hasSolarPower) {
    queryParams.push(`has_solar_power=${hasSolarPower}`);
  }

  if (hasBorehole) {
    queryParams.push(`has_borehole=${hasBorehole}`);
  }
  if (acceptsSmokers) {
    queryParams.push(`accepts_smokers=${acceptsSmokers}`);
  }

  if (acceptsPets) {
    queryParams.push(`accepts_pets=${acceptsPets}`);
  }

  if (queryParams.length > 0) {
    url += "?" + queryParams.join("&");
  }

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  const res = await fetch(url, requestOptions);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const PropertiesList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const isGrid = useBearStore((state) => state.isGrid);
  const isSaleListing = useBearStore((state) => state.isSaleListing);

  const minPrice = useFilterState((state: FilterStore) => state.minPrice);
  const maxPrice = useFilterState((state: FilterStore) => state.maxPrice);
  const minBedrooms = useFilterState((state: FilterStore) => state.minBedrooms);
  const maxBedrooms = useFilterState((state: FilterStore) => state.maxBedrooms);
  const minBathrooms = useFilterState(
    (state: FilterStore) => state.minBathrooms
  );
  const maxBathrooms = useFilterState(
    (state: FilterStore) => state.maxBathrooms
  );
  const minArea = useFilterState((state: FilterStore) => state.minArea);
  const maxArea = useFilterState((state: FilterStore) => state.maxArea);
  const propertyType = useFilterState(
    (state: FilterStore) => state.propertyType
  );
  const location = useFilterState((state: FilterStore) => state.location);
  const hasPool = useFilterState((state: FilterStore) => state.hasPool);
  const hasGarden = useFilterState((state: FilterStore) => state.hasGarden);
  const acceptsSmokers = useFilterState(
    (state: FilterStore) => state.acceptsSmokers
  );
  const acceptsPets = useFilterState((state: FilterStore) => state.acceptsPets);
  const hasSolarPower = useFilterState(
    (state: FilterStore) => state.hasSolarPower
  );
  const hasBorehole = useFilterState((state: FilterStore) => state.hasBorehole);

  const [cardWidth, setCardWidth] = useState(300);

  useEffect(() => {
    const updateWidth = () => {
      setCardWidth(window.innerWidth < 640 ? window.innerWidth - 18 : 300);
    };

    // Initial width
    updateWidth();

    // Update width on resize
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties(
          propertyType,
          location,
          minPrice,
          maxPrice,
          minBedrooms,
          maxBedrooms,
          minBathrooms,
          maxBathrooms,
          minArea,
          maxArea,
          hasPool,
          hasGarden,
          hasSolarPower,
          hasBorehole,
          acceptsSmokers,
          acceptsPets
        );
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, [
    propertyType,
    location,
    minPrice,
    maxPrice,
    minBedrooms,
    maxBedrooms,
    minBathrooms,
    maxBathrooms,
    minArea,
    maxArea,
    hasPool,
    hasGarden,
    hasSolarPower,
    hasBorehole,
    acceptsSmokers,
    acceptsPets,
  ]);

  console.log("ALL PROPERTIES", properties);

  return (
    <>
      {isGrid ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {properties.map((property) => (
            <div
              key={property.id}
              className="w-full flex justify-center sm:block"
            >
              <PropertyCard widthVar={cardWidth} property={property} />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full space-y-4">
          {properties.map((property) => (
            <PropertyCardWide key={property.id} property={property} />
          ))}
        </div>
      )}
    </>
  );
};

export default PropertiesList;
