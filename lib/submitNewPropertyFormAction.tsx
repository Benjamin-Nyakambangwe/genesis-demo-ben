// // app/actions/submitFormAction.ts
// "use server";

// import { cookies } from "next/headers";

// export async function submitNewPropertyForm(formData: FormData) {
//   const token = cookies().get("access")?.value;

//   const myHeaders = new Headers();
//   myHeaders.append("Cookie", `access=${token}`);

//   // formData.append("domain_authority", "99");
//   // formData.append("organic_traffic", "12000000");
//   formData.append("owner", "1");
//   formData.append("main_image", formData.get("image_1"));

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: formData,
//     redirect: "follow" as RequestRedirect,
//   };

//   try {
//     const res = await fetch(
//       "http://127.0.0.1:8000/api/properties/",
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

export async function submitNewPropertyForm(formData: FormData) {
  const token = cookies().get("access")?.value;

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  // Do not manually append owner or main_image
  // The backend should handle these based on the authenticated user and uploaded images
  formData.append("owner", "1");
  //   formData.append("main_image", formData.get("image_1"));
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const res = await fetch(
      "http://127.0.0.1:8000/api/properties/",
      requestOptions
    );
    const data = await res.json(); // Parse the response as JSON
    console.log(data);
    if (res.status === 201) {
      return { success: true, message: "Property created successfully" };
    } else {
      // If there's an error, return the error message from the server
      return {
        success: false,
        message: data.image_files?.[0] || "Failed to create property",
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "An error occurred" };
  }
}
