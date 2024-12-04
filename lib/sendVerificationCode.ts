"use server";

import { cookies } from "next/headers";

export async function sendVerificationCode() {
  const cookieStore = cookies();
  const token = cookieStore.get("access")?.value;

  if (!token) {
    return {
      success: false,
      error: "No authentication token found",
    };
  }

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/send-verification-code/`,
      {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Verification code response:", data);

    return {
      success: true,
      message: "Verification code sent successfully",
    };
  } catch (error) {
    console.error("Error sending verification code:", error);
    return {
      success: false,
      error: "Failed to send verification code",
    };
  }
}
