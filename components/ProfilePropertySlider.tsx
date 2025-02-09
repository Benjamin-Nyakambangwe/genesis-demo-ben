"use client";

import React, { useEffect } from "react";
import PropertyCard from "./PropertyCard";
import Slider, { Settings } from "react-slick";
import { Property } from "@/types";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { usePropertiesStore } from "@/store/properties";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProfilePropertySliderProps {
  initialData: Property[];
}

const CustomPrevArrow: React.FC<any> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "#344E41" }}
      onClick={onClick}
    >
      <ChevronLeft className="h-10 w-10 " />
    </div>
  );
};

const CustomNextArrow: React.FC<any> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "#344E41" }}
      onClick={onClick}
    >
      <ChevronRight className="h-10 w-10 " />
    </div>
  );
};

const ProfilePropertySlider: React.FC<ProfilePropertySliderProps> = ({
  initialData,
}) => {
  const { properties, setProperties } = usePropertiesStore();

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setProperties(initialData);
    }
  }, [initialData, setProperties]);

  if (properties.length === 1) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-sm px-2">
          <PropertyCard property={properties[0]} edit={true} />
        </div>
      </div>
    );
  }

  const settings: Settings = {
    dots: true,
    infinite: properties.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, properties.length),
    slidesToScroll: 1,
    arrows: properties.length > 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, properties.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full text-[#344E41]">
      <Slider {...settings}>
        {properties.map((property) => (
          <div key={property.id} className="px-2">
            <PropertyCard property={property} edit={true} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProfilePropertySlider;
