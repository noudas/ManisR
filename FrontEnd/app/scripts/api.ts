import { Platform } from "react-native";

const getBaseUrl = () => {
    const baseUrl = Platform.select({
        ios: 'http://localhost:3000',
        android: 'http://192.168.1.152:3000',
        default: 'http://192.168.1.152:3000'
      })!;
      
      console.log('Using base URL:', baseUrl);
      return baseUrl;
  };
  
  export const API_BASE_URL = getBaseUrl();
  