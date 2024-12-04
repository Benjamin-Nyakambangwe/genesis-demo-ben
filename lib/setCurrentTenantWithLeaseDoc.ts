// // app/actions/submitFormAction.ts
// "use server";

// import { cookies } from "next/headers";

// export async function setCurrentTenantWithLeaseDocAction(
//   tenantId: string,
//   listingId: string
// ) {
//   const token = cookies().get("access")?.value;

//   const myHeaders = new Headers();
//   myHeaders.append("Cookie", `access=${token}`);

//   const formData = new FormData();
//   formData.append("tenant_id", tenantId);

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: formData,
//   };

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/set-current-tenant-with-lease-doc/${listingId}/`,
//       requestOptions
//     );
//     const data = await res.text();
//     console.log(data);
//     if (res.status === 201) {
//       return { success: true, message: "Success" };
//     } else {
//       return { success: false, message: "Failed" };
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     return { success: false, message: "An error occurred" };
//   }
// }

// app/actions/submitFormAction.ts
"use server";

import { cookies } from "next/headers";

export async function setCurrentTenantWithLeaseDocAction(
  tenantId: string,
  listingId: string
) {
  const token = cookies().get("access")?.value;

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);
  myHeaders.append("Content-Type", "application/json"); // Add this line

  // Change from FormData to JSON
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      tenant_id: tenantId,
    }),
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/set-current-tenant-with-lease-doc/${listingId}/`,
      requestOptions
    );

    const data = await res.json(); // Change from text() to json()
    console.log(data);

    if (res.ok) {
      // Change from status === 201 to ok
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.error || "Failed" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "An error occurred" };
  }
}
