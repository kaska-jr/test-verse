import { NextResponse } from "next/server";
import { getSession } from "../route";
import prisma from "@/lib/prismadb";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }
  const { id } = session.user;

  const tradingAccount = await prisma.tradingAccount.findUnique({
    where: {
      userId: id,
    },
    include: {
      user: true, // Include user details if needed
    },
  });

  if (!tradingAccount) {
    return NextResponse.json(
      { error: "User account not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "account fetched successfully", tradingAccount },
    { status: 200 }
  );
}
