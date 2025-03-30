"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDateTime, formatPriceInDollar } from "@/lib/helper";
import useGetUserTransactions from "@/hooks/useGetUserTransactions";

const TransactionContainer = () => {
  const { userTransactionsResponse } = useGetUserTransactions();

  const { data: transactions } = userTransactionsResponse as any;

  const deposits = (Array.isArray(transactions) ? transactions : [])?.filter(
    (tx: any) => tx.type === "DEPOSIT"
  );

  const withdrawals = (Array.isArray(transactions) ? transactions : [])?.filter(
    (tx: any) => tx.type === "WITHDRAWAL"
  );

  const others = (Array.isArray(transactions) ? transactions : [])?.filter(
    (tx: any) => tx.type !== "DEPOSIT" && tx.type !== "WITHDRAWAL"
  );

  return (
    <Card>
      <div className="p-6">
        <Tabs defaultValue="deposit" className="w-full">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="others">Others</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2 ">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </div>
          </div>

          <TabsContent value="deposit" className="mt-5">
            <table className="w-full table-auto text-sm text-left mb-8">
              <thead className="table-header">
                <tr className="font-large w-full text-nowrap text-primary">
                  <th className="!text-primary py-2 px-5">Date</th>
                  <th className="!text-primary py-2 pr-4 lg:pr-2 px-5">
                    Amount
                  </th>
                  <th className="!text-primary py-2 px-5">Transaction Type</th>
                  <th className="!text-primary py-2 px-5">Status</th>
                </tr>
              </thead>
              <tbody className=" text-nowrap merchants">
                {deposits?.map((transaction: any) => (
                  <tr key={transaction.id} className={`"text-nowrap`}>
                    <td className="py-2 px-5">
                      {formatDateTime(transaction.createdAt)}
                    </td>
                    <td className="py-2 px-5">
                      {formatPriceInDollar(transaction.amount)}
                    </td>
                    <td className="py-2 px-5 pr-8 lg:pr-2 capitalize">
                      {transaction.type}
                    </td>
                    <td className="py-2 px-5">{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
          <TabsContent value="withdrawals" className="mt-5">
            <table className="w-full table-auto text-sm text-left mb-8">
              <thead className="table-header">
                <tr className="font-large w-full text-nowrap text-primary">
                  <th className="!text-primary py-2 px-5">Date</th>
                  <th className="!text-primary py-2 pr-4 lg:pr-2 px-5">
                    Amount
                  </th>
                  <th className="!text-primary py-2 px-5">Transaction Type</th>
                  <th className="!text-primary py-2 px-5">Status</th>
                </tr>
              </thead>
              <tbody className=" text-nowrap merchants">
                {withdrawals?.map((transaction: any) => (
                  <tr key={transaction.id} className={`"text-nowrap`}>
                    <td className="py-2 px-5">
                      {formatDateTime(transaction.createdAt)}
                    </td>
                    <td className="py-2 px-5">
                      {formatPriceInDollar(transaction.amount)}
                    </td>
                    <td className="py-2 px-5 pr-8 lg:pr-2 capitalize">
                      {transaction.type}
                    </td>
                    <td className="py-2 px-5">{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
          <TabsContent value="others" className="mt-5">
            <table className="w-full table-auto text-sm text-left mb-8">
              <thead className="table-header">
                <tr className="font-large w-full text-nowrap text-primary">
                  <th className="!text-primary py-2 px-5">Date</th>
                  <th className="!text-primary py-2 pr-4 lg:pr-2 px-5">
                    Amount
                  </th>
                  <th className="!text-primary py-2 px-5">Transaction Type</th>
                  <th className="!text-primary py-2 px-5">Status</th>
                </tr>
              </thead>
              <tbody className=" text-nowrap merchants">
                {others?.map((transaction: any) => (
                  <tr key={transaction.id} className={`"text-nowrap`}>
                    <td className="py-2 px-5">
                      {formatDateTime(transaction.createdAt)}
                    </td>
                    <td className="py-2 px-5">
                      {formatPriceInDollar(transaction.amount)}
                    </td>
                    <td className="py-2 px-5 pr-8 lg:pr-2 capitalize">
                      {transaction.type}
                    </td>
                    <td className="py-2 px-5">{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default TransactionContainer;
