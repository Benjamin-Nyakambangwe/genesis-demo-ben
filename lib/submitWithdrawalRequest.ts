"use server";

import { cookies } from "next/headers";

export async function submitWithdrawalRequest(formData: FormData) {
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

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/landlord/withdrawal/create/`,
      requestOptions
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("API Error:", errorData);
      throw new Error("Failed to submit withdrawal request");
    }

    const result = await response.json();
    console.log("Success:", result);

    return {
      success: true,
      data: result,
      message: "Withdrawal request submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting withdrawal request:", error);
    return {
      success: false,
      message: "Failed to submit withdrawal request",
    };
  }
} 