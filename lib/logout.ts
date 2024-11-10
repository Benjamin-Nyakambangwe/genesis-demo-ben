"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  try {
    // Clear all auth-related cookies
    cookies().set("session", "", { expires: new Date(0) });
    cookies().set("access", "", { expires: new Date(0) });
    cookies().set("refresh", "", { expires: new Date(0) });
    cookies().set("user_details", "", { expires: new Date(0) });

    return { success: true };
  } catch (error) {
    console.error("Error during logout:", error);
    return { success: false, message: "An error occurred during logout" };
  }
}
