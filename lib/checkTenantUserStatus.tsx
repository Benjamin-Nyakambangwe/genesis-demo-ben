// app/actions/submitFormAction.ts
"use server";
import { cookies } from "next/headers";

export async function checkTenantUserStatusAction() {
  const token = cookies().get("access")?.value;
  const userType = cookies().get("user_details")?.value;

  console.log("Token:", token);
  console.log("User type:", userType);

  if (!token) {
    console.log("No token found");
    return { success: false, message: "No token found" };
  }

  if (userType?.includes("tenant")) {
    console.log("Tenant user type found");
    return { success: true, message: "Tenant" };
  }

  console.log("Unknown user type");
  return { success: false, message: "Unknown user type" };
}
