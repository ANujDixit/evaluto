import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((errorResponse, caught) => {
        let errMsg: string;
        if (errorResponse instanceof HttpErrorResponse) {
            const err = errorResponse.message || JSON.stringify(errorResponse.error);
            errMsg = `${errorResponse.status} - ${errorResponse.statusText || ''} Details: ${err}`;
        } else {
            errMsg = errorResponse.message ? errorResponse.message : errorResponse.toString();
        }
        return observableThrowError(errMsg) 
      })
    )  
  }
}


