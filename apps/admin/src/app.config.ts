import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import localeTr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';

registerLocaleData(localeTr);

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), 
    provideRouter(appRoutes),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideNgxMask(),  
    { provide: LOCALE_ID, useValue: 'tr' }
  ],
};
