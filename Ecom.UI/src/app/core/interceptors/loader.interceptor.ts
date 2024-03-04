// import { HttpInterceptorFn } from '@angular/common/http';

// export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };


import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';
import { LoaderService } from '../loader.service';

@Injectable()
export class loaderInterceptor implements HttpInterceptor {
  constructor(private _LoaderService: LoaderService){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._LoaderService.loader()
    return next.handle(req).pipe(
      delay(1000),
      finalize(()=>{
        this._LoaderService.hidingLoader();
      })
    );
  }
}