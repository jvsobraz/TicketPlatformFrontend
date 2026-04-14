import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Prepends the API base URL to all relative requests.
 * In dev: environment.apiUrl = '' → no change (Angular proxy handles it).
 * In prod: environment.apiUrl = 'https://tickly-backend-production.up.railway.app'
 */
export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (environment.apiUrl && req.url.startsWith('/')) {
    return next(req.clone({ url: environment.apiUrl + req.url }));
  }
  return next(req);
};
