import { Metadata } from "next";
import {
  Facebook,
  Twitter,
  Instagram,
  Share2,
  Droplets,
  Vegan,
} from "lucide-react";
import {
  Bed,
  Bath,
  Home,
  DollarSign,
  Calendar,
  PawPrint,
  Cigarette,
  Pool,
  Tree,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Script from "next/script";
import ImageShowcase from "@/components/ImageShowcase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

async function getProperty(listingId: string) {
  const res = await fetch(`http://127.0.0.1:8000/api/properties/${listingId}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch("http://127.0.0.1:8000/api/properties");

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  const data = await res.json();

  return data.map((property) => ({
    listingId: property.id.toString(),
  }));
}

const PropertyPage = async ({ params }: { params: { listingId: string } }) => {
  const property = await getProperty(params.listingId);

  // Sample comments (in a real app, these would come from a database)
  const sampleComments = [
    {
      id: 1,
      user: "John Doe",
      text: "Great property! Love the location.",
      date: "2023-04-15",
    },
    {
      id: 2,
      user: "Jane Smith",
      text: "The garden is beautiful. Can't wait to see it in person.",
      date: "2023-04-16",
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">{property?.title}</h1>
            <h5 className="text-xl text-gray-600">{property?.address}</h5>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <h2 className="text-2xl font-semibold  mb-4 md:mb-0 md:mr-8">
              $ {property?.price}
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
              <ImageShowcase images={property?.images} />
            </div>
            <Card className="shadow-lg">
              <CardContent className="prose max-w-none p-6">
                <h3 className="text-2xl font-semibold mb-4">
                  Property Description
                </h3>
                <p className="mb-6">{property?.description}</p>
                <Separator className="my-6" />
                <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-2">
                    <div className="text-red-600">
                      <Home className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Property ID</p>
                      <p>{property?.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-red-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Property Size</p>
                      <p>{property?.area}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="text-red-600">
                      <Bed className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Bedrooms</p>
                      <p>{property?.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-red-600">
                      <Bath className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Bathrooms</p>
                      <p>{property?.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-red-600">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Price</p>
                      <p>${property?.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="text-red-600">
                      <PawPrint className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Pet Friendly</p>
                      <p>{property?.petFriendly ? "Yes" : "No"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-red-600">
                      <Cigarette className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Smoking Allowed</p>
                      <p>{property?.smokingAllowed ? "Yes" : "No"}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="text-red-600">
                      <Droplets className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Pool</p>
                      <p>{property?.pool ? "Yes" : "No"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-red-600">
                      <Vegan className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Garden</p>
                      <p>{property?.garden ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="shadow-lg mb-8">
              <CardContent className="p-6">
                <ContactForm listingId={property?.id} />
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Comments</h3>
                <div className="space-y-4 mb-6">
                  {sampleComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border-b pb-2 border-red-600"
                    >
                      <p className="font-semibold text-red-600">
                        {comment.user}
                      </p>
                      <p className="text-sm text-gray-600">{comment.date}</p>
                      <p className="mt-1">{comment.text}</p>
                    </div>
                  ))}
                </div>
                <form className="space-y-4">
                  {/* <Input placeholder="Your name" /> */}
                  <Textarea
                    placeholder="Add a comment....."
                    className="focus-visible:ring-red-600 focus:border-0"
                  />
                  <Button type="submit" className="bg-red-600">
                    Post Comment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyPage;
