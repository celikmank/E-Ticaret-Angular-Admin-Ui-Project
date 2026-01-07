import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, retry, timer } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({
      count: 2,
      delay: (error, retryCount) => {
        if (error instanceof HttpErrorResponse && error.status >= 500) {
          return timer(1000 * retryCount);
        }
        throw error;
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', {
        url: req.url,
        status: error.status,
        message: error.message,
        error: error.error
      });
      return throwError(() => error);
    })
  );
};
