import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getUserInvestments() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const userId = currentUser.id;
    const investments = await prisma.investment.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true, // Include user details if needed
        plan: true, // Include investment plan details if needed
      },
    });

    const serializedTransactions = investments.map((investment: any) => ({
      ...investment,
      startDate: investment.startDate.toISOString(),
      endDate: investment.endDate.toISOString(),
      createdAt: investment.createdAt.toISOString(),
      updatedAt: investment.updatedAt.toISOString(),
    }));
    return serializedTransactions;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
