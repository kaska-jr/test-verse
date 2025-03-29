import { Input as InputTag } from "@/components/ui/InputTag";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/SelectDropdown";
import PaymentLogo from "@/components/PaymentLogo";
import DepositMsg from "./components/DepositMsg";

const Deposit = () => {
  return (
    <section>
      <h1 className="text-xl md:text-2xl font-semibold leading-none tracking-tight mb-3">
        Deposit into your account
      </h1>
      <DepositMsg />

      <Card>
        <div className="p-6 pb-0 w-full grid grid-cols-1 md:grid-cols-2 gap-4 border-b">
          <form className="w-full flex flex-col gap-4 p-6">
            <div className="w-full">
              <label className="mb-3 block text-sm font-medium text-muted-foreground">
                Enter Amount
              </label>
              <InputTag
                name="amount"
                type="number"
                placeholder="Enter Amount"
                className="w-full rounded-lg bg-background"
              />
            </div>
            <div className="w-full">
              <label className="mb-3 block text-sm font-medium text-muted-foreground">
                Choose Payment Method
              </label>
              <Select defaultValue="direct_deposit">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct_deposit">Direct Deposit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
          <div className="flex flex-col gap-2 items-center justify-center p-6">
            <h1>Payment Methods</h1>
            <PaymentLogo />
          </div>
        </div>
        <Link
          href={"/transactions"}
          className="text-green p-4 px-12 inline-block"
        >
          View deposit history
        </Link>
      </Card>
    </section>
  );
};

export default Deposit;
