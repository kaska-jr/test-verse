"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <ToastContainer />
      {children}
    </TooltipProvider>
  );
}
