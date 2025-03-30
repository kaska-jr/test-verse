"use client";
import useGetTradingAccount from "@/hooks/useGetTradingAccount";
import React from "react";
import {
  ArchiveRestore,
  BookUp2,
  Coins,
  DatabaseBackup,
  Gift,
  Link2,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { BiChart } from "react-icons/bi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPriceInDollar } from "@/lib/helper";
import Link from "next/link";

const TradingAccount = () => {
  const { tradingAccount } = useGetTradingAccount();

  const {
    balance = 0,
    total_Profit = 0,
    total_bonus = 0,
    total_deposit = 0,
    total_withdrawal = 0,
    referral_bonus = 0,
  } = tradingAccount as any;

  const accountDetails = [
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {
        // @ts-ignore
        accountDetails.map((accountDetail) => {
          return (
            <Card key={accountDetail.id} className="p-5">
              <CardHeader className="!py-0 px-0">
                <div className="flex justify-between">
                  <CardTitle className="flex items-center gap-1 tracking-wide">
                    <div
                      style={{
                        backgroundColor: accountDetail.color,
                      }}
                      className={`h-1 w-1 rounded-full shrink-0`}
                    />
                    <span className="!text-muted-foreground uppercase !text-sm">
                      {accountDetail.title}
                    </span>
                  </CardTitle>
                  <CardDescription>{accountDetail?.icon}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="!py-0 px-0">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {formatPriceInDollar(accountDetail.amount)}
                  </span>
                  <span>
                    {accountDetail.link && (
                      <Link
                        href={accountDetail.link}
                        className="text-xs"
                        style={{
                          color: accountDetail.color,
                        }}
                      >
                        {accountDetail.link}
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
  );
};

export default TradingAccount;
