// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import Image from "next/image";
// import { Separator } from "./ui/separator";
// import {
//   Bath,
//   Bed,
//   Square,
//   Dog,
//   Vegan,
//   Droplets,
//   DollarSign,
//   Heart,
// } from "lucide-react";
// import Link from "next/link";

// interface PropertyImage {
//   filePath: string;
// }

// interface Property {
//   id: string | number;
//   images: PropertyImage[];
//   type: string;
//   title: string;
//   address: string;
//   bathrooms: number;
//   bedrooms: number;
//   area: string;
//   price: number;
//   accepts_pets: boolean;
//   pool: boolean;
//   garden: boolean;
//   main_image: {
//     image: string;
//   };
// }

// interface CardWithFormProps {
//   widthVar?: number;
//   property: Property;
// }

// export default function CardWithForm({
//   widthVar,
//   property,
// }: CardWithFormProps) {
//   const [isFavorite, setIsFavorite] = useState(false);

//   const mainImage = property.main_image?.image
//     ? property.main_image.image.includes("http://")
//       ? property.main_image.image
//       : `http://127.0.0.1:8000${property.main_image.image}`
//     : "/img/prop.webp";

//   return (
//     <Card
//       className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative`}
//       style={{ width: `${widthVar}px` }}
//     >
//       <div className="relative h-48">
//         <Image
//           src={mainImage}
//           alt={property.title}
//           fill
//           className="object-cover"
//         />
//         <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs rounded">
//           {property.type}
//         </div>
//         <button
//           className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
//           onClick={() => setIsFavorite(!isFavorite)}
//         >
//           <Heart
//             className={`h-5 w-5 ${
//               isFavorite ? "text-red-600 fill-red-600" : "text-gray-400"
//             }`}
//           />
//         </button>
//       </div>
//       <CardContent className="pt-2">
//         <div className="mb-4">
//           <h5 className="text-sm text-gray-500 uppercase tracking-wide">
//             {/* {property.main_image} */}
//           </h5>
//           <Link href={`/properties/${property.id}`}>
//             <h4 className="text-xl font-bold mt-1 line-clamp-2">
//               {property.title}
//             </h4>
//           </Link>
//           <h5 className="text-sm text-gray-600 mt-1">{property.address}</h5>
//         </div>

//         <div className="flex justify-between text-sm">
//           <div className="flex items-center">
//             <Bath className="h-4 w-4 mr-1 hidden md:flex text-red-600" />
//             <span>{property.bathrooms} Bath</span>
//           </div>
//           <div className="flex items-center">
//             <Bed className="h-4 w-4 mr-1 hidden md:flex text-red-600" />
//             <span>{property.bedrooms} Beds</span>
//           </div>
//           <div className="flex items-center">
//             <Square className="h-4 w-4 mr-1 hidden md:flex text-red-600" />
//             <span className="pr-1">{property.area}</span> sqm
//           </div>
//         </div>

//         <div className="flex justify-between text-sm mt-2">
//           {property.accepts_pets && (
//             <div className="flex items-center">
//               <Dog className="h-4 w-4 mr-1 hidden md:flex text-red-600" />
//               <span>Pets</span>
//             </div>
//           )}

//           {property.pool && (
//             <div className="flex items-center">
//               <Droplets className="h-4 w-4 mr-1 hidden md:flex text-red-600" />
//               <span>Pool</span>
//             </div>
//           )}
//           {property.garden && (
//             <div className="flex items-center">
//               <Vegan className="h-4 w-4 mr-1 hidden md:flex text-red-600" />
//               <span>Garden</span>
//             </div>
//           )}
//         </div>
//       </CardContent>
//       <Separator className="mb-1.5" />
//       <CardFooter className="flex justify-between">
//         <div className="flex space-x-2 ">
//           <div
//             variant="outline"
//             size="icon"
//             className="flex items-center font-bold"
//           >
//             <DollarSign className="h-4 w-4 text-red-600" />
//             {property.price}/months
//           </div>
//         </div>
//         <Button
//           variant="outline"
//           className="h-8 border-red-600 text-red-600 border-2"
//         >
//           Details
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

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
}

export default function CardWithForm({
  widthVar,
  property,
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

  return (
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
        {/* <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs rounded">
          {property.type}
        </div> */}
        <button
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "text-red-600 fill-red-600" : "text-gray-400"
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
            <Bath className="h-4 w-4 mr-1 hidden md:flex text-red-600" />
            <span>{property.bathrooms} Bath</span>
          </div>
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1 hidden md:flex text-red-600" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1 hidden md:flex text-red-600" />
            <span className="pr-1">{property.area}</span> sqm
          </div>
        </div>

        <div className="flex justify-between text-sm mt-2">
          {property.accepts_pets && (
            <div className="flex items-center">
              <Dog className="h-4 w-4 mr-1 hidden md:flex text-red-600" />
              <span>Pets</span>
            </div>
          )}

          {property.pool && (
            <div className="flex items-center">
              <Droplets className="h-4 w-4 mr-1 hidden md:flex text-red-600" />
              <span>Pool</span>
            </div>
          )}
          {property.garden && (
            <div className="flex items-center">
              <Vegan className="h-4 w-4 mr-1 hidden md:flex text-red-600" />
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
            <DollarSign className="h-4 w-4 text-red-600" />
            {property.price}/months
          </div>
        </div>
        <Button
          variant="outline"
          className="h-8 border-red-600 text-red-600 border-2 rounded-full"
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}
