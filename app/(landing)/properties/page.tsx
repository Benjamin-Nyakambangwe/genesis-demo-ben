import { Metadata } from "next";
import PropertiesFilter from "@/components/PropertiesFilter";
import PropertiesHeader from "@/components/PropertiesHeader";
import PropertiesList from "@/components/PropertiesList";
import { Property } from "@/types";

export const metadata: Metadata = {
  title: "Property Listings | RO-JA Properties",
  description: "Browse our extensive collection of rental properties in Zimbabwe. Find houses, apartments, rooms, and more with detailed filters for location, price, and amenities.",
  keywords: [
    "Zimbabwe rentals",
    "property listings",
    "houses for rent",
    "apartments for rent",
    "rental properties Zimbabwe",
    "student accommodation",
    "property search",
    "RO-JA properties"
  ],
  openGraph: {
    title: "Find Your Perfect Rental Property | RO-JA Properties",
    description: "Discover a wide range of rental properties in Zimbabwe. Use our advanced filters to find your ideal home based on location, price, size, and amenities.",
    url: "https://beta.ro-ja.com/properties",
    siteName: "RO-JA Properties",
    images: [
      {
        url: "/img/RO-JA.svg",
        width: 1200,
        height: 630,
        alt: "RO-JA Property Listings"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Rental Properties | RO-JA",
    description: "Find your next home in Zimbabwe. Browse our curated list of rental properties with advanced search and filtering options.",
    images: ["/img/RO-JA.svg"],
    creator: "@roja_zw",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
    "pageType": "propertyListing",
    "country": "Zimbabwe",
    "platform": "RO-JA Properties",
  }
};

interface PropertiesResponse {
  data: Property[];
}

async function getFullHousesList() {
  const myHeaders = new Headers();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties-filter`,
    requestOptions
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
async function getHouseTypes() {
  // const token = cookies().get("access")?.value;
  // console.log(token);
  const myHeaders = new Headers();
  // myHeaders.append("Cookie", `access=${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/house-types`,
    requestOptions
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getHouseLocations() {
  // const token = cookies().get("access")?.value;
  // console.log(token);
  const myHeaders = new Headers();
  // myHeaders.append("Cookie", `access=${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/house-locations`,
    requestOptions
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const PropertiesPage = async () => {
  const fullHouses = await getFullHousesList();
  const houseTypes = await getHouseTypes();
  const houseLocations = await getHouseLocations();
  // const rooms = await getFullHousesList();
  // const cottages = await getFullHousesList();
  // const clusters = await getFullHousesList();

  console.log("full houses on List page", fullHouses);

  return (
    <div className="bg-gray-100 mt-16 pt-8">
      <div className="block md:flex w-full container">
        <div className="w-full md:w-[30%]">
          <PropertiesFilter
            houseTypes={houseTypes}
            houseLocations={houseLocations}
          />
        </div>
        <div className="w-full md:w-[70%]">
          <PropertiesHeader numOfHouses={fullHouses.length + 1} />
          <PropertiesList
          // fullHouses={fullHouses}
          // rooms={rooms}
          // cottages={cottages}
          // clusters={clusters}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
