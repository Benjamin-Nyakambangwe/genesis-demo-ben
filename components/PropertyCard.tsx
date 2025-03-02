"use client";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Settings,
  Trash2,
  Bath,
  Bed,
  Square,
  Dog,
  Droplets,
  Vegan,
  DollarSign,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useDialogsState } from "@/store/dialogs";
import { DeletePropertyDialog } from "./DeletePropertyDialog";
import PropertyTenantsDrawer from "./PropertyTenantsDrawer";
import Image from "next/image";
import { useState, useEffect } from "react";

interface PropertyImage {
  filePath: string;
}

interface Property {
  id: string | number;
  images: PropertyImage[];
  type: string;
  title: string;
  address: string;
  bathrooms: number;
  bedrooms: number;
  area: string;
  price: number;
  accepts_pets: boolean;
  pool: boolean;
  garden: boolean;
  has_borehole: boolean;
  has_solar_power: boolean;
  main_image: {
    image: string;
  };
}

interface CardWithFormProps {
  widthVar?: number;
  property: Property;
  edit?: boolean;
}

interface DialogsStore {
  isEditPropertyDialogOpen: boolean;
  updateEditPropertyDialogOpen: () => void;
  isDeletePropertyDialogOpen: boolean;
  updateDeletePropertyDialogOpen: () => void;
  isPropertyTenantsDrawerOpen: boolean;
  updatePropertyTenantsDrawerOpen: () => void;
}

