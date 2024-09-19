// app/actions/submitFormAction.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function submitEditTenantProfileFormAction(formData: FormData) {
  const token = cookies().get("access")?.value;

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: formData,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const res = await fetch(
      "http://127.0.0.1:8000/auth/tenant-profile/",
      requestOptions
    );
    const data = await res.json(); // Parse the response as JSON
    console.log(data);
    if (res.status === 200) {
      // Revalidate the profile page and any other relevant pages

      revalidatePath("/profile");
      return { success: true, message: "Profile updated successfully", data };
    } else {
      return {
        success: false,
        message: data.detail || "Failed to update profile",
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "An error occurred while updating the profile",
    };
  }
}
