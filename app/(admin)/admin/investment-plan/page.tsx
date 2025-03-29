import React from "react";
import InvestmentCreationForm from "../../components/InvestmentCreationForm";
import { Card } from "@/components/ui/card";

const InvestmentPlans = () => {
  return (
    <Card className="shadow-md p-6">
      <div className="mb-4">
        <h1 className="text-base md:text-lg font-semibold leading-none tracking-tight">
          Create Investment Plan
        </h1>
        <p>Investment plans are available for all users.</p>
      </div>
      <div className="max-w-xl">
        <InvestmentCreationForm />
      </div>
    </Card>
  );
};

export default InvestmentPlans;
