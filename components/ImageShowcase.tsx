"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageData {
  image: string;
}

interface ImageShowcaseProps {
  images: ImageData[];
}

const ImageShowcase: React.FC<ImageShowcaseProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const previousImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Image with Navigation Arrows */}
      <div className="relative aspect-[16/9] mb-4 group">
        <Image
          src={images[activeIndex].image}
          alt="Property image"
          fill
          className="rounded-lg object-cover"
          priority
        />

        {/* Navigation Arrows */}
        <button
          onClick={previousImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-[4/3] cursor-pointer transition-all duration-300 ${
              index === activeIndex
                ? "ring-2 ring-[#344E41] opacity-100"
                : "opacity-50 hover:opacity-75"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={image.image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="rounded object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageShowcase;
