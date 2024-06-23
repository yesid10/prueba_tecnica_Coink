import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import {  arrowBackOutline, chevronBackOutline, documentTextOutline } from 'ionicons/icons';


if (environment.production) {
  enableProdMode();
}

addIcons({
  'chevron-back-outline': chevronBackOutline,
  'arrow-back-outline': arrowBackOutline,
  'document-text-outline': documentTextOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),

  ],
});
