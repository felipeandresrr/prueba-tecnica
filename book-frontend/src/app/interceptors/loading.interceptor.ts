// src/app/interceptors/loading.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, of, switchMap, timer } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.show();

  const minLoadingTime$ = timer(1000);

  return next(req).pipe(
    switchMap(response =>
      minLoadingTime$.pipe(switchMap(() => of(response)))
    ),
    finalize(() => loadingService.hide())
  );
};
