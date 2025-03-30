import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import InvestWrapper from "./components/InvestWrapper";

const Invest = async () => {
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
      <InvestWrapper />
    </section>
  );
};

export default Invest;
