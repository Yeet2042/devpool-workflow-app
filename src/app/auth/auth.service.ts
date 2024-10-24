import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggedInUser, Tokens, UserProfile } from './models/logged-in-user';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ENV_CONFIG } from '../../env.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private envConfig = inject(ENV_CONFIG)
  readonly apiUrl = `${this.envConfig.apiUrl}/auth/login`;

  httpClient = inject(HttpClient)

  loggedInUser: LoggedInUser | null = null;

  login(creadential: { email:string; password: string }): Observable<Tokens> {
    return this.httpClient
      .post<Tokens>(this.apiUrl, creadential)
      .pipe(tap((newToken) => this.setToken(newToken)))
  }
  setToken(newToken: Tokens) {
    const userProfile = jwtDecode<UserProfile>(newToken.access_token);
    this.loggedInUser = { tokens: newToken, userProfile };
  }
}