export default function PropertyCard({
  widthVar,
  property,
  edit,
}: CardWithFormProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get the current image URL with fallback
  const currentImageUrl =
    property.images?.[currentIndex]?.image || "/placeholder-image.jpg";
  const hasMultipleImages = property.images?.length > 1;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!property.images?.length) return;

    setCurrentIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!property.images?.length) return;

    setCurrentIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const updateEditPropertyDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateEditPropertyDialogOpen
  );
  const updateDeletePropertyDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateDeletePropertyDialogOpen
  );
  const updatePropertyToEdit = useDialogsState(
    (state: DialogsStore) => state.updatePropertyToEdit
  );
  const isEditPropertyDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isEditPropertyDialogOpen
  );
  const isDeletePropertyDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isDeletePropertyDialogOpen
  );
  const isPropertyTenantsDrawerOpen = useDialogsState(
    (state: DialogsStore) => state.isPropertyTenantsDrawerOpen
  );
  const updatePropertyTenantsDrawerOpen = useDialogsState(
    (state: DialogsStore) => state.updatePropertyTenantsDrawerOpen
  );
  const [localIsEditPropertyDialogOpen, setLocalIsEditPropertyDialogOpen] =
    useState<boolean>(isEditPropertyDialogOpen);
  const [localIsDeletePropertyDialogOpen, setLocalIsDeletePropertyDialogOpen] =
    useState<boolean>(isDeletePropertyDialogOpen);
  const [
    localIsPropertyTenantsDrawerOpen,
    setLocalIsPropertyTenantsDrawerOpen,
  ] = useState<boolean>(isPropertyTenantsDrawerOpen);

  useEffect(() => {
    setLocalIsEditPropertyDialogOpen(isEditPropertyDialogOpen);
    setLocalIsDeletePropertyDialogOpen(isDeletePropertyDialogOpen);
    setLocalIsPropertyTenantsDrawerOpen(isPropertyTenantsDrawerOpen);
  }, [
    isEditPropertyDialogOpen,
    isDeletePropertyDialogOpen,
    isPropertyTenantsDrawerOpen,
  ]);

  const editProperty = () => {
    updateEditPropertyDialogOpen();
    updatePropertyToEdit(property);
  };

  return (
    <>
      <Card
        className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative rounded-2xl"
        style={{ width: `${widthVar}px` }}
      >
        <Link href={`/properties/${property.id}`}>
          <div className="relative h-48 cursor-pointer">
            <div className="relative aspect-[16/9] group">
              <Image
                src={currentImageUrl}
                alt={property.title}
                fill
                className="object-cover rounded-t-lg"
                priority
              />

              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  <div className="absolute bottom-2 right-2">
                    <Badge
                      variant="secondary"
                      className="bg-black/50 text-white"
                    >
                      {currentIndex + 1}/{property.images.length}
                    </Badge>
                  </div>
                </>
              )}
            </div>{" "}
            {edit && (
              <div className="absolute top-2 left-2 flex space-x-2">
                <div className="bg-[#344E41] text-white px-2 py-1 text-xs rounded cursor-pointer">
                  <Settings
                    className="h-4 w-4 text-white"
                    onClick={editProperty}
                  />
                </div>
                <div className="bg-[#344E41] text-white px-2 py-1 text-xs rounded cursor-pointer">
                  <Trash2
                    className="h-4 w-4 text-white"
                    onClick={() => updateDeletePropertyDialogOpen()}
                  />
                </div>
              </div>
            )}
            {/* <button
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "text-[#344E41] fill-[#344E41]" : "text-gray-400"
                }`}
              />
            </button> */}
          </div>
        </Link>

        <CardContent className="pt-3">
          <div className="mb-4">
            <Link href={`/properties/${property.id}`}>
              <h4 className="text-xl font-bold mt-1 line-clamp-2">
                {property.title}
              </h4>
            </Link>
            <h5 className="text-sm text-gray-600 mt-1">
              {property?.location_detail?.name}
            </h5>
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 hidden md:flex text-[#344E41]" />
              <span>{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1 hidden md:flex text-[#344E41]" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1 hidden md:flex text-[#344E41]" />
              <span className="pr-1">{property.area}</span> sqm
            </div>
          </div>

          <div className="flex justify-between text-sm mt-2">
            {/* {property.accepts_pets && (
              <div className="flex items-center">
                <Dog className="h-4 w-4 mr-1 hidden md:flex text-[#344E41]" />
                <span>Pets</span>
              </div>
            )} */}

            {property.has_borehole && (
              <div className="flex items-center">
                <Droplets className="h-4 w-4 mr-1 hidden md:flex text-[#344E41]" />
                <span>Borehole</span>
              </div>
            )}

            {property.has_solar_power && (
              <div className="flex items-center">
                <Sun className="h-4 w-4 mr-1 hidden md:flex text-[#344E41]" />
                <span>Solar</span>
              </div>
            )}

            {/* {property.pool && (
              <div className="flex items-center">
                <Droplets className="h-4 w-4 mr-1 hidden md:flex text-[#344E41]" />
                <span>Pool</span>
              </div>
            )} */}
            {property.garden && (
              <div className="flex items-center">
                <Vegan className="h-4 w-4 mr-1 hidden md:flex text-[#344E41]" />
                <span>Garden</span>
              </div>
            )}
          </div>
        </CardContent>
        <Separator className="mb-1.5" />
        <CardFooter className="flex flex-col justify-between">
          <div className="flex justify-between w-full">
            <div className="flex space-x-2 ">
              <div
                variant="outline"
                size="icon"
                className="flex items-center font-bold"
              >
                <DollarSign className="h-4 w-4 text-[#344E41]" />
                {property.price}/months
              </div>
            </div>
            <Button
              variant="outline"
              className="h-8 border-[#344E41] text-[#344E41] hover:bg-[#A3B18A] hover:text-white font-bold border-2 rounded-full"
            >
              Details
            </Button>
          </div>
          {edit && (
            <Button
              onClick={() => {
                updatePropertyToEdit(property);
                updatePropertyTenantsDrawerOpen();
              }}
              className="w-full h-8 border-[#344E41] text-[#fff] bg-[#344E41] hover:bg-[#A3B18A] hover:text-white mt-2 font-bold border-2 rounded-full"
            >
              {property?.current_tenant
                ? "Currently Occupied"
                : "Interested Tenants"}
            </Button>
          )}
        </CardFooter>
      </Card>

      <DeletePropertyDialog property={property} />
      {/* <PropertyTenantsDrawer /> */}
    </>
  );
}
