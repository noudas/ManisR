import { useState } from "react";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/scripts/api";
import RequestTypes from "@/types/requestTypes";
import { useRouter } from "expo-router";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loginUser = async (loginData: typeof RequestTypes.LoginRequest) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Starting login request:", {
        url: `${API_BASE_URL}/api/v1/auth/login`,
        data: loginData,
      });

      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, loginData, {
        timeout: 5000,
        validateStatus: (status) => status >= 200 && status < 300,
      });

      console.log("Login response:", response.data);

      if (response.data.token) {
        // Save token in AsyncStorage
        await AsyncStorage.setItem("userToken", response.data.token);
        await AsyncStorage.setItem("userEmail", loginData.username);

        return response.data;
      } else {
        throw new Error("Login failed: Token not returned.");
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.error("Login error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      setError((error.response?.data as { error?: string })?.error || error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};

export default useLogin;
