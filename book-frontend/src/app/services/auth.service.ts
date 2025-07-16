import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000/auth';
  token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.api}/login`, { email, password })
      .pipe(tap(res => {
        this.token = res.token;
        localStorage.setItem('token', res.token);
      }));
  }

  getToken() {
    return this.token || localStorage.getItem('token');
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
