"use client";
import { signOut } from "next-auth/react";
import React from "react";

const Redirect = ({ user }: { user: any }) => {
  if (user && user.role !== "ADMIN") {
    signOut();
  }
  return <div></div>;
};

export default Redirect;
