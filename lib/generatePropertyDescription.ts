// app/actions/submitFormAction.ts
"use server";

import { cookies } from "next/headers";

export async function generatePropertyDescriptionAction(formData: FormData) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access")?.value;

  console.log("Access Token:", accessToken);

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${accessToken}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generate-property-description/`,
      {
        method: "POST",
        headers: myHeaders,
        body: formData,
      }
    );

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    console.log("Response text:", text);

    if (!text) {
      return {
        success: false,
        error: "Empty response from server",
      };
    }

    const data = JSON.parse(text);
    console.log("Parsed data:", data);

    return {
      success: true,
      message: data.description || data.message,
    };
  } catch (error) {
    console.error("Generation error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to generate description",
    };
  }
}
