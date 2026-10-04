import type {USER_ROLES} from "../lib/constants";

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type UserStatus = "active" | "blocked";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole | string;
  status: UserStatus | string;
  avatar_url?: string;
  created_at?: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: UserRole | string;
}
