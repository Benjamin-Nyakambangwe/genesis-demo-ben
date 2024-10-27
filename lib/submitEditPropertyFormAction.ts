"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface EditPropertyResponse {
  success: boolean;
  message: string;
  property?: any; // You can define a more specific type if needed
}

export async function submitEditPropertyForm(
  formData: FormData
): Promise<EditPropertyResponse> {
  const propertyId = formData.get("id");
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/${propertyId}/`;

  try {
    // Get the session token from cookies
    // const cookieStore = cookies();
    const token = cookies().get("access")?.value;

    if (!token) {
      throw new Error("No session found");
    }

    // Convert FormData to a plain object
    const plainFormData: { [key: string]: string | File | string[] } = {};
    formData.forEach((value, key) => {
      if (key === "image_files") {
        // Handle multiple files
        const files = formData.getAll(key);
        plainFormData[key] = files as File[];
      } else if (key === "removed_images") {
        // Parse the JSON string back to an array
        plainFormData[key] = JSON.parse(value as string);
      } else {
        plainFormData[key] = value;
      }
    });

    // Create a new FormData instance for the API request
    const apiFormData = new FormData();
    Object.entries(plainFormData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          apiFormData.append(key, item);
        });
      } else {
        apiFormData.append(key, value);
      }
    });

    const response = await fetch(apiUrl, {
      method: "PATCH",
      body: apiFormData,
      headers: {
        // Don't set Content-Type header, let the browser set it with the boundary
        Cookie: `access=${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Revalidate the properties page to reflect the changes
    revalidatePath("/properties");
    revalidatePath("/profile");

    return {
      success: true,
      message: "Property updated successfully",
      property: data,
    };
  } catch (error) {
    console.error("Error updating property:", error);
    return {
      success: false,
      message: "Failed to update property. Please try again.",
    };
  }
}
