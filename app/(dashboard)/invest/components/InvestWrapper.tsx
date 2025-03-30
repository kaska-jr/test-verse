"use client";
import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { formatPriceInDollar } from "@/lib/helper";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { Input } from "@/components/ui/InputTag";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useGetTradingAccount from "@/hooks/useGetTradingAccount";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import useGetInvestmentsPlans from "@/hooks/useGetInvestmentsPlans";

const InvestWrapper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [amount, setAmount] = useState(""); // State for amount input
  const router = useRouter();
  // Open Modal with selected plan
  const openModal = (plan: any) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
    setAmount(""); // Reset amount input
  };

  const { tradingAccount } = useGetTradingAccount() as any;
  const { user } = useGetCurrentUser() as any;
  const { userInvestmentPlans } = useGetInvestmentsPlans();

  const balance = tradingAccount.balance;

  // Handle Investment Submission
  const handleInvestmentSubmit = async () => {
    if (!selectedPlan || !user) return;

    const formatedAmount = Number(amount);

    if (balance < formatedAmount) {
      router.push("/deposit?status=error&message=Insufficient balance");
      return;
    }

    const payload = {
      planId: selectedPlan?.id,
      userId: user?.id,
      amount: formatedAmount,
    };

    try {
      const response = await axios.post("/api/investments", payload);
      console.log("Investment response:", response);
      if (response.status === 201) {
        closeModal();
        toast.success("Investment successful");
        router.push(
          "/investments?status=success&message=Investment successful"
        );
      }
    } catch (error) {
      console.error("Error submitting investment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto mt-10">
        {userInvestmentPlans.length === 0 && (
          <div className="col-span-3">
            <p className="text-center">No Investments Found.</p>
          </div>
        )}
        {/* List of investments */}
        {userInvestmentPlans.map((investment: any) => (
          <Card
            key={investment.name}
            className="mb-4 p-3 py-4 flex flex-col gap-5"
          >
            <CardTitle className="flex flex-col justify-center items-center gap-1 tracking-wide">
              <h1 className="text-green text-sm md:text-lg">
                {investment.interestRate}% ROI
              </h1>
              <div className="flex justify-center items-center gap-2">
                <h2 className="text-green text-xl md:text-2xl font-semibold leading-none tracking-tight text-center">
                  {investment.name} Investment
                </h2>
              </div>
              <hr className="w-full mt-5" />
            </CardTitle>

            <CardContent className="flex flex-col gap-5 px-3 py-0">
              <div>
                <span className="flex items-center gap-2">
                  {" "}
                  <Check className="text-green w-5 h-5" />
                  Minimum amount: {formatPriceInDollar(investment.minAmount)}
                </span>
                <span className="flex items-center gap-2">
                  {" "}
                  <Check className="text-green w-5 h-5" />
                  Maximum amount:{" "}
                  {formatPriceInDollar(investment.maxAmount || 0)}
                </span>
                <span className="flex items-center gap-2">
                  {" "}
                  <Check className="text-green w-5 h-5" />
                  {investment.interestRate}% ROI
                </span>
                <span className="flex items-center gap-2">
                  {" "}
                  <Check className="text-green w-5 h-5" />
                  Charges Amount: {formatPriceInDollar(0)}
                </span>
                <span className="flex items-center gap-2">
                  {" "}
                  <Check className="text-green w-5 h-5" />
                  Duration:{" "}
                  <span className="lowercase">
                    {investment.durationValueFrom} to{" "}
                    {investment.durationValueTo} {investment.durationType}
                  </span>
                </span>
              </div>
              <div className="border border-secondary p-4 flex items-center justify-center">
                {`${formatPriceInDollar(investment.minAmount)} - ${formatPriceInDollar(investment.maxAmount || 0)}`}
              </div>

              <Button className="w-full" onClick={() => openModal(investment)}>
                Join Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Investment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleInvestmentSubmit}
        title="Invest in Plan"
        actionLabel="Invest Now"
        body={
          <div className="flex flex-col gap-4">
            <p>
              You are about to make a{" "}
              <span className="font-semibold">{selectedPlan?.name}</span>{" "}
              Investment.
            </p>
            <Input
              type="number"
              className="border p-2 w-full rounded"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={selectedPlan?.minAmount}
              max={selectedPlan?.maxAmount || ""}
            />
          </div>
        }
      />
    </div>
  );
};

export default InvestWrapper;
