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
import { formatNumber } from "@/lib/helper";

const InvestmentCreationForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [depositDetails, setDepositDetails] = React.useState<any>({
    name: "",
    minAmount: "",
    maxAmount: "",
    durationValueFrom: "",
    durationValueTo: "",
    interestRate: "",
    durationType: "DAYS",
  });

  // Handle input change with formatting
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const rawName = e.target.name;
    const formattedValue = formatNumber(rawValue);
    setDepositDetails({
      ...depositDetails,
      [rawName]: formattedValue, // Store formatted value
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    if (
      !depositDetails.name ||
      !depositDetails.minAmount ||
      !depositDetails.maxAmount ||
      !depositDetails.interestRate ||
      !depositDetails.durationValueFrom ||
      !depositDetails.durationValueTo
    ) {
      setIsLoading(false);
      setError("Please fill in all the fields.");
      return;
    }

    // Convert formatted string back to number before sending to API
    const formattedMinAmount = Number(
      depositDetails.minAmount.replace(/,/g, "")
    );

    const formattedMaxAmount = Number(
      depositDetails.maxAmount.replace(/,/g, "")
    );

    const formatteddurationValueFrom = Number(depositDetails.durationValueFrom);
    const formatteddurationValueTo = Number(depositDetails.durationValueTo);

    const formattedInterestRate = Number(depositDetails.interestRate);

    if (formattedMinAmount > formattedMaxAmount) {
      setIsLoading(false);
      setError("Minimum amount cannot be greater than maximum amount.");
      return;
    }

    if (isNaN(formattedMinAmount) || isNaN(formattedMaxAmount)) {
      setIsLoading(false);
      setError("Invalid amount input.");
      return;
    }

    try {
      setIsLoading(false);

      const payload = {
        ...depositDetails,
        minAmount: formattedMinAmount,
        maxAmount: formattedMaxAmount,
        durationValueFrom: formatteddurationValueFrom,
        durationValueTo: formatteddurationValueTo,
        interestRate: formattedInterestRate,
      };

      const response = await axios.post("/api/investment-plans", payload);
      if (response.status === 201) {
        setIsLoading(false);
        router.refresh();
        setDepositDetails({
          ...depositDetails,
          name: "",
          minAmount: "",
          maxAmount: "",
          interestRate: "",
          durationValueFrom: "",
          durationValueTo: "",
          durationType: "DAYS",
        });
        toast.success("Investment Plan created successfully");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="w-full">
        <label className="mb-3 block text-sm font-medium text-muted-foreground">
          Investment Name
        </label>
        <div className="relative h-fit">
          <InputTag
            name="name"
            type="text"
            value={depositDetails.name}
            onChange={(e) => {
              setDepositDetails({
                ...depositDetails,
                name: e.target.value,
              });
            }}
            placeholder="Investment Plan Name"
            className="w-full rounded-lg bg-background"
          />
        </div>
      </div>

      <div className="w-full">
        <label className="mb-3 block text-sm font-medium text-muted-foreground">
          Return of Investment (in %) ROI
        </label>
        <div className="relative h-fit">
          <span className="absolute -translate-y-1/2 top-1/2 left-2 text-muted-foreground">
            %
          </span>
          <InputTag
            name="interestRate"
            type="number"
            value={depositDetails.interestRate}
            onChange={(e) => {
              setDepositDetails({
                ...depositDetails,
                interestRate: e.target.value,
              });
            }}
            placeholder="Interest Rate"
            className="w-full rounded-lg bg-background !px-6"
          />
        </div>
      </div>

      <div className="w-full">
        <label className="mb-3 block text-sm font-medium text-muted-foreground">
          Investments Duration Type
        </label>
        <Select
          defaultValue="DAYS"
          onValueChange={(value) => {
            setDepositDetails({
              ...depositDetails,
              durationType: value,
            });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DAYS">Days</SelectItem>
            <SelectItem value="MONTHS">Months</SelectItem>
            <SelectItem value="YEARS">Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <label className="mb-3 block text-sm font-medium text-muted-foreground">
          Investment Duration From
        </label>
        <div className="relative h-fit">
          <InputTag
            name="durationValueFrom"
            type="number"
            value={depositDetails.durationValueFrom}
            onChange={(e) => {
              setDepositDetails({
                ...depositDetails,
                durationValueFrom: e.target.value,
              });
            }}
            placeholder="Investment Duration From"
            className="w-full rounded-lg bg-background"
          />
        </div>
      </div>

      <div className="w-full">
        <label className="mb-3 block text-sm font-medium text-muted-foreground">
          Investment Duration To
        </label>
        <div className="relative h-fit">
          <InputTag
            name="durationValueFrom"
            type="number"
            value={depositDetails.durationValueTo}
            onChange={(e) => {
              setDepositDetails({
                ...depositDetails,
                durationValueTo: e.target.value,
              });
            }}
            placeholder="Investment Duration From"
            className="w-full rounded-lg bg-background"
          />
        </div>
      </div>

      {/* Amount Input */}
      <div className="w-full">
        <label className="mb-3 block text-sm font-medium text-muted-foreground">
          Enter Minimum Amount
        </label>
        <div className="relative h-fit">
          <span className=" absolute -translate-y-1/2 top-1/2 left-2 text-muted-foreground">
            $
          </span>
          <InputTag
            name="minAmount"
            type="text"
            value={depositDetails.minAmount}
            onChange={handleAmountChange}
            placeholder="Minimum Amount"
            className="w-full rounded-lg bg-background !px-6"
          />
        </div>
      </div>

      <div className="w-full">
        <label className="mb-3 block text-sm font-medium text-muted-foreground">
          Enter Maximum Amount
        </label>
        <div className="relative h-fit">
          <span className=" absolute -translate-y-1/2 top-1/2 left-2 text-muted-foreground">
            $
          </span>
          <InputTag
            name="maxAmount"
            type="text"
            value={depositDetails.maxAmount}
            onChange={handleAmountChange}
            placeholder="Maximum Amount"
            className="w-full rounded-lg bg-background !px-6"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <Button
          className="w-full flex items-center justify-center"
          type="submit"
        >
          {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          <span>Create Investment Plan</span>
        </Button>
        {error && <span className="text-red-500 mt-2 text-xs">{error}</span>}
      </div>
    </form>
  );
};

export default InvestmentCreationForm;
