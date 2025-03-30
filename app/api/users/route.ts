import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getSession } from "../route";

export async function GET(req: Request) {
  try {
    const session = await getSession();

    if (session && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized, only admin can fetch users" },
        { status: 401 }
      );
    }

    const users = await prisma.user.findMany({});

    if (!users) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "users fetched successfully", users },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
