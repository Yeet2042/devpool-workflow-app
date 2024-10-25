import { Department, Role } from "../../auth/models/logged-in-user";

export enum ItemStatus {
  PENDING = 'PENDING', APPROVED = 'APPROVED', REJECTED = 'REJECTED'
}

export interface User {
  user_id: number;
  name: string;
  role: Role;
}

export interface UserWithId {
  user_id: number;
}

export interface CreateItem {
  user: UserWithId;
  title: string;
  amount: number;
  quantity: number;
}

export interface EditIem {
  title: string;
  amount: number;
  quantity: number;
}

export interface Item {
  item_id: number;
  title: string;
  amount: number;
  quantity: number;
  status: ItemStatus;
  created_at: Date;
  updated_at: Date;
  user: User;
  department: Department;
}