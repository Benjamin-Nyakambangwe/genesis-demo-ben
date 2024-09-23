import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "./ui/separator";
import {
  Bath,
  Bed,
  Square,
  Dog,
  Vegan,
  Droplets,
  DollarSign,
  Heart,
  Settings,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useDialogsState } from "@/store/dialogs";
import { DeletePropertyDialog } from "./DeletePropertyDialog";
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
}

export default function CardWithForm({
  widthVar,
  property,
  edit,
}: CardWithFormProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = property.images.map((image) => ({
    url: image.image.includes("http://")
      ? image.image
      : `http://127.0.0.1:8000${image.image}`,
  }));

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        nextSlide();
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isHovered, currentIndex]);

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
  const [localIsEditPropertyDialogOpen, setLocalIsEditPropertyDialogOpen] =
    useState<boolean>(isEditPropertyDialogOpen);
  const [localIsDeletePropertyDialogOpen, setLocalIsDeletePropertyDialogOpen] =
    useState<boolean>(isDeletePropertyDialogOpen);

  useEffect(() => {
    setLocalIsEditPropertyDialogOpen(isEditPropertyDialogOpen);
    setLocalIsDeletePropertyDialogOpen(isDeletePropertyDialogOpen);
  }, [isEditPropertyDialogOpen, isDeletePropertyDialogOpen]);

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
        <div
          className="relative h-48"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            style={{ backgroundImage: `url(${slides[currentIndex]?.url})` }}
            className="w-full h-full rounded-2xl bg-center bg-cover duration-800"
          ></div>
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
          <button
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "text-[#344E41] fill-[#344E41]" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        <CardContent className="pt-2">
          <div className="mb-4">
            <Link href={`/properties/${property.id}`}>
              <h4 className="text-xl font-bold mt-1 line-clamp-2">
                {property.title}
              </h4>
            </Link>
            <h5 className="text-sm text-gray-600 mt-1">{property.address}</h5>
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
            {property.accepts_pets && (
              <div className="flex items-center">
                <Dog className="h-4 w-4 mr-1 hidden md:flex text-[#344E41]" />
                <span>Pets</span>
              </div>
            )}

            {property.pool && (
              <div className="flex items-center">
                <Droplets className="h-4 w-4 mr-1 hidden md:flex text-[#344E41]" />
                <span>Pool</span>
              </div>
            )}
            {property.garden && (
              <div className="flex items-center">
                <Vegan className="h-4 w-4 mr-1 hidden md:flex text-[#344E41]" />
                <span>Garden</span>
              </div>
            )}
          </div>
        </CardContent>
        <Separator className="mb-1.5" />
        <CardFooter className="flex justify-between">
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
        </CardFooter>
      </Card>
      <DeletePropertyDialog property={property} />
    </>
  );
}
