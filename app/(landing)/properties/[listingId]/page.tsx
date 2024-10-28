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
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import CommentSection from "@/components/CommentSection";
import ReviewSection from "@/components/ReviewSection";
import { ConfirmPropertyDetailsDialog } from "@/components/ConfirmPropertyDetailsRevealDialog";
async function getProperty(listingId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/${listingId}`,
    {
      next: { revalidate: 36 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

async function createComment(
  formData: FormData,
  listingId: string,
  tenantId: string
) {
  "use server";

  const content = formData.get("content");

  if (!content || typeof content !== "string") {
    throw new Error("Content is required and must be a string");
  }

  const cookieStore = cookies();
  const accessToken = cookieStore.get("access")?.value;
  const userDetails = cookieStore.get("user_details")?.value;

  if (!userDetails) {
    throw new Error("User details not found in cookies");
  }

  let user;
  try {
    user = JSON.parse(userDetails);
  } catch (error) {
    throw new Error("Failed to parse user details");
  }

  console.log("Comment User", user);

  if (!user || !user.user_id) {
    throw new Error("User ID not found in user details");
  }

  const userID = user.user_id;

  if (!accessToken) {
    throw new Error("User not authenticated");
  }

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${accessToken}`);
  // myHeaders.append("Content-Type", "application/json");
  console.log("Listing ID", listingId);

  const formdata = new FormData();
  formdata.append("property", listingId); // listingId is already a string
  formdata.append("content", content);
  formdata.append("tenant", tenantId); // Keep as string

  let response;
  try {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/`,
      {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Network error: ${message}`);
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to create comment: ${response.status} ${errorText}`
    );
  }

  revalidatePath(`/properties/${listingId}`);
}

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  const data = await res.json();

  return data.map((property : { id: number | string }) => ({
    listingId: property.id.toString(),
  }));
}

async function getTenant() {
  const token = cookies().get("access")?.value;
  if (!token) {
    return null;
  }

  console.log(token);
  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/tenant-profile/`,
      requestOptions
    );
    if (!res.ok) {
      console.error("Failed to fetch tenant data:", await res.text());
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching tenant data:", error);
    return null;
  }
}

async function getLandlord(id: string) {
  const token = cookies().get("access")?.value;
  if (!token) {
    return null;
  }

  console.log(token);
  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/landlord-profile-limited/${id}`,
      requestOptions
    );
    if (!res.ok) {
      console.error("Failed to fetch landlord data:", await res.text());
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching landlord data:", error);
    return null;
  }
}

const PropertyPage = async ({ params }: { params: { listingId: string } }) => {
  const property = await getProperty(params.listingId);
  const landlord = await getLandlord(property.owner.id);
  const cookieStore = cookies();
  const userDetails = cookieStore.get("user_details")?.value;

  let user = null;
  let tenant = null;

  if (userDetails) {
    try {
      user = JSON.parse(userDetails);
      console.log(user);
      if (user && user.user_type === "tenant") {
        tenant = await getTenant();
      }
    } catch (error) {
      console.error("Failed to parse user details:", error);
    }
  }

  console.log("PROPERTY IN PROPERTY PAGE", property);

  return (
    <>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">{property?.title}</h1>
            <h5 className="text-xl text-gray-600">
              {property?.location?.name || "Location not available"}{" "}
              {property?.location?.city ? `| ${property?.location?.city}` : ""}
            </h5>
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
                    <div className="text-[#344E41]">
                      <Home className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Property ID</p>
                      <p>{property?.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-[#344E41]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Property Size</p>
                      <p>{property?.area}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="text-[#344E41]">
                      <Bed className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Bedrooms</p>
                      <p>{property?.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-[#344E41]">
                      <Bath className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Bathrooms</p>
                      <p>{property?.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-[#344E41]">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Price</p>
                      <p>${property?.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="text-[#344E41]">
                      <PawPrint className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Pet Friendly</p>
                      <p>{property?.petFriendly ? "Yes" : "No"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-[#344E41]">
                      <Cigarette className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Smoking Allowed</p>
                      <p>{property?.smokingAllowed ? "Yes" : "No"}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="text-[#344E41]">
                      <Droplets className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Pool</p>
                      <p>{property?.pool ? "Yes" : "No"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-[#344E41]">
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
                <ContactForm
                  listingId={property?.id}
                  landlord={landlord}
                  address={property?.address}
                  property={property}
                />
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6 h-[500px] flex flex-col">
                <h3 className="text-xl font-semibold mb-4">Comments</h3>
                <div className="flex-grow overflow-hidden">
                  <CommentSection
                    initialComments={property.comments}
                    propertyId={property.id}
                    tenant={tenant}
                    // landlord={landlord}
                    user={user}
                    property={property}
                    createComment={createComment}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6 h-[500px] flex flex-col">
                <h3 className="text-xl font-semibold mb-4">Reviews</h3>
                <div className="flex-grow overflow-hidden">
                  <ReviewSection
                    propertyId={property.id}
                    propertyOwner={landlord}
                    property={property}
                    // tenant={tenant}
                    userDetails={userDetails}
                    // createReview={createReview}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <ConfirmPropertyDetailsDialog
          price={property?.price}
          propertyId={property?.id}
        />
      </div>
    </>
  );
};

export default PropertyPage;
