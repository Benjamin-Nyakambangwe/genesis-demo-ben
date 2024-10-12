"use server";

import { cookies } from "next/headers";

export async function submitEnquiry(formData: FormData) {
  const token = cookies().get("access")?.value;
  const listingId = formData.get("listingId");
  const message = formData.get("message");

  const response = await fetch("https://fsboafrica.com/api/enquiries/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access=${token}`,
    },
    body: JSON.stringify({
      listingId,
      message,
      ownedBy: "benjaminnyakambangwe@gmail.com",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit enquiry");
  }

  return response.json();
}
