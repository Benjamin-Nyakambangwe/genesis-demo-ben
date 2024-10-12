// app/actions/submitFormAction.ts
"use server";

import { cookies } from "next/headers";

interface Plan {
  name: string;
  price: number;
  // Add other properties if needed
}

interface PaymentData {
  plan: Plan;
  phone: string;
}

export async function giveTenantAccessAction(propertyId) {
  const token = cookies().get("access")?.value;

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const res = await fetch(
      `http://127.0.0.1:8000/auth/add-tenant-access/${propertyId}/`,
      requestOptions
    );
    const data = await res.text();
    // console.log(data);
    if (res.status === 200) {
      return { success: true, message: "Success", data: data };
    } else {
      return { success: false, message: "Failed" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "An error occurred" };
  }
}
