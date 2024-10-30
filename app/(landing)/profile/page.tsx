import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfilePropertySlider from "@/components/ProfilePropertySlider";
import { cookies } from "next/headers";
import Image from "next/image";
import AddNewPropertyButton from "@/components/AddNewPropertyButton";
import EditProfileButton from "@/components/EditProfileButton";
import { AddNewPropertyDialog } from "@/components/AddPropertyDialog";
import { EditProfileDialog } from "@/components/EditProfileDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";
import TenantDetailsCard from "@/components/TenantDetailsCard";
import IdUploadButton from "@/components/IdUploadButton";
import { EditPropertyDialog } from "@/components/EditPropertyDialog";
import { usePropertiesStore } from "@/store/properties";
import LandlordIdUploadButton from "@/components/LandlordIdUploadButton";
import LandlordProfileImageUploadButton from "@/components/LandloadProfileImageUploadButton";
import ProofOfEmploymentUploadButton from "@/components/ProofOfEmploymentUploadButton";
import ProofOfResidenceUploadButton from "@/components/ProofOfResidenceUploadButton";
import TenantProfileImageUploadButton from "@/components/TenantProfileImageUploadButton";
import PaymentStatus from "@/components/PaymentStatus";
import PaymentForm from "@/components/forms/PaymentForm";
import Chat from "@/components/Chat";
import PropertyTenantsDrawer from "@/components/PropertyTenantsDrawer";

async function getCurrentLandlord() {
  const token = cookies().get("access")?.value;
  console.log(token);
  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/landlord-profile/`,
    requestOptions
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getCurrentTenant() {
  const token = cookies().get("access")?.value;
  console.log(token);
  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/tenant-profile/`,
    requestOptions
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getOwnProperties() {
  const token = cookies().get("access")?.value;
  console.log(token);
  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/own-properties`,
    requestOptions
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getHouseTypes() {
  const token = cookies().get("access")?.value;
  console.log(token);
  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

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
  const token = cookies().get("access")?.value;
  console.log(token);
  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

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

async function getChats() {
  const token = cookies().get("access")?.value;
  if (!token) {
    // If there's no token, return an empty array instead of throwing an error
    return [];
  }

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/available-chats/`,
      requestOptions
    );
    if (!res.ok) {
      // If the response is not OK, return an empty array instead of throwing an error
      console.error("Failed to fetch chats:", res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    // If there's an error during the fetch, log it and return an empty array
    console.error("Error fetching chats:", error);
    return [];
  }
}

const ProfilePage = async () => {
  const cookieStore = cookies();
  const userType = cookieStore.get("user_details")?.value;
  const userToken = cookieStore.get("access")?.value;
  let data;
  let properties;
  let houseTypes;
  let houseLocations;

  if (userType?.includes("landlord")) {
    data = await getCurrentLandlord();
    properties = await getOwnProperties();
    houseTypes = await getHouseTypes();
    houseLocations = await getHouseLocations();

    // Initialize the properties store with the fetched properties
    usePropertiesStore.getState().setProperties(properties);
  } else if (userType?.includes("tenant")) {
    data = await getCurrentTenant();
  }

  let chats = [];
  try {
    chats = await getChats();
  } catch (error) {
    console.error("Error fetching chats:", error);
    // chats will remain an empty array if there's an error
  }

  console.log("landloard", data);
  return (
    <div className=" container mt-24 mb-24">
      <div className="flex flex-col sm:flex-row justify-between max-w-[100vw]">
        <Card className="">
          <CardContent>
            <div className=" mt-7 flex flex-col justify-center items-center">
              <Image
                src={data?.profile_image || "/img/avatar.png"}
                alt="@shadcn"
                width={150}
                height={150}
                className="rounded-3xl"
              />

              <div className="flex flex-col items-start mt-4">
                <div className="flex justify-between">
                  <User className="h-4 w-4 text-[#344E41] mr-2" />
                  <h2>
                    {data?.user.first_name} {data?.user.last_name}
                  </h2>
                </div>

                <div className="flex justify-between">
                  <Mail className="h-4 w-4 text-[#344E41] mr-2" />

                  <h3>{data?.user.email}</h3>
                </div>
                <div className="flex justify-between">
                  <Phone className="h-4 w-4 text-[#344E41] mr-2" />
                  <h3>{data?.phone}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4">
                <EditProfileButton />
                {userType?.includes("landlord") ? (
                  <>
                    <AddNewPropertyButton />
                    <LandlordIdUploadButton />
                    <ProofOfResidenceUploadButton />
                    <LandlordProfileImageUploadButton />
                  </>
                ) : (
                  <>
                    <IdUploadButton />
                    <ProofOfEmploymentUploadButton />
                    <TenantProfileImageUploadButton />
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        {userType?.includes("landlord") ? (
          <div className="w-full sm:w-[70%]">
            <ProfilePropertySlider initialData={properties} />
            {/* <TenantDetailsCard tenantDetails={data} /> */}
          </div>
        ) : (
          <div className="w-full sm:w-[70%]">
            {/* <ProfilePropertySlider data={properties} /> */}
            <TenantDetailsCard initialTenantDetails={data} />
          </div>
        )}
      </div>

      {chats.length > 0 && (
        <Chat
          initialChats={chats}
          userToken={userToken || ""}
          currentUserEmail={data?.user.email}
          currentUserId={data?.user.id}
          userData={data}
        />
      )}

      {/* <PaymentStatus /> */}
      {/* <PaymentForm /> */}

      <AddNewPropertyDialog
        userType={userType}
        houseTypes={houseTypes}
        houseLocations={houseLocations}
      />
      <EditProfileDialog data={data} userType={userType} />
      <EditPropertyDialog
        houseTypes={houseTypes}
        houseLocations={houseLocations}
      />
      <PropertyTenantsDrawer />
    </div>
  );
};

export default ProfilePage;
