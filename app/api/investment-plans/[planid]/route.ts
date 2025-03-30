import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getSession } from "../../route";

//User and Admin
export async function GET(
  _: Request,
  { params }: { params: { planid: string } }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const plan = await prisma.investmentPlan.findUnique({
      where: { id: params.planid },
    });
    if (!plan)
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });

    return NextResponse.json(plan, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error Fetching Plan" }, { status: 500 });
  }
}

//Admin only
export async function PUT(
  request: Request,
  { params }: { params: { planid: string } }
) {
  try {
    const session = await getSession();

    if (session && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized, only admin can update an investment plan" },
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
    } = await request.json();

    const updatedPlan = await prisma.investmentPlan.update({
      where: { id: params.planid },
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

    return NextResponse.json(updatedPlan, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error Updating Plan" }, { status: 500 });
  }
}

// Admin only
export async function DELETE(
  request: Request,
  { params }: { params: { planId: string } }
) {
  try {
    await prisma.investmentPlan.delete({ where: { id: params.planId } });
    return NextResponse.json(
      { message: "Investment Plan deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error Deleting Plan" }, { status: 500 });
  }
}
