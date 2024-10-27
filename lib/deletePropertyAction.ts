"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface DeletePropertyResponse {
  success: boolean;
  message: string;
}

export async function deleteProperty(
  propertyId: string | number
): Promise<DeletePropertyResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/${propertyId}/`;

  try {
    const token = cookies().get("access")?.value;

    if (!token) {
      throw new Error("No session found");
    }

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Cookie: `access=${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Revalidate the properties page to reflect the changes
    revalidatePath("/properties");
    revalidatePath("/profile");

    return {
      success: true,
      message: "Property deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting property:", error);
    return {
      success: false,
      message: "Failed to delete property. Please try again.",
    };
  }
}
