"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetInvestmentPlanById = ({ planId }: { planId: string }) => {
  const [investmentPlan, setInvestmentPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestmentPlan = async () => {
      try {
        setLoading(true);
        const response = await axios(`/api/investment-plans/${planId}`);
        const investmentPlan = response.data;
        setInvestmentPlan(investmentPlan);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trading account:", error);
        setLoading(false);
        //@ts-ignore
        setError(error);
      }
    };
    fetchInvestmentPlan();
  }, []);

  return { investmentPlan, loading, error };
};

export default useGetInvestmentPlanById;
