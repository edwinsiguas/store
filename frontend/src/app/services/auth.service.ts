import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthRequest, AuthResponse, RegisterRequest, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { 
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('user_email');
    const role = localStorage.getItem('user_role');
    const name = localStorage.getItem('user_name');

    if (token && email) {
      this.currentUserSubject.next({
        name: name || email.split('@')[0],
        email: email,
        role: role || 'ROLE_CLIENT'
      });
    }
  }

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('user_role', response.role);
        localStorage.setItem('user_email', response.email);
        
        const user: User = {
          email: response.email,
          role: response.role,
          name: response.email.split('@')[0]
        };
        localStorage.setItem('user_name', user.name);
        this.currentUserSubject.next(user);
      })
    );
  }

  register(userData: RegisterRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, userData, { responseType: 'text' });
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
