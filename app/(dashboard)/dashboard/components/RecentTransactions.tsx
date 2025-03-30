"use client";
import { Button } from "@/components/ui/button";
import useGetUserTransactions from "@/hooks/useGetUserTransactions";
import { formatDateTime, formatPriceInDollar } from "@/lib/helper";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatabaseBackup } from "lucide-react";

const RecentTransactions = () => {
  const { userTransactionsResponse } = useGetUserTransactions();
  const { data } = userTransactionsResponse as any;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-xs">Recent transactions</h1>
        <Link href={"/transactions"}>
          <Button className="mt-4">View all transactions</Button>
        </Link>
      </div>

      <Card>
        {data?.length <= 0 && (
          <div className="flex flex-col items-center justify-center py-8">
            <CardHeader>
              <CardTitle className="flex flex-col justify-center items-center gap-1 tracking-wide">
                <DatabaseBackup
                  className="text-primary"
                  size={55}
                  strokeWidth={2}
                />
                <p className="text-base font-normal text-center">
                  You do not have an active transaction at the moment.
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
        <div className="flex flex-col items-center justify-center py-4 px-4">
          <table className="w-full table-auto text-sm text-left mb-8">
            <thead className="table-header">
              <tr className="font-large w-full text-nowrap text-primary">
                <th className="!text-primary py-2 px-5">Date</th>
                <th className="!text-primary py-2 pr-4 lg:pr-2 px-5">Amount</th>
                <th className="!text-primary py-2 px-5">Transaction Type</th>
                <th className="!text-primary py-2 px-5">Status</th>
              </tr>
            </thead>
            <tbody className=" text-nowrap merchants">
              {data
                ?.reverse()
                .slice(0, 4)
                .map((transaction: any) => (
                  <tr key={transaction.id} className={`"text-nowrap`}>
                    <td className="py-2 px-5">
                      {formatDateTime(transaction.createdAt)}
                    </td>
                    <td className="py-2 px-5">
                      {formatPriceInDollar(transaction.amount)}
                    </td>
                    <td className="py-2 px-5 pr-8 lg:pr-2 capitalize">
                      {transaction.type.toLowerCase()}
                    </td>
                    <td className="py-2 px-5 capitalize">
                      {transaction.status.toLowerCase()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default RecentTransactions;
