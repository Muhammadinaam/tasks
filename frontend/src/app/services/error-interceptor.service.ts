import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap, retry, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  

  constructor(private auth: AuthService) { }

  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.auth.logout();
          return throwError(error);
        } else if(error.status === 422) {
          console.log(error);
          let message = error.error.message;
          Object.keys(error.error['errors']).forEach(errorKey => {
            error.error['errors'][errorKey].forEach(errorMessage => {
              message += ' ' + errorMessage;
            });
          });
          alert(message);
          return throwError(error);
        } else if(error.status === 404) {
          alert('404 - Not found');
          return throwError(error);
        }
        else {
          alert(error.error.message);
          return throwError(error);
        }
      })
    ); 
      
      

  }
}
