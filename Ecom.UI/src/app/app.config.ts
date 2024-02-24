import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([errorInterceptor])),provideRouter(routes), provideClientHydration()]
};

// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
// import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
// import { errorInterceptor } from './core/interceptors/error.interceptor';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideHttpClient(
//       withInterceptors([
//         errorInterceptor // Add the interceptor here
//       ])
//     ),
//     provideRouter(routes),
//     provideClientHydration(),
//   ],
// };

// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
// import { provideHttpClient, withFetch } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [provideHttpClient(withFetch()),provideRouter(routes), provideClientHydration()]
// };
