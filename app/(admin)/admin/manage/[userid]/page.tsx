import { Card } from "@/components/ui/card";
import React from "react";
import PaymentLogo from "@/components/PaymentLogo";
import DepositForm from "./components/DepositForm";
import ProfitForm from "./components/ProfitForm";
import WithdrawalForm from "./components/WithdrawalForm";
import TradingAccountContainer from "./components/TradingAccountContainer";
import UserInvestments from "@/app/(admin)/components/UserInvestments";

const Manage = async ({ params }: { params: Promise<{ userid: string }> }) => {
  const { userid } = await params;

  return (
    <section className="space-y-4 flex flex-col gap-4">
      <h1 className="text-xl md:text-2xl font-semibold leading-none tracking-tight">
        Manage Investors Account
      </h1>

      <TradingAccountContainer userId={userid} />
      <Card>
        <h1 className="text-base md:text-lg font-semibold leading-none tracking-tight mb-3 p-6 px-12 pb-0">
          Deposit Account
        </h1>
        <div className="p-6 pt-0 pb-0 w-full grid grid-cols-1 md:grid-cols-2 gap-4 border-b">
          <DepositForm userId={userid} />
          <div className="flex flex-col gap-3 text-sm font-medium text-muted-foreground items-center justify-center p-6 pt-0">
            <h1>Payment Methods</h1>
            <div className="flex items-center justify-center flex-wrap">
              <PaymentLogo />
            </div>
          </div>
        </div>
      </Card>
      <UserInvestments userId={userid} />
      <Card>
        <h1 className="text-base md:text-lg font-semibold leading-none tracking-tight mb-3 p-6 px-12 pb-0">
          Update Account Profit
        </h1>
        <div className="p-6 pt-0 pb-0 w-full grid grid-cols-1 md:grid-cols-2 gap-4 border-b">
          <ProfitForm userId={userid} />
          <div className="flex flex-col gap-3 text-sm font-medium text-muted-foreground items-center justify-center p-6 pt-0">
            <h1>Payment Methods</h1>
            <div className="flex items-center justify-center flex-wrap">
              <PaymentLogo />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h1 className="text-base md:text-lg font-semibold leading-none tracking-tight mb-3 p-6 px-12 pb-0">
          Debit Account Balance
        </h1>
        <div className="p-6 pt-0 pb-0 w-full grid grid-cols-1 md:grid-cols-2 gap-4 border-b">
          <WithdrawalForm userId={userid} />
          <div className="flex flex-col gap-3 text-sm font-medium text-muted-foreground items-center justify-center p-6 pt-0">
            <h1>Payment Methods</h1>
            <div className="flex items-center justify-center flex-wrap">
              <PaymentLogo />
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Manage;
