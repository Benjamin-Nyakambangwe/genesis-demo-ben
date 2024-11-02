import { toast } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
  description?: string;
  duration?: number;
  position?: "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left";
}

const defaultOptions: ToastOptions = {
  duration: 5000,
  position: "top-right",
};

export const showToast = (
  type: ToastType,
  message: string,
  options: ToastOptions = {}
) => {
  const mergedOptions = { ...defaultOptions, ...options };

  switch (type) {
    case "success":
      toast.success(message, mergedOptions);
      break;
    case "error":
      toast.error(message, mergedOptions);
      break;
    case "warning":
      toast.warning(message, mergedOptions);
      break;
    case "info":
      toast.info(message, mergedOptions);
      break;
    default:
      toast(message, mergedOptions);
  }
};

// Preset toast functions
export const successToast = (message: string, options?: ToastOptions) => 
  showToast("success", message, options);

export const errorToast = (message: string, options?: ToastOptions) => 
  showToast("error", message, options);

export const warningToast = (message: string, options?: ToastOptions) => 
  showToast("warning", message, options);

export const infoToast = (message: string, options?: ToastOptions) => 
  showToast("info", message, options); 