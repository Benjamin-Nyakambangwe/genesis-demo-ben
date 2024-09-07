import { Metadata } from "next";
import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PropertySlider from "@/components/PropertySlider";
import HomeServicesSection from "@/components/HomeServicesSection";
import ImageSlider from "@/components/ImageSlider";
import LandingScroll from "@/components/LandingScroll";

// export const metadata: Metadata = {
//   title: "FSBO Africa | Find Your Dream Property",
//   description:
//     "Discover the best properties for sale and rent across Africa. FSBO Africa connects you with the latest real estate opportunities.",
//   keywords: "real estate, property, Africa, for sale, for rent, FSBO",
//   openGraph: {
//     title: "FSBO Africa | Find Your Dream Property",
//     description:
//       "Discover the best properties for sale and rent across Africa. FSBO Africa connects you with the latest real estate opportunities.",
//     url: "https://fsboafrica.com",
//     siteName: "FSBO Africa",
//     images: [
//       {
//         url: "https://fsboafrica.com/og-image.jpg",
//         width: 1200,
//         height: 630,
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "FSBO Africa | Find Your Dream Property",
//     description:
//       "Discover the best properties for sale and rent across Africa. FSBO Africa connects you with the latest real estate opportunities.",
//     images: ["https://fsboafrica.com/twitter-image.jpg"],
//   },
//   robots: {
//     index: true,
//     follow: true,
//   },
//   viewport: "width=device-width, initial-scale=1",
//   themeColor: "#ffffff",
// };

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

const HomePage = async () => {
  // const data = await getLatestProperties();
  const fullHouses = await getFullHousesList();
  const rooms = await getRoomsList();
  const clusters = await getClustersList();
  console.log("Home Page full houses", fullHouses);
  return (
    <div className="bg-gray-100">
      <HeroSection />
      {/* Properties For Sale Section */}
      <div className="container mx-auto">
        <h3 className="text-[22px] md:text-[32px] font-bold m-8">
          Full Houses
        </h3>
        <PropertySlider data={fullHouses} />
      </div>
      {/* Properties For Rent Section */}
      <div className="bg-white mt-24 pb-16">
        <div className="container mx-auto ">
          <h3 className="text-[22px] md:text-[32px] font-bold m-8">
            Dedicated Rooms
          </h3>
          <PropertySlider data={rooms} />
        </div>
      </div>
      <div className="bg-white mt-24 pb-16">
        <div className="container mx-auto ">
          <h3 className="text-[22px] md:text-[32px] font-bold m-8">
            Cluster Homes
          </h3>
          <PropertySlider data={clusters} />
        </div>
      </div>
      <ImageSlider />

      <LandingScroll />

      <HomeServicesSection />
    </div>
  );
};

export default HomePage;
