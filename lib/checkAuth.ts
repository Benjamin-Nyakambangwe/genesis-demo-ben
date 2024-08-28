// // pages/api/check-auth.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { cookies } from "next/headers";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const cookieStore = cookies();
//   const authCookie = cookieStore.get("access");

//   if (authCookie) {
//     res.status(200).json({ isAuthenticated: true });
//   } else {
//     res.status(200).json({ isAuthenticated: false });
//   }
// }

"use server";

import { cookies } from "next/headers";

export async function checkAuth() {
  const token = cookies().get("access")?.value;
  console.log("CHECK AUTH");

  if (token) {
    return { success: true, message: "Success" };
  } else {
    return { success: false, message: "Failed" };
  }

  //   try {
  //     const res = await fetch("http://127.0.0.1:8000/api/sites/", requestOptions);
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
}
