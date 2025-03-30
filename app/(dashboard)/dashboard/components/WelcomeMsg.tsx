"use client";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const WelcomeMsg = () => {
  const [openWelcome, setOpenWelcome] = useState(true);
  const { user } = useGetCurrentUser() as any;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-lg md:text-2xl text-primary">
        Welcome, {user?.name || ""}!
      </h1>
      {openWelcome && (
        <div className="rounded-lg border bg-secondary text-primary shadow-sm py-2 px-4 text-lg h-12 flex items-center">
          <span className="font-semibold">Welcome to your FxVerse!</span>
          <X className="ml-auto" onClick={() => setOpenWelcome(false)} />
        </div>
      )}
    </div>
  );
};

export default WelcomeMsg;
