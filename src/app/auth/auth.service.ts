import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggedInUser, Tokens, UserProfile } from './models/logged-in-user';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ENV_CONFIG } from '../../env.config';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private envConfig = inject(ENV_CONFIG)
  readonly apiUrl = `${this.envConfig.apiUrl}/auth/login`;
  readonly TOKENS = 'TOKENS';

  httpClient = inject(HttpClient)
  router = inject(Router);

  loggedInUser: LoggedInUser | null = null;

  constructor() {
    const tokensInStorage = sessionStorage.getItem(this.TOKENS);
    if (tokensInStorage) {
      this.setTokens(JSON.parse(tokensInStorage) as Tokens);
    }
  }

  login(creadential: { email:string; password: string }): Observable<Tokens> {
    return this.httpClient
      .post<Tokens>(this.apiUrl, creadential)
      .pipe(tap((newToken) => this.setTokens(newToken)))
  }
  setTokens(newToken: Tokens) {
    const userProfile = jwtDecode<UserProfile>(newToken.access_token);
    this.loggedInUser = { tokens: newToken, userProfile };
    sessionStorage.setItem(this.TOKENS, JSON.stringify(newToken));
  }

  logout(): void {
    this.loggedInUser = null;
    sessionStorage.removeItem(this.TOKENS);
    this.router.navigate(['/']);
  }

  refreshToken(): Observable<{ access_token: string }> {
    return this.httpClient.post<{ access_token: string }>(
      `${this.envConfig.apiUrl}/auth/refresh`,
      null
    );
  }

  getLoginOauth2RedirectUrl() {
    return this.httpClient.get<{ redirectUrl: string }>(
      `${this.envConfig.apiUrl}/auth/login-oauth2-redirect-url`
    );
  }

  loginOauth2(code: string) {
    return this.httpClient
      .post<any>(`${this.envConfig.apiUrl}/auth/login-oauth2`, { code })
      .pipe(tap((newToken) => this.setTokens(newToken)));
  }
}
