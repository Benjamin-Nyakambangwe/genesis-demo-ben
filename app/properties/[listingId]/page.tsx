import { Metadata } from "next";
import { Facebook, Twitter, Instagram, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Script from "next/script";

async function getProperty(listingId) {
  const res = await fetch(
    `https://fsboafrica.com/api/properties/details/${listingId}`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const property = await getProperty(params.listingId);

  return {
    title: `${property.data.title} | FSBO Africa`,
    description: property.data.description.substring(0, 160),
    openGraph: {
      title: property.data.title,
      description: property.data.description.substring(0, 200),
      images: [property.data.images[0].filePath],
      url: `https://fsboafrica.com/properties/${property.data.id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: property.data.title,
      description: property.data.description.substring(0, 200),
      images: [property.data.images[0].filePath],
    },
    alternates: {
      canonical: `https://fsboafrica.com/properties/${property.data.id}`,
    },
  };
}

export async function generateStaticParams() {
  const [forSaleRes, toRentRes] = await Promise.all([
    fetch("https://fsboafrica.com/api/properties/for-sale?search=for-sale"),
    fetch("https://fsboafrica.com/api/properties/to-rent?search=to-rent"),
  ]);

  const [forSaleData, toRentData] = await Promise.all([
    forSaleRes.json(),
    toRentRes.json(),
  ]);

  const allProperties = [...forSaleData.data, ...toRentData.data];

  return allProperties.map((property) => ({
    listingId: property.id.toString(),
  }));
}

const PropertyPage = async ({ params }) => {
  const property = await getProperty(params.listingId);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: property.data.title,
    description: property.data.description,
    image: property.data.images[0].filePath,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.data.address,
      addressCountry: "Africa",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: property.data.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Script
        id="jsonld-property-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">{property?.data.title}</h1>
            <h5 className="text-xl text-gray-600">{property?.data.address}</h5>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <h2 className="text-2xl font-semibold  mb-4 md:mb-0 md:mr-8">
              $ {property?.data.price}
            </h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-blue-100"
              >
                <Facebook className="h-5 w-5 text-blue-600" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-blue-100"
              >
                <Twitter className="h-5 w-5 text-blue-400" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-pink-100"
              >
                <Instagram className="h-5 w-5 text-pink-600" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-gray-100"
              >
                <Share2 className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <Image
                src={property?.data.images[0].filePath}
                width={1000}
                height={600}
                alt="Property Image"
                className="rounded-lg shadow-md"
              />
            </div>
            <Card className="shadow-lg">
              <CardContent className="prose max-w-none p-6">
                <h3 className="text-2xl font-semibold mb-4">
                  Property Description
                </h3>

                <p className="mb-6">{property?.data.description}</p>

                <Separator />

                <h3 className="text-xl font-semibold mt-6 mb-4">
                  Property Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p>
                      <strong>Property ID:</strong> {property?.data.id}
                    </p>
                    <p>
                      <strong>Property Size:</strong>{" "}
                      {property?.data.propertySize}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Property Type:</strong> {property?.data.type}
                    </p>
                    <p>
                      <strong>Year Built:</strong> {property?.data.yearBuilt}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Property Status:</strong> {property?.data.status}
                    </p>
                    <p>
                      <strong>Property Price:</strong> USD{" "}
                      {property?.data.price}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <ContactForm listingId={property?.data.id} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyPage;
