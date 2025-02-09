"use server";

import { cookies } from "next/headers";

export async function submitTenantRatingAction(formData: FormData) {
  console.log("SUBMIT TENANT RATING ACTION");

  const token = cookies().get("access")?.value;
  const refresh = cookies().get("refresh")?.value;

  if (!token) {
    return {
      success: false,
      message: "Authentication required",
    };
  }

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}; refresh=${refresh}`);

  // Create a new FormData with the values
  const submitData = new FormData();
  submitData.append("tenant", formData.get("tenant") as string);
  submitData.append("rating", formData.get("rating") as string);
  submitData.append("comment", formData.get("comment") as string);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: submitData,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/rate-tenant/`,
      requestOptions
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("API Error:", errorData);
      throw new Error("Failed to submit rating");
    }

    const result = await response.text();
    console.log("Success:", result);

    return {
      success: true,
      message: "Rating submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting rating:", error);
    return {
      success: false,
      message: "Failed to submit rating",
    };
  }
}
