import React from "react";
import ManageInvestments from "../../../components/ManageInvestments";

const ManageInvestmentPlan = async ({
  params,
}: {
  params: Promise<{ planId: string }>;
}) => {
  const { planId } = await params;

  return (
    <section>
      <div className="max-w-2xl rounded-lg shadow-md">
        <ManageInvestments planId={planId} />
      </div>
    </section>
  );
};

export default ManageInvestmentPlan;
