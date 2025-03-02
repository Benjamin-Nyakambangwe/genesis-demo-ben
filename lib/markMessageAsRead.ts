"use server";

import { cookies } from "next/headers";

// Function to mark all unread messages as read
export async function markAllUnreadMessagesAsRead(currentUserEmail: string, otherUserEmail: string) {
  try {
    // Get user token from cookies
    const token = cookies().get("access")?.value;
    
    if (!token) {
      console.error("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }

    // Construct the backend URL
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
    
    // Create headers with cookie auth
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", `access=${token}`);
    
    // 1. First fetch all messages
    const messagesResponse = await fetch(`${backendUrl}/api/messages/`, {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
    });

    if (!messagesResponse.ok) {
      const errorText = await messagesResponse.text();
      console.error(`Error fetching messages (${messagesResponse.status}):`, errorText);
      return { 
        success: false, 
        error: `Failed to fetch messages: ${messagesResponse.status}`,
        details: errorText
      };
    }

    // Parse the response to get all messages
    const allMessages = await messagesResponse.json();

    console.log("All Messages", allMessages);
    
    // 2. Filter unread messages where the user is the receiver
    const unreadMessages = allMessages.filter(
      (message: any) => 
        message.receiver === currentUserEmail && 
        message.sender === otherUserEmail &&
        !message.is_read
    );
    
    console.log("Unread Messages sent by " + otherUserEmail + " to " + currentUserEmail, unreadMessages);
    console.log(`Found ${unreadMessages.length} unread messages to mark as read`);
    
    // 3. Mark each unread message as read
    const results = await Promise.all(
      unreadMessages.map(async (message: any) => {
        const markReadResponse = await fetch(
          `${backendUrl}/api/messages/${message.id}/mark-read/`, 
          {
            method: "POST",
            headers: myHeaders,
            credentials: "include",
          }
        );
        
        if (!markReadResponse.ok) {
          console.error(`Failed to mark message ${message.id} as read: ${markReadResponse.status}`);
          return false;
        }
        
        return true;
      })
    );
    
    const successCount = results.filter(result => result).length;
    
    return { 
      success: true, 
      markedCount: successCount,
      totalUnread: unreadMessages.length
    };
  } catch (error) {
    console.error("Error in markAllUnreadMessagesAsRead:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

// Keep the original function for marking individual messages
// export async function markMessageAsRead(messageId: number) {
//   try {
//     // Get user token from cookies
//     const token = cookies().get("access")?.value;
    
//     if (!token) {
//       console.error("User not authenticated");
//       return { success: false, error: "User not authenticated" };
//     }

//     // Construct the backend URL
//     const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
//     const url = `${backendUrl}/api/messages/${messageId}/mark-read/`;
    
//     // Create headers with cookie auth
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Cookie", `access=${token}`);
    
//     // Make the API request
//     const response = await fetch(url, {
//       method: "POST",
//       headers: myHeaders,
//       credentials: "include", // Include cookies in request
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error(`Error marking message as read (${response.status}):`, errorText);
//       return { 
//         success: false, 
//         error: `Failed to mark message as read: ${response.status}`,
//         details: errorText
//       };
//     }

//     return { success: true };
//   } catch (error) {
//     console.error("Error in markMessageAsRead:", error);
//     return { 
//       success: false, 
//       error: error instanceof Error ? error.message : "Unknown error"
//     };
//   }
// } 