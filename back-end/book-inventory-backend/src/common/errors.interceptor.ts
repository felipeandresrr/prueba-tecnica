import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadGatewayException,
  } from '@nestjs/common';
  import { Observable, catchError, throwError } from 'rxjs';
  
  @Injectable()
  export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        catchError(err => {
          console.error('Error capturado por interceptor:', err);
          return throwError(() => new BadGatewayException('Algo salió mal'));
        }),
      );
    }
  }
  