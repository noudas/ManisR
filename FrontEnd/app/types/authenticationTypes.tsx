export type AuthenticatedUser = {
  id: number;
  username: string;
  authorization_level: 'user' | 'admin';
  is_verified: boolean;
  is_phone_verified: boolean;
};

export type AuthResponse = {
  message: string;
  token: string;
  user: AuthenticatedUser;
};

const AuthTypes = {};

export default AuthTypes;
