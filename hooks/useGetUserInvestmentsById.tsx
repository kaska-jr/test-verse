"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetUserInvestmentsById = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInvestments, setUserInvestments] = useState([]);

  useEffect(() => {
    const fetchUserInvestments = async () => {
      try {
        setLoading(true);
        const response = await axios(`/api/investments/${userId}`);
        const data = response.data;
        setUserInvestments(data.investments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user investments:", error);
        setLoading(false);
        // @ts-ignore
        setError(error);
      }
    };
    fetchUserInvestments();
  }, []);
  return { userInvestments, loading, error };
};

export default useGetUserInvestmentsById;
