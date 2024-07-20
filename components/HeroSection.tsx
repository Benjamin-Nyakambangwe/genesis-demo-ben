import React from "react";
import HeroSwitch from "./HeroSwitch";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-[80vh]">
      {/* Background Image */}
      <Image
        src="/assets/hero.jpg"
        alt="Hero background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        {/* Search Bar */}
        <div className="w-[60%] max-w-none">
          <div className="mb-3">
            <HeroSwitch />
          </div>
          {/* Changed from w-full max-w-md */}
          <form className="bg-white rounded-md p-4 md:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-2">
              <Select>
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Property Types" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="cottage">Cottage</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="resort">Resort</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="text"
                placeholder="Suburb, City, Province, Town"
                className="w-full sm:flex-grow"
              />

              <Button type="submit" className="w-full sm:w-auto bg-red-600">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
