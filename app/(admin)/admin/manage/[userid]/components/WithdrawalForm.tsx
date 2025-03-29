"use client";
import React from "react";
import { Input as InputTag } from "@/components/ui/InputTag";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/SelectDropdown";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const WithdrawalForm = ({ userId }: { userId: string }) => {
  const [depositDetails, setDepositDetails] = React.useState<any>({
    amount: "",
    type: "WITHDRAWAL",
    userId: userId,
    reference: "1234567890",
    description: `account profit`,
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  // Function to format numbers with commas
  const formatNumber = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    return numericValue
      ? new Intl.NumberFormat("en-US").format(Number(numericValue))
      : "";
  };

  // Handle input change with formatting
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatNumber(rawValue);

    setDepositDetails({
      ...depositDetails,
      amount: formattedValue, // Store formatted value
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Convert formatted string back to number before sending to API
      const formattedAmount = Number(depositDetails.amount.replace(/,/g, ""));

      if (isNaN(formattedAmount)) {
        console.error("Invalid amount input.");
        return;
      }

      const response = await axios.post("/api/transaction", {
        ...depositDetails,
        amount: formattedAmount,
      });

      console.log(response, "response");

      if (response.status === 201) {
        setIsLoading(false);
        router.refresh();
        setDepositDetails({
          ...depositDetails,
          amount: "",
        });
        toast.success("Deposit successful");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full flex flex-col gap-4 p-6" onSubmit={onSubmit}>
      {/* Amount Input */}
      <div className="w-full">
        <label className="mb-3 block text-sm font-medium text-muted-foreground">
          Enter Profit Amount
        </label>
        <div className="relative h-fit">
          <span className=" absolute -translate-y-1/2 top-1/2 left-2 text-muted-foreground">
            $
          </span>
          <InputTag
            name="amount"
            type="text"
            value={depositDetails.amount}
            onChange={handleAmountChange}
            placeholder="Enter Amount"
            className="w-full rounded-lg bg-background !px-6"
          />
        </div>
      </div>

      {/* Payment Method Selection */}
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

      {/* Submit Button */}
      <div>
        <Button
          className="w-full flex items-center justify-center"
          type="submit"
        >
          {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          <span>Withdraw</span>
        </Button>
      </div>
    </form>
  );
};

export default WithdrawalForm;
