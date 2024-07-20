"use client";
import PropertyCard from "./PropertyCard";
import PropertyCardWide from "./PropertyCardWide";
import { useBearStore } from "@/store/listings";
import { Property } from "@/types";

interface PropertiesListProps {
  propertiesToRent: Property[];
  propertiesForSale: Property[];
}

const PropertiesList: React.FC<PropertiesListProps> = ({
  propertiesToRent,
  propertiesForSale,
}) => {
  const bears = useBearStore((state) => state.bears);
  const isSaleListing = useBearStore((state) => state.isSaleListing);
  const isGrid = useBearStore((state) => state.isGrid);

  console.log("isSaleListing", isSaleListing);

  return (
    <>
      {isGrid ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isSaleListing
            ? propertiesForSale.map((property) => (
                <PropertyCard
                  key={property.id}
                  widthVar={300}
                  property={property}
                />
              ))
            : propertiesToRent.map((property) => (
                <PropertyCard
                  key={property.id}
                  widthVar={300}
                  property={property}
                />
              ))}
        </div>
      ) : (
        <div className="">
          {isSaleListing
            ? propertiesForSale.map((property) => (
                <PropertyCardWide key={property.id} property={property} />
              ))
            : propertiesToRent.map((property) => (
                <PropertyCardWide key={property.id} property={property} />
              ))}
        </div>
      )}
    </>
  );
};

export default PropertiesList;
