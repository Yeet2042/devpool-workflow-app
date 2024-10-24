import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassSolid, heroXMarkSolid, heroCheckSolid, heroPencilSquareSolid } from '@ng-icons/heroicons/solid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ENV_CONFIG } from '../../../env.config';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Users } from '../models/user';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [NgIconComponent, DatePipe, RouterLink],
  providers: [provideIcons({ heroMagnifyingGlassSolid, heroXMarkSolid, heroCheckSolid, heroPencilSquareSolid })],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.scss'
})
export class EmployeePageComponent {
  private envConfig = inject(ENV_CONFIG)
  readonly apiUrl = `${this.envConfig.apiUrl}/users/all`;

  authService = inject(AuthService)
  httpClient = inject(HttpClient);

  users: Users[] = [];
  filterUsers = this.users;
  filterInput = new FormControl<string>('', { nonNullable: true })

  constructor() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.loggedInUser?.tokens.access_token}`
    })
    this.httpClient.get<Users[]>(this.apiUrl, { headers }).subscribe((users) => {
      this.users = users;
      this.filterUsers = users;
    })
  }
}
