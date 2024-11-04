"use server";

import { cookies } from "next/headers";

export async function submitNewPropertyForm(formData: FormData) {
  console.log("formData", formData);
  const token = cookies().get("access")?.value;

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);


  formData.append("owner", "1");
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/`,
      requestOptions
    );
    const data = await res.json();
    console.log(data);
    if (res.status === 201) {
      return {
        success: true,
        message: "Property created successfully",
        property: data,
      };
    } else {
      return {
        success: false,
        message: data.image_files?.[0] || "Failed to create property",
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "An error occurred" };
  }
}
