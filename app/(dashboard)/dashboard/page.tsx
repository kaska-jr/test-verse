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
import { Button } from "@/components/ui/button";
import WelcomeMsg from "./components/WelcomeMsg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { BiChart } from "react-icons/bi";
import CrossRateWidget from "../dashboard/components/CrossRateWidget";
import getCurrentUser from "@/actions/getCurrentUser";
import getTradingAccount from "@/actions/getTradingAccount";
import { formatDateTime, formatPriceInDollar } from "@/lib/helper";
import getUserTransactions from "@/actions/getUserTransactions";
import getUserInvestments from "@/actions/getUserInvestments";

export default async function ProductsPage() {
  const { name } = (await getCurrentUser()) as User;
  const tradingAccount = (await getTradingAccount()) ?? {};
  const investments = await getUserInvestments();

  const {
    balance = 0,
    total_Profit = 0,
    total_bonus = 0,
    total_deposit = 0,
    total_withdrawal = 0,
    referral_bonus = 0,
  } = tradingAccount as any;

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

  const transactionsList = await getUserTransactions();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-lg md:text-2xl text-primary">
        Welcome, {name || ""}!
      </h1>
      <WelcomeMsg />
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

      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-xs">Active Investments</h1>
        </div>

        <Card className="">
          {investments.length <= 0 && (
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

          {investments.length > 0 && (
            <div>
              <div className="flex flex-col items-center justify-center py-4 px-4">
                <table className="w-full table-auto text-sm text-left mb-8">
                  <thead className="table-header">
                    <tr className="font-large w-full text-nowrap text-primary">
                      <th className="!text-primary py-2 px-5">Investment Id</th>
                      <th className="!text-primary py-2 pr-4 lg:pr-2 px-5">
                        Amount Invested
                      </th>
                      <th className="!text-primary py-2 px-5">
                        Investment Type
                      </th>
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
                    {investments
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

      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-xs">Recent transactions</h1>
          <Link href={"/transactions"}>
            <Button className="mt-4">View all transactions</Button>
          </Link>
        </div>

        <Card>
          <div className="flex flex-col items-center justify-center py-4 px-4">
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
                {transactionsList
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

      <Card>
        <div className="p-6">
          <h1 className="mb-2 uppercase text-sm font-semibold">
            Real time market data
          </h1>
          <CrossRateWidget />
        </div>
      </Card>
    </div>
  );
}
