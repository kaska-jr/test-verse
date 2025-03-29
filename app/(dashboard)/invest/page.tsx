import getPlans from "@/actions/getPlans";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import InvestWrapper from "./components/InvestWrapper";
import getCurrentUser from "@/actions/getCurrentUser";
import getTradingAccount from "@/actions/getTradingAccount";

const Invest = async () => {
  const investmentPlans = await getPlans();
  const user = await getCurrentUser();
  const tradingAccount = await getTradingAccount();

  return (
    <section>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div className="mb-3">
          <h1 className="text-xl md:text-2xl font-semibold leading-none tracking-tight">
            Get started with your investment.
          </h1>
          <p>Choose From the List Below.</p>
        </div>

        <Link href="/investments">
          <Button>My Investments</Button>
        </Link>
      </div>
      <InvestWrapper
        investmentPlans={investmentPlans}
        user={user}
        tradingAccount={tradingAccount}
      />
    </section>
  );
};

export default Invest;
