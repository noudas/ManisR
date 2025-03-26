export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
    username: string;
    password: string;
    authorization_level: 'user' | 'admin'; // Restrict to known roles
    is_verified: boolean;
    verification_token?: string | null;
    two_factor_token?: string | null;
    two_factor_expiry?: string | null; // Store as string (ISO format) or number (timestamp)
    is_phone_verified: boolean;
    created_at: string; // Store as ISO date string
    updated_at: string; // Store as ISO date string
  };