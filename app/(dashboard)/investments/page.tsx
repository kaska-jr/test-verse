import React from "react";
import InvestmentContainer from "./components/InvestmentContainer";

const Investments = async () => {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <div className="mb-3">
          <h1 className="text-xl md:text-2xl font-semibold leading-none tracking-tight">
            My Investments
          </h1>
        </div>
      </div>

      <InvestmentContainer />
    </div>
  );
};

export default Investments;
