import { Metadata } from "next";
import PropertiesFilter from "@/components/PropertiesFilter";
import PropertiesHeader from "@/components/PropertiesHeader";
import PropertiesList from "@/components/PropertiesList";

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
        url: "https://fsboafrica.com/og-image.jpg", // Replace with your actual OG image
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
    images: ["https://fsboafrica.com/twitter-image.jpg"], // Replace with your actual Twitter image
  },
  robots: {
    index: true,
    follow: true,
  },
};

async function getPropertiesForSale() {
  const res = await fetch(
    " https://fsboafrica.com/api/properties/for-sale?search=for-sale"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getPropertiesToRent() {
  const res = await fetch(
    " https://fsboafrica.com/api/properties/to-rent?search=to-rent"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const PropertiesPage = async () => {
  const propertiesForSale = await getPropertiesForSale();
  const propertiesToRent = await getPropertiesToRent();

  console.log("properties for rent list", propertiesToRent);

  return (
    <div className="bg-gray-100 mt-16 pt-8">
      <div className="block md:flex w-full container">
        <div className="w-full md:w-[30%]">
          <PropertiesFilter />
        </div>
        <div className="w-full md:w-[70%]">
          <PropertiesHeader />
          <PropertiesList
            propertiesForSale={propertiesForSale.data}
            propertiesToRent={propertiesToRent.data}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
