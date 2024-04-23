import {ApplicationConfig, importProvidersFrom} from "@angular/core"
import {provideRouter} from '@angular/router'
import {appRoutes} from './app.routes'
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from "@angular/common/http"
import {ConfirmationService, MessageService} from "primeng/api"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {JwtInterceptor} from "@isc/users";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes),
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    provideHttpClient(withFetch()),
    MessageService,
    ConfirmationService,
    importProvidersFrom(BrowserAnimationsModule)]
}
