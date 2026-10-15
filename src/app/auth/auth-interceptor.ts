import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Auth } from './auth';

// Interceptor — как interceptor/middleware в Nest, только на стороне клиента:
// через него проходит каждый HTTP-запрос приложения.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const token = auth.token();

  // Запросы неизменяемые, поэтому делаем копию с заголовком
  // "Authorization: Bearer eyJ..." — именно его ждёт MyAuthGuard на сервере.
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((err: unknown) => {
      // 401 при наличии токена — токен протух или неверный: разлогиниваем.
      if (err instanceof HttpErrorResponse && err.status === 401 && token) {
        auth.logout();
      }
      return throwError(() => err);
    }),
  );
};
