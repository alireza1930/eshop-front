import { ApplicationConfig, importProvidersFrom } from "@angular/core"
import { provideRouter } from '@angular/router'
import { appRoutes } from './app.routes'
import { provideHttpClient, withFetch } from "@angular/common/http"
import { ConfirmationService, MessageService } from "primeng/api"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(appRoutes),
      provideHttpClient(withFetch()),
      MessageService,
      ConfirmationService,
      importProvidersFrom(BrowserAnimationsModule)]
}
