import { Metadata } from "next";
import PropertiesFilter from "@/components/PropertiesFilter";
import PropertiesHeader from "@/components/PropertiesHeader";
import PropertiesList from "@/components/PropertiesList";
import { Property } from "@/types";

export const metadata: Metadata = {
  title: "Available Properties | FSBO Africa",
  description:
    "Browse our list of available properties for sale and rent across Africa.",
  openGraph: {
    title: "Available Properties | FSBO Africa",
    description:
      "Browse our list of available properties for sale and rent across Africa.",
    url: "https://fsboafrica.com/properties",
    siteName: "FSBO Africa",
    images: [
      {
        url: "https://fsboafrica.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Available Properties | FSBO Africa",
    description:
      "Browse our list of available properties for sale and rent across Africa.",
    images: ["https://fsboafrica.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface PropertiesResponse {
  data: Property[];
}

async function getFullHousesList() {
  const myHeaders = new Headers();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const res = await fetch(
    "http://127.0.0.1:8000/api/properties-filter",
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
    redirect: "follow",
  };
  const res = await fetch(
    "http://127.0.0.1:8000/api/house-types",
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
    redirect: "follow",
  };
  const res = await fetch(
    "http://127.0.0.1:8000/api/house-locations",
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
            fullHouses={fullHouses}
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
