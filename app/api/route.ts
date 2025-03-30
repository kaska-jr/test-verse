import { NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function GET() {
  return NextResponse.json({ message: "You have reached teslaverse backend" });
}
