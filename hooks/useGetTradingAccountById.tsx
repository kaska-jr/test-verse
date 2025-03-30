"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetTradingAccountById = ({ userId }: { userId: string }) => {
  const [tradingAccount, setTradingAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTradingAccount = async () => {
      try {
        setLoading(true);
        const response = await axios(`/api/trading-account/${userId}`);
        const data = response.data;
        setTradingAccount(data.tradingAccount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trading account:", error);
        setLoading(false);
        //@ts-ignore
        setError(error);
      }
    };
    fetchTradingAccount();
  }, []);

  return { tradingAccount, loading, error };
};

export default useGetTradingAccountById;
