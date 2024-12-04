import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PropertiesHeader from "@/components/PropertiesHeader";
import PropertyCardWide from "@/components/PropertyCardWide";
import { Property } from "@/types";
import MyPropertiesList from "@/components/MyPropertiesList";
import { Crown } from "lucide-react";
import { Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Property Listings | RO-JA Properties",
  description:
    "Browse our extensive collection of rental properties in Zimbabwe. Find houses, apartments, rooms, and more with detailed filters for location, price, and amenities.",
  keywords: [
    "Zimbabwe rentals",
    "property listings",
    "houses for rent",
    "apartments for rent",
    "rental properties Zimbabwe",
    "student accommodation",
    "property search",
    "RO-JA properties",
  ],
  openGraph: {
    title: "Find Your Perfect Rental Property | RO-JA Properties",
    description:
      "Discover a wide range of rental properties in Zimbabwe. Use our advanced filters to find your ideal home based on location, price, size, and amenities.",
    url: "https://beta.ro-ja.com/properties",
    siteName: "RO-JA Properties",
    images: [
      {
        url: "/img/RO-JA.svg",
        width: 1200,
        height: 630,
        alt: "RO-JA Property Listings",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Rental Properties | RO-JA",
    description:
      "Find your next home in Zimbabwe. Browse our curated list of rental properties with advanced search and filtering options.",
    images: ["/img/RO-JA.svg"],
    creator: "@ro-ja_zw",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://beta.ro-ja.com/properties",
  },
  authors: [{ name: "RO-JA" }],
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    pageType: "propertyListing",
    country: "Zimbabwe",
    platform: "RO-JA Properties",
  },
};

interface PropertiesResponse {
  data: Property[];
}

const getMyListings = async () => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access")?.value;

  if (!accessToken) {
    return null;
  }

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${accessToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tenant-accessible-properties`,
      requestOptions
    );

    if (!res.ok) {
      throw new Error("Failed to fetch listings");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return null;
  }
};

const getTenantSubscriptionDetails = async () => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access")?.value;

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${accessToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/tenant-profile-limited/`,
      requestOptions
    );
    const data = await res.text();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const MyListingsPage = async () => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access")?.value;

  if (!accessToken) {
    return (
      <div className="bg-gray-100 mt-16 pt-8 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold text-[#344E41] mb-4">
              Please Log In
            </h1>
            <p className="text-gray-600 mb-8">
              You need to be logged in to view your listings.
            </p>
            <Button
              className="bg-[#344E41] hover:bg-[#A3B18A] text-white"
              asChild
            >
              <Link href="/auth/login">Log In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const myListings = await getMyListings();
  const tenantSubscriptionDetails = await getTenantSubscriptionDetails();

  const parsedTenantSubscriptionDetails = JSON.parse(tenantSubscriptionDetails);

  console.log("tenantSubscriptionDetails", parsedTenantSubscriptionDetails);

  if (!myListings) {
    return (
      <div className="bg-gray-100 mt-16 pt-8 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold text-[#344E41] mb-4">
              Error Loading Listings
            </h1>
            <p className="text-gray-600">
              There was a problem loading your listings. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 mt-16 pt-8 min-h-screen">
      <Card className="w-full bg-[#344E41] text-white container mx-auto my-4">
        <CardContent className="flex flex-col sm:flex-row items-center justify-between p-4">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <Home className="h-6 w-6" />
            <span className="text-lg font-semibold">
              {parsedTenantSubscriptionDetails?.num_properties} Property Views
              Left
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Crown className="h-6 w-6" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {parsedTenantSubscriptionDetails?.subscription_plan} Plan
              </span>
              <Badge variant="secondary" className="mt-1">
                {parsedTenantSubscriptionDetails?.subscription_status?.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="block md:flex w-full container">
        <div className="w-full">
          {/* <PropertiesHeader numOfHouses={myListings.length} /> */}
          {myListings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">
                You haven't accessed any properties yet.
              </p>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <MyPropertiesList properties={myListings} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyListingsPage;
