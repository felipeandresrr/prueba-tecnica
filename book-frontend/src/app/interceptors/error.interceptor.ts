import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptorFn: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      console.error('Error HTTP:', error);
      alert(error?.error?.message || 'Ocurrió un error inesperado');
      return throwError(() => error);
    })
  );
};
