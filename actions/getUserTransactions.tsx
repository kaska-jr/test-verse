import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getUserTransactions() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const userId = currentUser.id;
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true, // Include user details if needed
      },
    });

    const serializedTransactions = transactions.map((tx: any) => ({
      ...tx,
      createdAt: tx.createdAt.toISOString(),
      updatedAt: tx.updatedAt.toISOString(),
    }));
    return serializedTransactions;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
