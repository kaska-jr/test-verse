import prisma from "@/lib/prismadb";

export default async function getPlans() {
  try {
    const investmentPlans = await prisma.investmentPlan.findMany({});
    const serializedInvestmentPlans = investmentPlans.map(
      (investmentPlan: any) => ({
        ...investmentPlan,
        createdAt: investmentPlan.createdAt.toISOString(),
        updatedAt: investmentPlan.updatedAt.toISOString(),
      })
    );

    return serializedInvestmentPlans;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
