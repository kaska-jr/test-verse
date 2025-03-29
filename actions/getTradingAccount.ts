import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getTradingAccount() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return {};
    }
    const userId = currentUser.id;
    const tradingAccount = await prisma.tradingAccount.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: true, // Include user details if needed
      },
    });
    return tradingAccount;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// for superAdmin
export async function getUserTradingAccount(userId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return {};
    }
    const tradingAccount = await prisma.tradingAccount.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: true, // Include user details if needed
      },
    });
    return tradingAccount;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
