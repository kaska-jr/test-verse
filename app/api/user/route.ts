import { NextResponse } from "next/server";
import { getSession } from "../route";
import prisma from "@/lib/prismadb";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  return NextResponse.json(
    { message: "user fetched successfully", user },
    { status: 200 }
  );
}
