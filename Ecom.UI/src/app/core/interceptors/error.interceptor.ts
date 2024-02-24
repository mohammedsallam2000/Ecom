// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable()
// export class errorInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log('Test')
//     return next.handle(req).pipe(
//       catchError((error) => {
//         if (error.status === 404) {
//           alert(error.message);
//           // Handle 404 error navigation here if needed
//         } else if (error.status === 400) {
//           // Handle 400 errors
//           console.log("400")
//         } else if (error.status === 500) {
//           // Handle 500 errors
//         }
//         return throwError(()=>error.message || 'Server error');
//       })
//     );
//   }
// }



// Angular 17
import { HttpInterceptorFn } from '@angular/common/http';
import { Injector } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((err)=>{
     if(err){
      if(err.status === 404)
      {
        if(err.error.errors){
          throw err.error
        }
        else{
          alert(err.error.statusCode + ' '+err.error.message)
          const injector = Injector.create({providers: [{provide: Router, deps: []}]});
          const router = injector.get(Router);
          router.navigateByUrl('NotFound'); // Adjust the route as needed
        }

      }
      if(err.status === 400)
      {
        if(err.error.errors){
          throw err.error
        }
        else{
          alert(err.error.statusCode + ' '+err.error.message)
          const injector = Injector.create({providers: [{provide: Router, deps: []}]});
          const router = injector.get(Router);
          router.navigateByUrl('NotFound'); // Adjust the route as needed
        }
      }
      if(err.status === 500)
      {
      //
      alert(err.error.statusCode + ' '+err.error.message)
      }
     }
     return throwError(()=>err.message || 'Server not found!');
  }));
};
