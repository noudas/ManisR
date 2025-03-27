import type User from "./userTypes";

export type AdminUserListResponse = {
  users: User[];
};

export type AdminDeleteUserResponse = {
  message: string;
};

const AdminUserTypes = {};

export default AdminUserTypes;
