import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { appRoutes } from './app.routes';
import { endpointInterceptor } from '@e-ticaret/shared/interceptors/endpoint-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([endpointInterceptor])
    )
  ],
};