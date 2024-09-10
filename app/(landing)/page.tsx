import { Metadata } from "next";
import React from "react";
import Header from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import PropertySlider from "@/components/PropertySlider";
import HomeServicesSection from "@/components/HomeServicesSection";
import ImageSlider from "@/components/ImageSlider";
import LandingScroll from "@/components/LandingScroll";
import { LandingImageCardsGrid } from "@/components/LandingImageCardsGrid";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";

async function getFullHousesList() {
  const myHeaders = new Headers();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const res = await fetch(
    "http://127.0.0.1:8000/api/properties-filter?type=Full",
    requestOptions
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
async function getRoomsList() {
  const myHeaders = new Headers();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const res = await fetch(
    "http://127.0.0.1:8000/api/properties-filter?type=Room",
    requestOptions
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
async function getClustersList() {
  const myHeaders = new Headers();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const res = await fetch(
    "http://127.0.0.1:8000/api/properties-filter?type=Cluster",
    requestOptions
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getLatestProperties() {
  const res = await fetch("https://fsboafrica.com/api/properties/latest");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const HoverCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="group">
      <div className="transition-all duration-300 group-hover:border-2 group-hover:border-red-600 rounded-lg">
        {children}
      </div>
    </div>
  );
};

const HomePage = async () => {
  return (
    <div className="bg-gray-100">
      <HeroSection />

      <div className="container">
        <LandingImageCardsGrid />
        {/* <LandingScroll /> */}
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-red-600">
          Our Rental Offerings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HoverCard>
            <Card>
              <CardHeader>
                <CardTitle>Full Houses</CardTitle>
                <CardDescription>
                  Experience the comfort and privacy of an entire home. Perfect
                  for families or those who need more space.
                </CardDescription>
              </CardHeader>
            </Card>
          </HoverCard>
          <HoverCard>
            <Card>
              <CardHeader>
                <CardTitle>Gated Clusters</CardTitle>
                <CardDescription>
                  Enjoy the safety and community feel of our gated clusters.
                  Ideal for those prioritizing security and shared amenities.
                </CardDescription>
              </CardHeader>
            </Card>
          </HoverCard>
          <HoverCard>
            <Card>
              <CardHeader>
                <CardTitle>Cottages</CardTitle>
                <CardDescription>
                  Escape to our charming cottages for a quaint and cozy living
                  experience. Great for those seeking a touch of rustic charm.
                </CardDescription>
              </CardHeader>
            </Card>
          </HoverCard>
          <HoverCard>
            <Card>
              <CardHeader>
                <CardTitle>Student Accommodation</CardTitle>
                <CardDescription>
                  Calling all students! Find affordable and convenient housing
                  options near your campus. Stay focused on your studies while
                  we take care of your living arrangements.
                </CardDescription>
              </CardHeader>
            </Card>
          </HoverCard>
          <HoverCard>
            <Card>
              <CardHeader>
                <CardTitle>Single Rooms</CardTitle>
                <CardDescription>
                  For the minimalist or the budget-conscious, our single room
                  options provide comfort without the extra space you don't
                  need.
                </CardDescription>
              </CardHeader>
            </Card>
          </HoverCard>
        </div>
      </div>

      <div className="container">
        {/* <LandingImageCardsGrid /> */}
        <LandingScroll />
      </div>

      <div className="container mx-auto px-4 py-12">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-red-600">
              Why Choose Us?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Wide range of options to suit every need and budget</li>
              <li>Prime locations across the city</li>
              <li>Thoroughly vetted properties for your peace of mind</li>
              <li>Responsive customer service</li>
              <li>Easy booking process</li>
            </ul>
            <p className="mt-4 font-semibold">
              Start your search today and find the perfect place to call home!
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full">
              Browse Properties
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Testimonials />
      <HomeServicesSection />
    </div>
  );
};

export default HomePage;
