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

    console.log(tradingAccount, "tradingAccountu");

    if (!tradingAccount) {
      return NextResponse.json(
        { error: "User account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(tradingAccount, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch trading account" },
      { status: 500 }
    );
  }
}
