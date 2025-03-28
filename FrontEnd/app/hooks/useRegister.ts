import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/scripts/api";
import RequestTypes from "@/types/requestTypes";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (userData: typeof RequestTypes.RegisterRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error };
};

export default useRegister;
