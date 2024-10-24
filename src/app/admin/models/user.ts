import { Department, Role } from "../../auth/models/logged-in-user";

export interface Users {
  user_id: number;
  name: string;
  email: string;
  role: Role;
  department: Department;
}
