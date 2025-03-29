type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  username: string;
  password: string;
  authorization_level: 'user' | 'admin';
  is_verified: boolean;
  verification_token?: string | null;
  two_factor_token?: string | null;
  two_factor_expiry?: string | null;
  is_phone_verified: boolean;
  gender: "אחר" | "אישה" | "גבר";
  created_at: string;
  updated_at: string;
};

export default User;
