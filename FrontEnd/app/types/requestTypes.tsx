import type User from "./userTypes";

const RequestTypes = {
  RegisterRequest: {
    first_name: "string",
    last_name: "string",
    email: "string",
    telephone: "string",
    username: "string",
    password: "string",
    authorization_level: "'user' | 'admin' | undefined",
    gender: "'אחר' | 'אישה' | 'גבר'",
  },
  LoginRequest: {
    username: "string",
    password: "string",
    twoFactorCode: "string | undefined",
  },
  UpdateUserRequest: {
    first_name: "string | undefined",
    last_name: "string | undefined",
    email: "string | undefined",
    telephone: "string | undefined",
    username: "string | undefined",
    authorization_level: "'user' | 'admin' | undefined",
    gender: "'אחר' | 'אישה' | 'גבר' | undefined",
  }
};

export default RequestTypes;
