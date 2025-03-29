import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "You have reached teslaverse backend" });
}
