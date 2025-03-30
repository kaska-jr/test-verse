"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetCurrentUser = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios("/api/user");
        const data = response.data;
        setUser(data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trading account:", error);
        setLoading(false);
        //@ts-ignore
        setError(error);
      }
    };
    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useGetCurrentUser;
