"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import useGetUserInvestmentsById from "@/hooks/useGetUserInvestmentsById";
import { formatDateTime, formatPriceInDollar } from "@/lib/helper";
import React from "react";

const UserInvestments = ({ userId }: { userId: string }) => {
  const { userInvestments } = useGetUserInvestmentsById({ userId });

  return (
    <Card>
      <h1 className="text-base md:text-lg font-semibold leading-none tracking-tight mb-3 p-6 pb-0">
        Users Investment plan
      </h1>

      {userInvestments?.length <= 0 && (
        <div className="flex flex-col items-center justify-center py-8">
          <CardHeader>
            <CardTitle className="flex flex-col justify-center items-center gap-1 tracking-wide">
              <p className="text-base font-normal text-center">
                User has no investment plan
              </p>
            </CardTitle>
          </CardHeader>
        </div>
      )}

      {userInvestments?.length > 0 && (
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
                {userInvestments?.reverse().map((investment: any) => (
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
  );
};

export default UserInvestments;
