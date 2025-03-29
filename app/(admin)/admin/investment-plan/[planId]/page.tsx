import axios from "axios";
import React from "react";
import ManageInvestments from "../../../components/ManageInvestments";

const ManageInvestmentPlan = async ({
  params,
}: {
  params: Promise<{ planId: string }>;
}) => {
  const { planId } = await params;

  const fetchInvestmentPlan = async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Ensure the correct base URL
      const response = await axios(`${baseUrl}/api/investment-plans/${planId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  const investmentPlan = await fetchInvestmentPlan();

  return (
    <section>
      <div className="mb-4">
        <h1 className="text-base md:text-2xl font-semibold leading-none tracking-tight">
          {investmentPlan?.name} Investment
        </h1>
        <p>{investmentPlan?.interestRate}% Return on Investment</p>
      </div>
      <div className="max-w-2xl rounded-lg shadow-md">
        <ManageInvestments investmentPlan={investmentPlan} planId={planId} />
      </div>
    </section>
  );
};

export default ManageInvestmentPlan;
