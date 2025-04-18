"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Container({ className, children }: Props) {
  return (
    <div
      className={`max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
