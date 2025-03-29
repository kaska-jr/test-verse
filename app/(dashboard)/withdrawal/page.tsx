import { Card } from "@/components/ui/card";
import React from "react";

const Withdrawal = () => {
  return (
    <section>
      <div className="mb-3">
        <h1 className="text-xl md:text-2xl font-semibold leading-none tracking-tight">
          Withdraw from your account.
        </h1>
        <p>Place a withdrawal request using any of the payment method below.</p>
      </div>

      <Card>
        <div className="p-6 w-full">
          <p className="text-center">No withdrawal method enabled.</p>
        </div>
      </Card>
    </section>
  );
};

export default Withdrawal;
