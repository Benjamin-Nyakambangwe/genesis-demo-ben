import TenantDetailsCard from "@/components/TenantDetailsCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { submitMessageAction } from "@/lib/submitMessage";
import { cookies } from "next/headers";
import { StarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { submitTenantRatingAction } from "@/lib/submitTenantRating";
import MessageForm from "./MessageForm";
import TenantRatingForm from "./TenantRatingForm";

const getTenantRatings = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/tenant-ratings/${id}/`
  );
  return response.json();
};

interface TenantProfilePageProps {
  params: {
    id: string;
  };
}

export default async function TenantProfilePage({
  params,
}: TenantProfilePageProps) {
  const cookieStore = cookies();
  const userType = cookieStore.get("user_details")?.value;
  const userToken = cookieStore.get("access")?.value;
  const { id } = params;

  let tenantData = null;
  let error = null;
  let tenantRatings = null;
  try {
    // Fetch tenant data using the id
    tenantData = await fetchTenantData(id);
    console.log("TENANT DATA", tenantData);

    tenantRatings = await getTenantRatings(tenantData?.id);
    console.log("TENANT RATINGS", tenantRatings);
  } catch (err) {
    console.error("Failed to fetch tenant data:", err);
    error = "Failed to load tenant data. Please try again later.";
  }

  return (
    <div className="container mx-auto px-4 mt-24 sm:mt-36 my-6 sm:my-10">
      {userToken && userType?.includes("landlord") ? (
        error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : tenantData ? (
          <div>
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
              <div className="w-full lg:w-2/3">
                <TenantDetailsCard
                  initialTenantDetails={tenantData}
                  isLandlord={true}
                />
              </div>
              <div className="flex flex-col gap-6 w-full lg:w-1/3">
                <MessageForm
                  tenantEmail={tenantData?.user?.email || ""}
                  tenantId={tenantData?.id || ""}
                />
                <TenantRatingForm tenantId={tenantData?.id || ""} />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full mt-8">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-center p-2 sm:p-4">
                    Tenant Ratings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tenantRatings.map((review: any, index: any) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-[#344E41] fill-[#344E41]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          {review.comment}
                        </p>
                        <p className="text-xs text-gray-500">
                          Posted by {review.landlord_name}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center">Loading tenant data...</div>
        )
      ) : (
        <div className="text-center">
          You don't have permission to view this page.
        </div>
      )}
    </div>
  );
}

async function fetchTenantData(id: string) {
  const token = cookies().get("access")?.value;
  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/custom-tenant-profile/${id}/`,
    requestOptions
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tenant data");
  }
  return response.json();
}
