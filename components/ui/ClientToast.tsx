"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function ClientToast({ message, type = "error" }) {
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message, type]);

  return null;
}
