import type { CommonResponse } from "../xhr";

export interface UserResponse<T extends UserRecord> extends CommonResponse {
  data: T;
  code: string;
  status: number;
}
export interface UserRecord {
  data: User;
  success: boolean;
  message: string;
}

export interface Role {
  id: number;
  roleName: string;
  description: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  fullName: string;
  age: number;
  address: string,
  photo: string,
  status: number,
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  token: string;
}
