"use client";
import { X } from "lucide-react";
import React, { useState } from "react";

const WelcomeMsg = () => {
  const [openWelcome, setOpenWelcome] = useState(true);
  return (
    <div>
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
