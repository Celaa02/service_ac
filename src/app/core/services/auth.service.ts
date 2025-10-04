import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private KEY = 'token';
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, { email, password });
  }
  register(name: string, email: string, password: string) {
    return this.http.post<{ user: { id: string; email: string }, token: string }>(
      `${environment.apiUrl}/auth/register`,
      { name, email, password }
    );
  }

  setToken(t: string) { localStorage.setItem(this.KEY, t); }
  getToken() { return localStorage.getItem(this.KEY) || ''; }
  logout() { localStorage.removeItem(this.KEY); }
}

