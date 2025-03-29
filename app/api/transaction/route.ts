import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

// CREATE Transaction & Update TradingAccount
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, type, userId, reference, description } =
      await request.json();

    if (!amount || !type || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the transaction
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        userId,
        reference,
        description,
        status: "COMPLETED", // Always set to "COMPLETED" for now
      },
    });

    // Find the user's trading account
    const tradingAccount = await prisma.tradingAccount.findUnique({
      where: { userId },
    });

    if (!tradingAccount) {
      return NextResponse.json(
        { error: "Trading account not found" },
        { status: 404 }
      );
    }

    // Calculate new balance based on transaction type
    let updatedData: any = {};
    if (type === "DEPOSIT") {
      updatedData = {
        balance: tradingAccount.balance + amount,
        total_deposit: tradingAccount.total_deposit + amount,
      };
    } else if (type === "WITHDRAWAL") {
      if (tradingAccount.balance < amount) {
        return NextResponse.json(
          { error: "Insufficient balance" },
          { status: 400 }
        );
      }
      updatedData = {
        balance: tradingAccount.balance - amount,
        total_withdrawal: tradingAccount.total_withdrawal + amount,
      };
    }

    // Update the TradingAccount
    await prisma.tradingAccount.update({
      where: { userId },
      data: updatedData,
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}

// GET Transactions with Pagination
export async function GET(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Extract query params (default: page=1, limit=10)
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Invalid page or limit" },
        { status: 400 }
      );
    }

    // Calculate how many records to skip
    const skip = (page - 1) * limit;

    // Fetch paginated transactions
    const transactions = await prisma.transaction.findMany({
      take: limit,
      skip: skip,
      orderBy: { createdAt: "desc" }, // Sort latest transactions first
    });

    // Get total count of transactions
    const totalTransactions = await prisma.transaction.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalTransactions / limit);

    return NextResponse.json(
      {
        data: transactions,
        pagination: {
          totalTransactions,
          totalPages,
          currentPage: page,
          perPage: limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, profit } = await request.json();

    if (!profit || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the user's trading account
    const tradingAccount = await prisma.tradingAccount.findUnique({
      where: { userId },
    });

    if (!tradingAccount) {
      return NextResponse.json(
        { error: "Trading account not found" },
        { status: 404 }
      );
    }

    // Calculate new balance based on transaction type
    const updatedData = {
      balance: tradingAccount.balance + profit,
      total_Profit: tradingAccount.total_Profit + profit,
    };

    // Update the TradingAccount
    const updatedProfit = await prisma.tradingAccount.update({
      where: { userId },
      data: updatedData,
    });

    return NextResponse.json(updatedProfit, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
