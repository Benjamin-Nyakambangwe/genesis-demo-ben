"use client";
import { useUpdateAccess } from "@/hooks/useUpdateAccess";
import { Toaster } from "sonner";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useUpdateAccess(); // This will update the access token every 4 minutes

  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
