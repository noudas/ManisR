import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse } from "@/types/generalAPITypes";

const useApiCall = <T,>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (
    url: string,
    method: "get" | "post" | "put" | "delete",
    body?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios({
        url,
        method,
        data: body,
        ...config,
      });
      
      const result: ApiResponse<T> = response.data;
      if (result.success) {
        setData(result.data || null);
      } else {
        throw new Error(result.message || "Unknown error");
      }
      
      return result;
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return { success: false, message: err.message || "An error occurred", error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request };
};

export default useApiCall;
