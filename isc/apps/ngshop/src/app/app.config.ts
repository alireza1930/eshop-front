import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations'
import {provideHttpClient, withFetch} from "@angular/common/http";
import {MessageService} from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideAnimations(),
    provideHttpClient(withFetch()), MessageService],



};
