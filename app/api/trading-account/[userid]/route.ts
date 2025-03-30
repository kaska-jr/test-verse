import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { userid: string } }
) {
  const { userid } = params;

  try {
    const tradingAccount = await prisma.tradingAccount.findUnique({
      where: {
        userId: userid,
      },
      include: {
        user: true,
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
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch trading account" },
      { status: 500 }
    );
  }
}
