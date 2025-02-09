// app/actions/submitFormAction.ts
"use server";

import { cookies } from "next/headers";

interface Plan {
  name: string;
  price: number;
  // Add other properties if needed
}

interface PaymentData {
  landlordEmail: string;
  phone: string;
  propertyId: number;
}


export async function submitLeaseDocumentPaymentAction({
  landlordEmail,
  phone,
  propertyId,

}: PaymentData) {
  console.log(phone, landlordEmail, propertyId);
  const token = cookies().get("access")?.value;

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  const formData = new FormData();
  formData.append("phone", phone);
  formData.append("email", "nziraian@gmail.com");
  //   formData.append("email", "benjaminnyakambangwe@gmail.com");
  formData.append("property_id", propertyId.toString());
  //   formData.append("email", tenantEmail);



  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/process-lease-document-payment/`,
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
