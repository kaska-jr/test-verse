import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

// User Only Api
export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, planId, amount } = await req.json();

    // Fetch the investment plan details
    const plan = await prisma.investmentPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json(
        {
          error: "Investment Plan not found",
        },
        { status: 404 }
      );
    }

    // Validate investment amount
    if (
      amount < plan.minAmount ||
      (plan.maxAmount && amount > plan.maxAmount)
    ) {
      NextResponse.json(
        {
          error: `Investment amount must be between ${plan.minAmount} and ${plan.maxAmount || "unlimited"}`,
        },
        { status: 401 }
      );
    }

    // Fetch the user's trading account
    const tradingAccount = await prisma.tradingAccount.findUnique({
      where: { userId },
    });

    if (!tradingAccount) {
      return NextResponse.json(
        { error: "Trading account not found" },
        { status: 404 }
      );
    }

    // Check if the user has enough balance
    if (tradingAccount.balance < amount) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }

    // Calculate end date based on durationType and durationValue
    let endDate = new Date();
    if (plan.durationType === "DAYS") {
      endDate.setDate(endDate.getDate() + plan.durationValueFrom);
    } else if (plan.durationType === "MONTHS") {
      endDate.setMonth(endDate.getMonth() + plan.durationValueFrom);
    } else if (plan.durationType === "YEARS") {
      endDate.setFullYear(endDate.getFullYear() + plan.durationValueFrom);
    }

    const [investment, updatedTradingAccount] = await prisma.$transaction([
      prisma.investment.create({
        data: {
          userId,
          planId,
          amountInvested: amount,
          startDate: new Date(),
          endDate,
          status: "ACTIVE",
        },
      }),
      prisma.tradingAccount.update({
        where: { userId },
        data: { balance: tradingAccount.balance - amount },
      }),
    ]);

    return NextResponse.json(
      { investment, updatedTradingAccount },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating investment:", error);
    return NextResponse.json(
      { error: "Error Creating Investment" },
      { status: 500 }
    );
  }
}

// Users Only Api
// Fetch all investments for the current user
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const investments = await prisma.investment.findMany({
      where: { userId },
      include: {
        plan: true,
        user: true,
      },
    });

    return NextResponse.json(investments, { status: 200 });
  } catch (error) {
    console.error("Error fetching investments:", error);
    return NextResponse.json(
      { error: "Error Fetching Investments" },
      { status: 500 }
    );
  }
}
