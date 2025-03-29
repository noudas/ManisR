import { useState } from "react";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/scripts/api";
import RequestTypes from "@/types/requestTypes";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const registerUser = async (userData: typeof RequestTypes.RegisterRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Starting registration request:', {
        url: `${API_BASE_URL}/api/v1/auth/register`,
        data: userData
      });

      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, userData, {
        timeout: 5000, // Add timeout
        validateStatus: (status) => {
          console.log('Response status:', status);
          return status >= 200 && status < 300;
        }
      });

      console.log('Registration response:', response.data);
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.error('Registration error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });

      setError((error.response?.data as { error?: string })?.error || error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error };
};

export default useRegister;