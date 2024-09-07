"use server";

import { cookies } from "next/headers";

export async function logout() {
  // const token = cookies().get("access")?.value;

  try {
    cookies().set("session", "", { expires: new Date(0) });
    cookies().set("access", "", { expires: new Date(0) });
    cookies().set("refresh", "", { expires: new Date(0) });
    cookies().set("user_details", "", { expires: new Date(0) });
    return { success: true, message: "Logout successful" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "An error occurred" };
  }
}
