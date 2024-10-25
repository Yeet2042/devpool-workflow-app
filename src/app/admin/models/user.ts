import { Department, Role } from "../../auth/models/logged-in-user";

interface DepartmentWithId {
  name: string;
}

export interface CreateUser {
  department: DepartmentWithId;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface Users {
  user_id: number;
  name: string;
  email: string;
  role: Role;
  department: Department;
}
