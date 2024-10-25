import { inject, Injectable } from '@angular/core';
import { ENV_CONFIG } from '../../env.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { CreateUser, Users } from './models/user';
import { CreateDepartment, Department } from '../auth/models/logged-in-user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private envConfig = inject(ENV_CONFIG)
  readonly apiUrl = `${this.envConfig.apiUrl}`;
  private httpClient = inject(HttpClient);

  authService = inject(AuthService);

  listUsers() {
    return this.httpClient.get<Users[]>(`${this.apiUrl}/users/all`);
  }

  addUser(user: CreateUser) {
    return this.httpClient.post<CreateUser>(`${this.apiUrl}/users`, user)
  }

  edit(user: CreateUser, user_id: number) {
    return this.httpClient.patch<CreateUser>(`${this.apiUrl}/users/${user_id}`, user);
  }

  delete(user_id: number) {
    return this.httpClient.delete<void>(`${this.apiUrl}/users/${user_id}`)
  }

  listDepartments() {
    return this.httpClient.get<Department[]>(`${this.apiUrl}/departments`);
  }

  addDepartment(department: CreateDepartment) {
    return this.httpClient.post<CreateDepartment>(`${this.apiUrl}/departments`, department)
  }

  editDepartment(department: CreateDepartment, department_id: number) {
    return this.httpClient.patch<CreateDepartment>(`${this.apiUrl}/departments/${department_id}`, department);
  }

  deleteDepartment(department_id: number) {
    return this.httpClient.delete<void>(`${this.apiUrl}/departments/${department_id}`)
  }
}
