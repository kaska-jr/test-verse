import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getSession } from "../route";

export async function PUT(req: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    const { investmentId, profit } = await req.json();

    if (!investmentId || profit === undefined) {
      return NextResponse.json(
        { error: "Investment ID and profit value are required" },
        { status: 400 }
      );
    }

    // Fetch the investment
    const investment = await prisma.investment.findUnique({
      where: { id: investmentId },
      include: { user: true },
    });

    if (!investment) {
      return NextResponse.json(
        { error: "Investment not found" },
        { status: 404 }
      );
    }

    // Update investment profit
    const updatedInvestment = await prisma.investment.update({
      where: { id: investmentId },
      data: {
        profitEarned: investment.profitEarned + profit,
        updatedAt: new Date(),
      },
    });

    // Update trading account profit
    const tradingAccount = await prisma.tradingAccount.findUnique({
      where: { userId: investment.userId },
    });

    if (!tradingAccount) {
      return NextResponse.json(
        { error: "Trading account not found" },
        { status: 404 }
      );
    }

    await prisma.tradingAccount.update({
      where: { userId: investment.userId },
      data: { total_Profit: tradingAccount.total_Profit + profit },
    });

    return NextResponse.json(
      { message: "Profit updated successfully", updatedInvestment },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating investment profit:", error);
    return NextResponse.json(
      { error: "Failed to update profit" },
      { status: 500 }
    );
  }
}
