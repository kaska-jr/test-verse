import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import PaymentLogo from "@/components/PaymentLogo";
import DepositForm from "./components/DepositForm";
import axios from "axios";
import {
  ArchiveRestore,
  BookUp2,
  Coins,
  Gift,
  Link2,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { BiChart } from "react-icons/bi";
import { formatDateTime, formatPriceInDollar } from "@/lib/helper";
import Link from "next/link";
import ProfitForm from "./components/ProfitForm";
import WithdrawalForm from "./components/WithdrawalForm";
import { Button } from "@/components/ui/button";

const Manage = async ({ params }: { params: Promise<{ userid: string }> }) => {
  const { userid } = await params;

  const fetchTradingAccount = async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Ensure the correct base URL
      const response = await axios(`${baseUrl}/api/trading-account/${userid}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  const tradingAccountData = await fetchTradingAccount();

  const {
    balance = 0,
    total_Profit = 0,
    total_bonus = 0,
    total_deposit = 0,
    total_withdrawal = 0,
    referral_bonus = 0,
  } = tradingAccountData ?? ({} as any);

  const transactions = [
    {
      id: 1,
      title: "Account Balance",
      amount: balance,
      link: "deposit-Transfer",
      color: "#00A76A",
      icon: <Wallet size={24} style={{ color: "#00A76A" }} />,
    },
    {
      id: 2,
      title: "Total Profit",
      amount: total_Profit,
      link: "deposit-Transfer",
      color: "#2dadcf",
      icon: <Coins size={24} style={{ color: "#2dadcf" }} />,
    },
    {
      id: 3,
      title: "Total Bonus",
      amount: total_bonus,
      link: "deposit-Transfer",
      color: "#00A76A",
      icon: <Gift size={24} style={{ color: "#00A76A" }} />,
    },
    {
      id: 4,
      title: "Referral Bonus",
      amount: 0,
      link: "deposit-Transfer",
      color: "#2dadcf",
      icon: <PiggyBank size={24} style={{ color: "#2dadcf" }} />,
    },

    {
      id: 5,
      title: "Total Deposit",
      amount: total_deposit,
      link: "deposit-Transfer",
      color: "#00A76A",
      icon: <ArchiveRestore size={24} style={{ color: "#00A76A" }} />,
    },
    {
      id: 6,
      title: "Total Withdrawal",
      amount: total_withdrawal,
      link: "deposit-Transfer",
      color: "#f56565",
      icon: <BookUp2 size={24} style={{ color: "#f56565" }} />,
    },
    {
      id: 7,
      title: "Managed Accounts",
      amount: 0,
      link: "deposit-Transfer",
      color: "#00A76A",
      icon: <Link2 size={24} style={{ color: "#00A76A" }} />,
    },
    {
      id: 8,
      title: "Referral Bonus",
      amount: referral_bonus,
      link: "deposit-Transfer",
      color: "#f56565",
      icon: <BiChart size={24} style={{ color: "#f56565" }} />,
    },
  ];

  //fetch user investments
  const fetchUserInvestments = async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Ensure the correct base URL
      const response = await axios(
        `${baseUrl}/api/investments?userId=${userid}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  const investments = await fetchUserInvestments();

  return (
    <section className="space-y-4 flex flex-col gap-4">
      <h1 className="text-xl md:text-2xl font-semibold leading-none tracking-tight">
        Manage Investors Account
      </h1>

      <Card>
        <div className="p-6 w-full">
          <p className="">
            <span className="font-semibold">Name:</span>{" "}
            {tradingAccountData?.user.name}
          </p>
          <p className="">
            <span className="font-semibold">Email:</span>{" "}
            {tradingAccountData?.user.email}
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {
          // @ts-ignore
          transactions.map((transaction) => {
            return (
              <Card key={transaction.id} className="p-5">
                <CardHeader className="!py-0 px-0">
                  <div className="flex justify-between">
                    <CardTitle className="flex items-center gap-1 tracking-wide">
                      <div
                        style={{
                          backgroundColor: transaction.color,
                        }}
                        className={`h-1 w-1 rounded-full shrink-0`}
                      />
                      <span className="!text-muted-foreground uppercase !text-sm">
                        {transaction.title}
                      </span>
                    </CardTitle>
                    <CardDescription>{transaction?.icon}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="!py-0 px-0">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">
                      {formatPriceInDollar(transaction.amount)}
                    </span>
                    <span>
                      {transaction.link && (
                        <Link
                          href={transaction.link}
                          className="text-xs"
                          style={{
                            color: transaction.color,
                          }}
                        >
                          {transaction.link}
                        </Link>
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })
        }
      </div>

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

      <Card>
        <h1 className="text-base md:text-lg font-semibold leading-none tracking-tight mb-3 p-6 pb-0">
          Users Investment plan
        </h1>

        {investments?.length <= 0 && (
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

        {investments?.length > 0 && (
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
        )}
      </Card>

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
