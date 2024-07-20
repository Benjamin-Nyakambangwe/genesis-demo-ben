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

export default function CardWithForm({ widthVar, property }) {
  return (
    <Link href={`/properties/${property.id}`}>
      <Card
        className={`w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex mb-5`}
        // style={{ width: `${widthVar}px` }}
      >
        <div className="relative w-2/5">
          <Image
            src={property?.images[0].filePath}
            alt="hero"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-3/5 flex flex-col">
          <CardContent className="pt-4 flex-grow">
            <div className="mb-4">
              <h5 className="text-sm text-gray-500 uppercase tracking-wide">
                {property?.type}
              </h5>
              <h4 className="text-xl font-bold mt-1">{property?.title}</h4>
              <h5 className="text-sm text-gray-600 mt-1">
                {property?.address}
              </h5>
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property?.bathrooms} Bath</span>
              </div>
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property?.bedrooms} Beds</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property?.propertySize}</span>
              </div>
            </div>
            <h5 className="text-sm text-gray-600 mt-2">
              {property?.description}
            </h5>
          </CardContent>
          <Separator className="my-1.5" />
          <CardFooter className="flex justify-between">
            <div className="flex space-x-2 text-red-600">
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