"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HeroSwitch from "./HeroSwitch";
import { useFilterState } from "@/store/filter";

export default function PropertiesFilter({ houseLocations, houseTypes }) {
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");
  const [minBaths, setMinBaths] = useState("");
  const [maxBaths, setMaxBaths] = useState("");
  const [acceptsPets, setAcceptsPets] = useState(false);
  const [acceptsSmokers, setAcceptsSmokers] = useState(false);
  const [hasPool, setHasPool] = useState(false);
  const [hasGarden, setHasGarden] = useState(false);
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");

  const {
    updatePropertyType,
    updateLocation,
    updateMinPrice,
    updateMaxPrice,
    updateMinBedrooms,
    updateMaxBedrooms,
    updateMinBathrooms,
    updateMaxBathrooms,
    updateAcceptsPets,
    updateAcceptsSmokers,
    updateHasPool,
    updateHasGarden,
    updateMinArea,
    updateMaxArea,
  } = useFilterState();

  const handleSearch = (e) => {
    e.preventDefault();
    updatePropertyType(propertyType);
    updateLocation(location);
    updateMinPrice(Number(minPrice));
    updateMaxPrice(Number(maxPrice));
    updateMinBedrooms(Number(minBeds));
    updateMaxBedrooms(Number(maxBeds));
    updateMinBathrooms(Number(minBaths));
    updateMaxBathrooms(Number(maxBaths));
    updateAcceptsPets(acceptsPets);
    updateAcceptsSmokers(acceptsSmokers);
    updateHasGarden(hasGarden);
    updateHasPool(hasPool);
    updateMinArea(Number(minArea));
    updateMaxArea(Number(maxArea));

    // You might want to add updates for pool and garden if they're in your Zustand store
    console.log("Search triggered with current state:", {
      propertyType,
      location,
      minPrice,
      maxPrice,
      minBeds,
      maxBeds,
      minBaths,
      maxBaths,
      acceptsPets,
      acceptsSmokers,
      hasPool,
      hasGarden,
      minArea,
      maxArea,
    });
  };

  return (
    <Card className="w-full md:w-[350px]">
      <CardHeader></CardHeader>
      <CardContent>
        <form onSubmit={handleSearch}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger
                  id="property-type"
                  className="focus:ring-2 focus:ring-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus:outline-none border-input"
                >
                  <SelectValue placeholder="Property Types" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {houseTypes?.map((type) => (
                    <SelectItem key={type.id} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger
                  id="location"
                  className="focus:ring-2 focus:ring-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus:outline-none border-input"
                >
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {houseLocations?.map((location) => (
                    <SelectItem key={location.id} value={location.name}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
              <Input
                id="min-price"
                placeholder="Min. Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="focus-visible:ring-red-600 focus:border-0"
              />
              <Input
                id="max-price"
                placeholder="Max. Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="focus-visible:ring-red-600 focus:border-0"
              />
              <Input
                id="min-beds"
                placeholder="Min. Beds"
                value={minBeds}
                onChange={(e) => setMinBeds(e.target.value)}
                className="focus-visible:ring-red-600 focus:border-0"
              />
              <Input
                id="max-beds"
                placeholder="Max. Beds"
                value={maxBeds}
                onChange={(e) => setMaxBeds(e.target.value)}
                className="focus-visible:ring-red-600 focus:border-0"
              />
              <Input
                id="min-baths"
                placeholder="Min. Baths"
                value={minBaths}
                onChange={(e) => setMinBaths(e.target.value)}
                className="focus-visible:ring-red-600 focus:border-0"
              />
              <Input
                id="max-baths"
                placeholder="Max. Baths"
                value={maxBaths}
                onChange={(e) => setMaxBaths(e.target.value)}
                className="focus-visible:ring-red-600 focus:border-0"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accepts_pets"
                  checked={acceptsPets}
                  onCheckedChange={setAcceptsPets}
                  className="data-[state=checked]:bg-red-600 border-red-600 border-2"
                />
                <Label htmlFor="accepts_pets">Accepts Pets</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accepts_smokers"
                  checked={acceptsSmokers}
                  onCheckedChange={setAcceptsSmokers}
                  className="data-[state=checked]:bg-red-600 border-red-600 border-2"
                />
                <Label htmlFor="accepts_smokers">Accepts Smokers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pool"
                  checked={hasPool}
                  onCheckedChange={setHasPool}
                  className="data-[state=checked]:bg-red-600 border-red-600 border-2"
                />
                <Label htmlFor="pool">Pool</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="garden"
                  checked={hasGarden}
                  onCheckedChange={setHasGarden}
                  className="data-[state=checked]:bg-red-600 border-red-600 border-2"
                />
                <Label htmlFor="garden">Garden</Label>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
              <Input
                id="min-area"
                placeholder="Min. Area"
                value={minArea}
                onChange={(e) => setMinArea(e.target.value)}
                className="focus-visible:ring-red-600 focus:border-0"
              />
              <Input
                id="max-area"
                placeholder="Max. Area"
                value={maxArea}
                onChange={(e) => setMaxArea(e.target.value)}
                className="focus-visible:ring-red-600 focus:border-0"
              />
            </div>
          </div>
          <Button className="w-full mt-4 bg-red-600 rounded-full" type="submit">
            Search
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <HeroSwitch /> */}
      </CardFooter>
    </Card>
  );
}
