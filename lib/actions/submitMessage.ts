"use server";

import { cookies } from "next/headers";

export async function submitMessage(formData: FormData) {
  const token = cookies().get("access")?.value;
  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  const receiver = formData.get("receiver") as string;
  const content = formData.get("message") as string;
  const listingId = formData.get("listingId") as string;

  console.log("Receiver:", receiver);
  console.log("Content:", content);
  console.log("Listing ID:", listingId);

  const requestBody = new FormData();
  requestBody.append("receiver", receiver);
  requestBody.append("content", content);
  // If the API requires the listingId, uncomment the following line:
  // requestBody.append("listing_id", listingId);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: requestBody,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    const result = await response.text();
    console.log("API Response:", result);
    return { success: true, message: "Message sent successfully" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Failed to send message" };
  }
}
