import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetInvestmentsPlans = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInvestmentPlans, setUserInvestmentPlans] = useState([]);

  useEffect(() => {
    const fetchUserInvestmentPlans = async () => {
      try {
        setLoading(true);
        const response = await axios("/api/investment-plans");
        const data = response.data;
        setUserInvestmentPlans(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user investmentsPlans:", error);
        setLoading(false);
        // @ts-ignore
        setError(error);
      }
    };
    fetchUserInvestmentPlans();
  }, []);
  return { userInvestmentPlans, loading, error };
};

export default useGetInvestmentsPlans;
