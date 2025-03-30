import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getSession } from "../route";

// Admin only Api
export async function POST(req: Request) {
  try {
    const session = await getSession();

    if (session && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized, only admin can create an investment plan" },
        { status: 401 }
      );
    }

    const {
      name,
      minAmount,
      maxAmount,
      durationValueFrom,
      durationValueTo,
      interestRate,
      durationType,
    } = await req.json();

    const newPlan = await prisma.investmentPlan.create({
      data: {
        name,
        minAmount,
        maxAmount,
        durationValueFrom,
        durationValueTo,
        interestRate,
        durationType,
      },
    });
    return NextResponse.json(newPlan, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error Creating Investment Plan" },
      { status: 500 }
    );
  }
}

//Admin and User Api
export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const plans = await prisma.investmentPlan.findMany();
    return NextResponse.json(plans, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error Fetching Plan" }, { status: 500 });
  }
}
