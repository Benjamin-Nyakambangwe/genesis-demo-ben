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

  try {
    // Fetch tenant data using the id
    tenantData = await fetchTenantData(id);
    console.log("TENANT DATA", tenantData);
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
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
            <div className="w-full lg:w-2/3">
              <TenantDetailsCard
                initialTenantDetails={tenantData}
                isLandlord={true}
              />
            </div>
            <Card className="w-full lg:w-1/3 min-w-[300px] max-w-[450px] mx-auto">
              <CardHeader>
                <CardTitle className="text-center p-2 sm:p-4">
                  Quick Message Tenant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form action={submitMessageAction}>
                  <input
                    type="hidden"
                    name="receiver"
                    value={tenantData?.user?.email || ""}
                  />
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Type your message here."
                        required
                        className="min-h-[120px]"
                      />
                    </div>
                  </div>
                  <CardFooter className="flex flex-col items-center mt-4">
                    <Button
                      className="w-full bg-[#344E41] text-[#DAD7CD] hover:bg-[#A3B18A] rounded-full"
                      type="submit"
                    >
                      Send Message
                    </Button>
                    <div>
                      <p className="text-xs text-center mt-2">
                        By sending inquiry messages, you agree to our{" "}
                        <span className="text-[#344E41] font-bold">
                          <Link href="/terms-of-service">
                            Terms and Conditions.
                          </Link>
                        </span>
                      </p>
                    </div>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
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
