import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Admin only Api
export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (currentUser && currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You are not authorized to be here..." },
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

export async function getSession() {
  return await getServerSession(authOptions);
}

//Admin Api
export async function GET() {
  try {
    const currentUser = await getSession();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const plans = await prisma.investmentPlan.findMany();
    return NextResponse.json(plans, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error Fetching Plan" }, { status: 500 });
  }
}
