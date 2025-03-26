import { User } from "./userTypes";

export type AdminUserListResponse = {
    users: User[];
  };
  
  export type AdminDeleteUserResponse = {
    message: string;
  };
  