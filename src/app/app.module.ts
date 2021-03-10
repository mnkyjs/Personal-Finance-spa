import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {API_BASE_URL} from './api/service/personal-finance-api.service';
import {SharedModule} from './shared/shared.module';
import {ApiModule} from './api/api.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {httpInterceptors} from './shared/interceptors/httpInterceptors';
import {MainNavigationComponent} from './main-navigation/main-navigation.component';
import localeDe from '@angular/common/locales/de';
import {registerLocaleData} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {GlobalErrorHandler} from './shared/handlers/global-error-handler';

registerLocaleData(localeDe);

const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  AppRoutingModule,
  ApiModule,
  SharedModule.forRoot(),
  JwtModule.forRoot({
    config: {
      tokenGetter,
      allowedDomains: [`${environment.apiFix}`],
      disallowedRoutes: [`${environment.apiFix}/api/auth`],
    },
  }),
];

const provider = [
  {provide: ErrorHandler, useClass: GlobalErrorHandler},
  {provide: API_BASE_URL, useValue: environment.apiUrl},
  {provide: LOCALE_ID, useValue: 'de'}
];

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent, MainNavigationComponent, FooterComponent],
  imports: [...modules],
  providers: [
    ...httpInterceptors,
    ...provider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
