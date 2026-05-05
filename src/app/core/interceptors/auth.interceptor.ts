import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthResponse } from '../models';

// Module-level state for coordinating concurrent refresh attempts
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getToken();
  const authReq = attachToken(req, token);

  return next(authReq).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401(authReq, next, authService);
      }
      return throwError(() => error);
    })
  );
};

function attachToken(req: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
  if (!token) return req;
  return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
}

function handle401(req: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService) {
  // Never retry the refresh or login endpoints — avoid infinite loops
  if (req.url.includes('/Auth/refresh') || req.url.includes('/Auth/login')) {
    authService.clearSession();
    return throwError(() => new Error('Sessão expirada.'));
  }

  // Se não há sessão registrada, o cookie HTTP-only não existe — não vale tentar o refresh
  if (!authService.hasSession()) {
    authService.clearSession();
    return throwError(() => new Error('Sem sessão ativa. Faça login novamente.'));
  }

  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    // Refresh token é enviado automaticamente via cookie HTTP-only (withCredentials no service)
    return authService.refresh().pipe(
      switchMap((response: AuthResponse) => {
        isRefreshing = false;
        refreshTokenSubject.next(response.token);
        return next(attachToken(req, response.token));
      }),
      catchError(err => {
        isRefreshing = false;
        refreshTokenSubject.next(null);
        authService.clearSession();
        return throwError(() => err);
      })
    );
  }

  // Outra requisição já iniciou o refresh — aguarda o token novo
  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap(token => next(attachToken(req, token)))
  );
}
