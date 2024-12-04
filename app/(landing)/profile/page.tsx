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
import TenantProfileCompletion from "@/components/TenantProfileCompletion";
import LandlordProfileCompletion from "@/components/LandlordProfileCompletion";
import RentPaymentsTable from "@/components/RentPaymentsTable";
import MyPropertiesList from "@/components/MyPropertiesList";
import ProfileCard from "@/components/ProfileCard";
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

async function getCurrentTenantProperties() {
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tenant-current-property/`,
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
  let tenantCurrentProperty;

  if (userType?.includes("landlord")) {
    data = await getCurrentLandlord();
    properties = await getOwnProperties();
    houseTypes = await getHouseTypes();
    houseLocations = await getHouseLocations();

    // Initialize the properties store with the fetched properties
    usePropertiesStore.getState().setProperties(properties);
  } else if (userType?.includes("tenant")) {
    data = await getCurrentTenant();
    tenantCurrentProperty = await getCurrentTenantProperties();
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
        <ProfileCard
          data={data}
          userType={userType || ""}
          token={userToken || ""}
        />
        {userType?.includes("landlord") ? (
          <div className="w-full sm:w-[70%]">
            {properties.length > 0 ? (
              <ProfilePropertySlider initialData={properties} />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <p className="text-center text-lg">
                  You Have Not Listed Any Properties Yet
                </p>
                <Image
                  src="/img/roja-watermark.svg"
                  alt="No Properties"
                  className="mt-5 w-[200px] h-[133px] sm:w-[300px] sm:h-[200px] md:w-[600px] md:h-[267px] lg:w-[800px] lg:h-[533px]"
                  width={400}
                  height={267}
                />
              </div>
            )}
            {/* <TenantDetailsCard tenantDetails={data} /> */}
          </div>
        ) : (
          <div className="w-full sm:w-[70%]">
            {/* <ProfilePropertySlider data={properties} /> */}
            <TenantDetailsCard initialTenantDetails={data} />
          </div>
        )}
      </div>

      {userType?.includes("tenant") && (
        <TenantProfileCompletion tenantData={data} />
      )}
      {userType?.includes("landlord") && (
        <LandlordProfileCompletion landlordData={data} />
      )}

      {chats.length > 0 && (
        <Chat
          initialChats={chats}
          userToken={userToken || ""}
          currentUserEmail={data?.user.email}
          currentUserId={data?.user.id}
          userData={data}
        />
      )}

      {userType?.includes("tenant") && (
        <div className="w-full space-y-4">
          <h2 className="text-lg font-semibold mt-8">
            Your Current Won Property
          </h2>
          <MyPropertiesList properties={tenantCurrentProperty} />
        </div>
      )}

      {userType?.includes("tenant") && <RentPaymentsTable />}

      {/* <PaymentStatus /> */}
      {/* <PaymentForm /> */}

      <AddNewPropertyDialog
        userType={userType}
        houseTypes={houseTypes}
        houseLocations={houseLocations}
        userToken={userToken}
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
