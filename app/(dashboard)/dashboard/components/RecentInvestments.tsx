"use client";
import useGetUserInvestments from "@/hooks/useGetUserInvestments";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatabaseBackup } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDateTime, formatPriceInDollar } from "@/lib/helper";

const RecentInvestments = () => {
  const { userInvestments } = useGetUserInvestments();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-xs">Active Investments</h1>
        <Link href={"/investments"}>
          <Button className="mt-4">View all Investments</Button>
        </Link>
      </div>

      <Card className="">
        {userInvestments.length <= 0 && (
          <div className="flex flex-col items-center justify-center py-8">
            <CardHeader>
              <CardTitle className="flex flex-col justify-center items-center gap-1 tracking-wide">
                <DatabaseBackup
                  className="text-primary"
                  size={55}
                  strokeWidth={2}
                />
                <p className="text-base font-normal text-center">
                  You do not have an active investment at the moment.
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

        {userInvestments.length > 0 && (
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
                    <th className="!text-primary py-2 px-5">
                      Profits Acquired
                    </th>
                    <th className="!text-primary py-2 px-5">Status</th>
                    <th className="!text-primary py-2 px-5">Start Date</th>
                    <th className="!text-primary py-2 px-5">End Date</th>
                  </tr>
                </thead>
                <tbody className=" text-nowrap merchants">
                  {userInvestments
                    ?.reverse()
                    .slice(0, 4)
                    .map((investment: any) => (
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
        )}
      </Card>
    </div>
  );
};

export default RecentInvestments;
