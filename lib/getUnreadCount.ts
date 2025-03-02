"use server";

import { cookies } from "next/headers";

export async function getUnreadMessageCount() {
  try {
    // Get user token from cookies
    const token = cookies().get("access")?.value;
    
    if (!token) {
      console.error("User not authenticated");
      return { success: false, error: "User not authenticated", unreadCount: 0 };
    }

    // Construct the backend URL
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
    
    // Create headers with cookie auth
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("User-Agent", "insomnia/10.3.1");
    myHeaders.append("Cookie", `access=${token}`);
    
    // Fetch unread count
    const response = await fetch(`${backendUrl}/api/messages/unread-count`, {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching unread count (${response.status}):`, errorText);
      return { 
        success: false, 
        error: `Failed to fetch unread count: ${response.status}`,
        unreadCount: 0
      };
    }

    const data = await response.json();
    return { 
      success: true, 
      unreadCount: data.unread_count
    };
  } catch (error) {
    console.error("Error fetching unread message count:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error",
      unreadCount: 0
    };
  }
} 