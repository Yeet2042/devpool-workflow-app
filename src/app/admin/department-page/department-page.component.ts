import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassSolid, heroXMarkSolid, heroCheckSolid, heroPencilSquareSolid } from '@ng-icons/heroicons/solid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ENV_CONFIG } from '../../../env.config';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Department } from '../../auth/models/logged-in-user';

@Component({
  selector: 'app-department-page',
  standalone: true,
  imports: [NgIconComponent, DatePipe, RouterLink],
  providers: [provideIcons({ heroMagnifyingGlassSolid, heroXMarkSolid, heroCheckSolid, heroPencilSquareSolid })],
  templateUrl: './department-page.component.html',
  styleUrl: './department-page.component.scss'
})
export class DepartmentPageComponent {
  private envConfig = inject(ENV_CONFIG)
  readonly apiUrl = `${this.envConfig.apiUrl}/departments`;

  authService = inject(AuthService)
  httpClient = inject(HttpClient);

  departments: Department[] = [];
  filterDepartments = this.departments;
  filterInput = new FormControl<string>('', { nonNullable: true })

  constructor() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.loggedInUser?.tokens.access_token}`
    })
    this.httpClient.get<Department[]>(this.apiUrl, { headers }).subscribe((departments) => {
      this.departments = departments;
      this.filterDepartments = departments;
    })
  }
}
