import { User } from "./userTypes";

export type RegisterRequest = {
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
    username: string;
    password: string;
    authorization_level?: 'user' | 'admin';
  };
  
  export type LoginRequest = {
      username: string;
      password: string;
      twoFactorCode?: string; // Optional, only required if 2FA is enabled
    };
  
  
  // Allows partial updates while preventing ID/password modifications 
  export type UpdateUserRequest = Partial<Omit<User, 'id' | 'password' | 'created_at' | 'updated_at'>>;   