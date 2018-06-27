import { HttpEvent, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, throwError  } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor() {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
       catchError((errorResponse, caught) => {
        let errMsg = "Something bad happened; please try again later." ;
        if (errorResponse instanceof HttpErrorResponse) {
            if (errorResponse.error) {
              errMsg = errorResponse.error.errors ;
            } else {
              const err = errorResponse.message || JSON.stringify(errorResponse.error);
              errMsg = `${errorResponse.status} - ${errorResponse.statusText || ''} Details: ${err}`;
            }
        } else {
            errMsg = errorResponse.message ? errorResponse.message : errorResponse.toString();
        }
        return throwError(errMsg)
      })
    )  
  }
}