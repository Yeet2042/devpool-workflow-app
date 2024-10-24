export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export enum Role {
  REQUESTER = 'REQUESTER',
  APPROVER = 'APPROVER',
  ADMIN = 'ADMIN'
}

export interface Department {
  department_id: number;
  name: string;
}

export interface UserProfile {
  user_id: number;
  name: string;
  email: string;
  role: Role;
  department: Department;
  exp: number;
}

export interface LoggedInUser {
  tokens: Tokens;
  userProfile: UserProfile;
}