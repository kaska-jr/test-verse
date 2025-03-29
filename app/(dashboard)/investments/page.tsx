import { Button } from "@/components/ui/button";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getUserInvestments from "@/actions/getUserInvestments";
import Link from "next/link";
import { formatDateTime, formatPriceInDollar } from "@/lib/helper";
const Investments = async () => {
  const investments = await getUserInvestments();

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <div className="mb-3">
          <h1 className="text-xl md:text-2xl font-semibold leading-none tracking-tight">
            My Investment plans
          </h1>
        </div>
      </div>

      <Card className="">
        {investments.length <= 0 && (
          <div className="flex flex-col items-center justify-center py-8">
            <CardHeader>
              <CardTitle className="flex flex-col justify-center items-center gap-1 tracking-wide">
                <p className="text-base font-normal text-center">
                  You do not have an investment plan at the moment or no value
                  match your query.
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/invest">
                <Button className="mt-4">Invest Now</Button>
              </Link>
            </CardContent>
          </div>
        )}

        <div>
          <div className="flex flex-col items-center justify-center py-4 px-4">
            <table className="w-full table-auto text-sm text-left mb-8">
              <thead className="table-header">
                <tr className="font-large w-full text-nowrap text-primary">
                  <th className="!text-primary py-2 px-5">Investment Id</th>
                  <th className="!text-primary py-2 pr-4 lg:pr-2 px-5">
                    Amount Invested
                  </th>
                  <th className="!text-primary py-2 px-5">Investment Type</th>
                  <th className="!text-primary py-2 px-5">ROI</th>
                  <th className="!text-primary py-2 px-5">Profits Acquired</th>
                  <th className="!text-primary py-2 px-5">Status</th>
                  <th className="!text-primary py-2 px-5">Start Date</th>
                  <th className="!text-primary py-2 px-5">End Date</th>
                </tr>
              </thead>
              <tbody className=" text-nowrap merchants">
                {investments?.reverse().map((investment: any) => (
                  <tr key={investment.id} className={`"text-nowrap`}>
                    <td className="py-2 px-5">{investment.id}</td>
                    <td className="py-2 px-5">
                      {formatPriceInDollar(investment.amountInvested)}
                    </td>
                    <td className="py-2 px-5 pr-8 lg:pr-2 capitalize">
                      {investment.plan.name.toLowerCase()}
                    </td>
                    <td className="py-2 px-5 capitalize">
                      {investment.plan.interestRate}%
                    </td>
                    <td className="py-2 px-5 capitalize text-green">
                      {formatPriceInDollar(investment.profitEarned)}
                    </td>
                    <td className="py-2 px-5 capitalize">
                      {investment.status.toLowerCase()}
                    </td>
                    <td className="py-2 px-5">
                      {formatDateTime(investment.startDate)}
                    </td>
                    <td className="py-2 px-5">
                      {formatDateTime(investment.endDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Investments;
