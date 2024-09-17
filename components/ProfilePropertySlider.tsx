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
      style={{ ...style, display: "block", color: "red" }}
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
      style={{ ...style, display: "block", color: "red" }}
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

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <div className="w-full text-red-600">
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
