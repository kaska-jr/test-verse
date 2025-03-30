import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getSession } from "../../route";

export async function GET(
  req: Request,
  { params }: { params: { userid: string } }
) {
  try {
    const { userid } = params;
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    if (!userid) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const investments = await prisma.investment.findMany({
      where: { userId: userid },
      include: {
        plan: true,
        user: true,
      },
    });

    return NextResponse.json(
      { message: "Investments fetched successfully", investments },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching investments:", error);
    return NextResponse.json(
      { error: "Error Fetching Investments" },
      { status: 500 }
    );
  }
}
