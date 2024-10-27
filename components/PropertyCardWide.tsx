import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "./ui/separator";
import {
  Bath,
  Bed,
  Square,
  Phone,
  AtSign,
  MessageCircle,
  Heart,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

interface PropertyImage {
  id: number;
  property: number;
  image: string;
}

interface Property {
  id: number;
  title: string;
  description: string;
  property_type: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  latitude: number;
  longitude: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  owner: number;
  images: PropertyImage[];
  accepts_pets: boolean;
  pool: boolean;
  garden: boolean;
}

interface CardWithFormProps {
  property: Property;
}

export default function CardWithForm({ property }: CardWithFormProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = property.images.map((image) => ({
    url: image.image.includes("http://")
      ? image.image
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.image}`,
  }));

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isHovered) {
      interval = setInterval(() => {
        nextSlide();
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isHovered, currentIndex]);

  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row mb-5">
        <div
          className="relative w-full md:w-2/5 h-64 md:h-auto group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            style={{ backgroundImage: `url(${slides[currentIndex]?.url})` }}
            className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <Button className="bg-white text-black hover:bg-gray-200">
              View Property
            </Button>
          </div>
          <button
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md z-30"
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "text-[#344E41] fill-[#344E41]" : "text-gray-400"
              }`}
            />
          </button>
        </div>
        <div className="w-full md:w-3/5 flex flex-col">
          <CardContent className="pt-4 flex-grow">
            <div className="mb-4">
              <h5 className="text-sm text-[#588157] uppercase tracking-wide">
                {property.property_type}
              </h5>
              <h4 className="text-xl font-bold mt-1 line-clamp-2 text-[#344E41]">
                {property.title}
              </h4>
              <h5 className="text-sm text-[#3A5A40] mt-1">
                {`${property.address}, ${property.city}, ${property.state} ${property.zip_code}`}
              </h5>
            </div>

            <div className="flex flex-wrap justify-between text-sm text-[#3A5A40]">
              <div className="flex items-center mb-2 md:mb-0">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms} Bath</span>
              </div>
              <div className="flex items-center mb-2 md:mb-0">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center mb-2 md:mb-0">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.area} sq ft</span>
              </div>
            </div>
            <h5 className="text-sm text-[#3A5A40] mt-2 line-clamp-2">
              {property.description}
            </h5>
          </CardContent>
          <Separator className="my-1.5 bg-[#DAD7CD]" />
          <CardFooter className="flex flex-row justify-between items-start md:items-center">
            <div className="flex space-x-2 text-[#344E41] mb-2 md:mb-0">
              <div className="flex items-center font-bold">
                <DollarSign className="h-4 w-4 text-[#344E41]" />
                {property.price}/month
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-[#344E41]"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-[#344E41]"
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-[#344E41]"
              >
                <AtSign className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
