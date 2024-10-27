// app/actions/submitFormAction.ts
"use server";

import { cookies } from "next/headers";

export async function submitReviewAction(
  comment: string,
  rating: number,
  propertyOwnerId: number,
  propertyId: number
) {
  const token = cookies().get("access")?.value;

  console.log("Property ID", propertyId);
  console.log("Property Owner ID", propertyOwnerId);
  console.log("Rating", rating);
  console.log("Comment", comment);

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  const formData = new FormData();
  formData.append("reviewed", propertyOwnerId.toString());
  formData.append("property", propertyId.toString());
  formData.append("rating", rating.toString());
  formData.append("comment", comment);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow" as RequestRedirect,
  };
  const requestOptions2 = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/`,
      requestOptions
    );

    const res2 = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/tenant-profile/`,
      requestOptions2
    );
    const data = await res.text();
    const data2 = await res2.json();
    console.log(data);
    console.log(data2);

    if (res.status === 201) {
      // Extract first_name and last_name from data2
      const reviewerName = {
        first_name: data2.user.first_name,
        last_name: data2.user.last_name,
      };
      return { success: true, message: "Success", reviewerName };
    } else {
      return { success: false, message: "Failed" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "An error occurred" };
  }
}
