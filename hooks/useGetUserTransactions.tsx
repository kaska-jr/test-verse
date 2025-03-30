import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetUserTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userTransactionsResponse, setUserTransactionsResponse] = useState({});

  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios("/api/transaction");
        const data = response.data;
        setUserTransactionsResponse(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user investments:", error);
        setLoading(false);
        // @ts-ignore
        setError(error);
      }
    };
    fetchUserTransactions();
  }, []);
  return { userTransactionsResponse, loading, error };
};

export default useGetUserTransactions;
