"use client";
import { useEffect } from "react";
// import { updateAccess } from "@/lib/auth";
import { getRefreshToken } from "@/lib/getRefreshToken";

export function useUpdateAccess() {
  useEffect(() => {
    // Initial update
    const updateToken = async () => {
      try {
        // const refresh = await getRefreshToken();
        // await updateAccess(refresh);

        await getRefreshToken();
      } catch (error) {
        console.error("Error updating access token:", error);
      }
    };

    // Set up interval (4 minutes = 240000 milliseconds)
    const intervalId = setInterval(updateToken, 240000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);
}
