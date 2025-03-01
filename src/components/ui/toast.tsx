import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@/lib/utils"; // Optional utility for Tailwind merging

export function useToast() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const showToast = (msg: string) => {
    setMessage(msg);
    setOpen(true);
    setTimeout(() => setOpen(false), 3000); // Auto-close after 3s
  };

  return {
    showToast,
    Toast: (
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        className={cn(
          "fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded shadow-lg"
        )}
      >
        <ToastPrimitive.Title>{message}</ToastPrimitive.Title>
      </ToastPrimitive.Root>
    ),
  };
}
