import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios("/api/users");
        const data = response.data;
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user investmentsPlans:", error);
        setLoading(false);
        // @ts-ignore
        setError(error);
      }
    };
    fetchUsers();
  }, []);
  return { users, loading, error };
};

export default useGetAllUsers;
