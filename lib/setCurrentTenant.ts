// app/actions/submitFormAction.ts
"use server";

import { cookies } from "next/headers";

export async function setCurrentTenantAction(
  tenantId: string,
  listingId: string
) {
  const token = cookies().get("access")?.value;

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  const formData = new FormData();
  formData.append("tenant_id", tenantId);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
  };

  try {
    const res = await fetch(
      `http://127.0.0.1:8000/auth/set-current-tenant/${listingId}/`,
      requestOptions
    );
    const data = await res.text();
    console.log(data);
    if (res.status === 201) {
      return { success: true, message: "Success" };
    } else {
      return { success: false, message: "Failed" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "An error occurred" };
  }
}
