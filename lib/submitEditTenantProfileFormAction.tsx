// app/actions/submitFormAction.ts
"use server";

import { cookies } from "next/headers";

export async function submitEditTenantProfileForm(formData: FormData) {
  const token = cookies().get("access")?.value;

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  // formData.append("domain_authority", "99");
  // formData.append("organic_traffic", "12000000");
  // formData.append("publisher", "1");

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
    const data = await res.text();
    console.log(data);
    if (res.status === 200) {
      return { success: true, message: "Success" };
    } else {
      return { success: false, message: "Failed" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "An error occurred" };
  }
}
