import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";

export const POST = async (request: Request) => {
  try {
    const { name, email, password, username, number, role } =
      await request.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        role,
        name,
        hashedPassword,
        username,
        number,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User creation failed" },
        { status: 500 }
      );
    }

    // Create trading account
    const tradingAccount = await prisma.tradingAccount.create({
      data: { userId: user.id },
    });

    if (!tradingAccount) {
      return NextResponse.json(
        { message: "Trading account creation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Account created successfully",
        user,
        tradingAccount,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Internal Server Error", error: String(error) },
        { status: 500 }
      );
    }
  }
};
