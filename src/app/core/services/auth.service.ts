import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {
  AuthResponse, LoginRequest, RegisterRequest, UpdateProfileRequest,
  ChangePasswordRequest, UserRole, ForgotPasswordRequest, ResetPasswordRequest,
  TwoFactorSetupResponse, TwoFactorVerifyRequest, TwoFactorEnableRequest
} from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly BASE_URL = '/Auth';
  private readonly TOKEN_KEY = 'tp_token';
  private readonly TOKEN_EXPIRY_KEY = 'tp_token_expiry';
  private readonly USER_KEY = 'tp_user';
  private readonly SESSION_FLAG = 'tp_session';
  private readonly TWO_FA_TEMP_KEY = 'tp_2fa_temp';

  currentUser = signal<AuthResponse | null>(this.loadUser());

  constructor(private http: HttpClient, private router: Router) {}

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/register`, request).pipe(
      tap(response => this.saveSession(response))
    );
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/login`, request, { withCredentials: true }).pipe(
      tap(response => {
        if (response.requiresTwoFactor) {
          sessionStorage.setItem(this.TWO_FA_TEMP_KEY, response.token);
        } else {
          this.saveSession(response);
        }
      })
    );
  }

  // Refresh token vive em cookie HTTP-only — não é enviado no body
  refresh(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/refresh`, {}, { withCredentials: true }).pipe(
      tap(response => this.saveSession(response))
    );
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}/forgot-password`, request);
  }

  resetPassword(request: ResetPasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}/reset-password`, request);
  }

  confirmEmail(token: string): Observable<void> {
    return this.http.get<void>(`${this.BASE_URL}/confirm-email`, { params: { token } });
  }

  getProfile(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.BASE_URL}/profile`).pipe(
      tap(response => {
        const current = this.currentUser();
        if (current) {
          this.saveSession({ ...current, ...response, token: current.token });
        }
      })
    );
  }

  updateProfile(request: UpdateProfileRequest): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/profile`, request);
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/change-password`, request);
  }

  // ── 2FA ──────────────────────────────────────────────────────────────────

  getTwoFactorTempToken(): string | null {
    return sessionStorage.getItem(this.TWO_FA_TEMP_KEY);
  }

  clearTwoFactorTempToken(): void {
    sessionStorage.removeItem(this.TWO_FA_TEMP_KEY);
  }

  twoFactorSetup(): Observable<TwoFactorSetupResponse> {
    return this.http.post<TwoFactorSetupResponse>(`${this.BASE_URL}/2fa/setup`, {});
  }

  twoFactorEnable(request: TwoFactorEnableRequest): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}/2fa/enable`, request);
  }

  twoFactorDisable(request: TwoFactorEnableRequest): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}/2fa/disable`, request);
  }

  twoFactorVerify(request: TwoFactorVerifyRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/2fa/verify`, request, { withCredentials: true }).pipe(
      tap(response => {
        this.clearTwoFactorTempToken();
        this.saveSession(response);
      })
    );
  }

  logout(): void {
    this.http.post(`${this.BASE_URL}/logout`, {}, { withCredentials: true }).subscribe({ error: () => {} });
    this.clearSession();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** Indica se existe uma sessão ativa (cookie de refresh emitido pelo backend). */
  hasSession(): boolean {
    return !!localStorage.getItem(this.SESSION_FLAG);
  }

  isTokenExpired(): boolean {
    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    if (!expiry) return false;
    return new Date(expiry) <= new Date();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === UserRole.Admin;
  }

  isOrganizer(): boolean {
    const role = this.currentUser()?.role;
    return role === UserRole.Organizer || role === UserRole.Admin;
  }

  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.SESSION_FLAG);
    this.currentUser.set(null);
  }

  private saveSession(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.SESSION_FLAG, '1');
    if (response.tokenExpiresAt) {
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, response.tokenExpiresAt);
    }
    localStorage.setItem(this.USER_KEY, JSON.stringify(response));
    this.currentUser.set(response);
  }

  private loadUser(): AuthResponse | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }
}
