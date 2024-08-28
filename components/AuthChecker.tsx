// components/AuthChecker.tsx
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
// import { submitForm } from "@/lib/submitFormAction";
import { checkAuth } from "@/lib/checkAuth";

export function AuthChecker() {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  useEffect(() => {
    // const checkAuth = async () => {
    //   try {
    //     const response = await fetch('/api/check-auth')
    //     const data = await response.json()
    //     setIsAuthenticated(data.isAuthenticated)
    //   } catch (error) {
    //     console.error('Error checking auth status:', error)
    //     setIsAuthenticated(false)
    //   }
    // }

    // Check immediately on mount
    checkAuth();
    console.log("Auth test", checkAuth);

    // Set up interval to check every 4 minutes
    const interval = setInterval(checkAuth, 1 * 60 * 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [setIsAuthenticated]);

  return null; // This component doesn't render anything
}
