import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { marker as gettext } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import dayjs from 'dayjs';
import { ToastrModule } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

import { AppComponent } from '~/app/app.component';
import { AppRoutingModule } from '~/app/app-routing.module';
import { CoreModule } from '~/app/core/core.module';
import { setTranslationService, translate, TranslateHttpLoader } from '~/app/i18n.helper';
import { MaterialModule } from '~/app/material.module';
import { HttpErrorInterceptorService } from '~/app/shared/services/http-error-interceptor.service';
import { LocaleService } from '~/app/shared/services/locale.service';
import { SharedModule } from '~/app/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    SharedModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      preventDuplicates: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient]
      }
    }),
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (translateService: TranslateService) => () => {
        // Make translation service globally available to be able to use
        // it where DI is not possible.
        setTranslationService(translateService);
        // Setup translation service. Delay app bootstrapping until
        // translation file has been loaded.
        translateService.setDefaultLang('en_GB');
        return translateService
          .use(LocaleService.getLocale())
          .pipe(
            tap(() => {
              // Translate various day.js locale strings.
              dayjs.locale('en', {
                relativeTime: {
                  /* eslint-disable @typescript-eslint/naming-convention */
                  future: translate(gettext('in %s')),
                  past: translate(gettext('%s ago')),
                  s: translate(gettext('a few seconds')),
                  m: translate(gettext('a minute')),
                  mm: translate(gettext('%d minutes')),
                  h: translate(gettext('an hour')),
                  hh: translate(gettext('%d hours')),
                  d: translate(gettext('a day')),
                  dd: translate(gettext('%d days')),
                  M: translate(gettext('a month')),
                  MM: translate(gettext('%d months')),
                  y: translate(gettext('a year')),
                  yy: translate(gettext('%d years'))
                }
              });
            })
          )
          .toPromise();
      },
      multi: true,
      deps: [TranslateService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
