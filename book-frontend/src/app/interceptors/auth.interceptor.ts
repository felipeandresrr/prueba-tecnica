import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const authReq = token ? req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }) : req;

  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401) {
        alert("sesión cerrada, inicia nuevamente")
        localStorage.clear();
        sessionStorage.clear();
        router.navigate(['/']);
      }
      return throwError(() => err);
    })
  );
};
