import WelcomeMsg from "./components/WelcomeMsg";
import CrossRateWidget from "../dashboard/components/CrossRateWidget";
import TradingAccount from "./components/TradingAccount";
import RecentInvestments from "./components/RecentInvestments";
import RecentTransactions from "./components/RecentTransactions";

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <WelcomeMsg />
      <TradingAccount />
      <RecentInvestments />
      <RecentTransactions />
      <CrossRateWidget />
    </div>
  );
}
