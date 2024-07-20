import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "./ui/separator";
import {
  ChevronRight,
  Bath,
  Bed,
  Square,
  Phone,
  AtSign,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

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
  propertySize: string;
  description: string;
}

interface CardWithFormProps {
  property: Property;
}

export default function CardWithForm({ property }: CardWithFormProps) {
  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row mb-5">
        <div className="relative w-full md:w-2/5 h-64 md:h-auto">
          <Image
            src={property.images[0].filePath}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full md:w-3/5 flex flex-col">
          <CardContent className="pt-4 flex-grow">
            <div className="mb-4">
              <h5 className="text-sm text-gray-500 uppercase tracking-wide">
                {property.type}
              </h5>
              <h4 className="text-xl font-bold mt-1 line-clamp-2">
                {property.title}
              </h4>
              <h5 className="text-sm text-gray-600 mt-1">{property.address}</h5>
            </div>

            <div className="flex flex-wrap justify-between text-sm">
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
                <span>{property.propertySize}</span>
              </div>
            </div>
            <h5 className="text-sm text-gray-600 mt-2 line-clamp-2">
              {property.description}
            </h5>
          </CardContent>
          <Separator className="my-1.5" />
          <CardFooter className="flex flex-row justify-between items-start md:items-center">
            <div className="flex space-x-2 text-red-600 mb-2 md:mb-0">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-red-600"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-red-600"
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-red-600"
              >
                <AtSign className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              className="h-8 border-red-600 text-red-600"
            >
              Details
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
