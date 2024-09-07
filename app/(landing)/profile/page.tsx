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

async function getCurrentLandlord() {
  const token = cookies().get("access")?.value;
  console.log(token);
  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const res = await fetch(
    "http://127.0.0.1:8000/auth/landlord-profile/",
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
    redirect: "follow",
  };
  const res = await fetch(
    "http://127.0.0.1:8000/auth/tenant-profile/",
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
    redirect: "follow",
  };
  const res = await fetch(
    "http://127.0.0.1:8000/api/own-properties",
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
  const token = cookies().get("access")?.value;
  console.log(token);
  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

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

const ProfilePage = async () => {
  const cookieStore = cookies();
  const userType = cookieStore.get("user_details")?.value;
  let data;
  let properties;
  let houseTypes;
  let houseLocations;

  if (userType?.includes("landlord")) {
    data = await getCurrentLandlord();
    properties = await getOwnProperties();
    houseTypes = await getHouseTypes();
    houseLocations = await getHouseLocations();
  } else if (userType?.includes("tenant")) {
    data = await getCurrentTenant();
  }

  console.log("landloard", data);
  return (
    <div className=" container mt-24 mb-24">
      <div className="flex justify-between max-w-[100vw]">
        <Card className="">
          <CardContent>
            <div className=" mt-20 flex flex-col justify-center items-center">
              <Image
                src="/img/person.jpg"
                alt="@shadcn"
                width={150}
                height={150}
                className="rounded-3xl"
              />
              {/* <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="w-36 h-36 rounded-3xl"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
              <div className="flex flex-col items-start mt-4">
                <div className="flex justify-between">
                  <User className="h-4 w-4 text-red-600 mr-2" />
                  <h2>
                    {data?.user.first_name} {data?.user.last_name}
                  </h2>
                </div>

                <div className="flex justify-between">
                  <Mail className="h-4 w-4 text-red-600 mr-2" />

                  <h3>{data?.user.email}</h3>
                </div>
                <div className="flex justify-between">
                  <Phone className="h-4 w-4 text-red-600 mr-2" />
                  <h3>{data?.phone}</h3>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <EditProfileButton />
                <AddNewPropertyButton />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="w-[70%]">
          <ProfilePropertySlider data={properties} />
        </div>
      </div>
      <AddNewPropertyDialog
        userType={userType}
        houseTypes={houseTypes}
        houseLocations={houseLocations}
      />
      <EditProfileDialog data={data} userType={userType} />
    </div>
  );
};

export default ProfilePage;
