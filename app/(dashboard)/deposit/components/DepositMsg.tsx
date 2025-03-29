"use client";
import { ThumbsDownIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

const DepositMsg = () => {
  const searchParams = useSearchParams();
  const status = searchParams?.get("status");
  const message = searchParams?.get("message");
  return (
    <div>
      {status && status === "error" ? (
        <div className="bg-red-400 text-white p-4 rounded-lg mb-4 w-full shadow-md drop-shadow-md flex items-start gap-2">
          <ThumbsDownIcon className="w-6 h-6" /> <p>{message}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DepositMsg;
