"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageData {
  image: string;
}

interface ImageShowcaseProps {
  images: ImageData[];
}

const ImageShowcase: React.FC<ImageShowcaseProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  console.log("images in image showcase", images);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Image
          src={images[activeIndex].image}
          alt="image"
          width={1000}
          height={600}
          layout="responsive"
          className="rounded-lg"
        />
      </div>
      <div className="flex justify-between">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-1/5 cursor-pointer transition-opacity duration-300 ${
              index === activeIndex
                ? "opacity-100"
                : "opacity-50 hover:opacity-75"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={image.image}
              alt="image"
              width={100}
              height={75}
              layout="responsive"
              className="rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageShowcase;
