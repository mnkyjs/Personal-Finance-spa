import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { API_BASE_URL } from './shared/api/service/personal-finance-api.service';
import { SharedModule } from './shared/shared.module';
import { ApiModule } from './shared/api/api.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './ui/main/main.module';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { httpInterceptors } from './shared/interceptors/httpInterceptors';
import { MAT_DATE_LOCALE } from '@angular/material/core';

const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  AppRoutingModule,
  ApiModule,
  SharedModule,
  MainModule,
  JwtModule.forRoot({
    config: {
      tokenGetter,
      allowedDomains: [`${environment.apiFix}`],
      disallowedRoutes: [`${environment.apiFix}/api/auth`],
    },
  }),
];

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [...modules],
  providers: [
    ...httpInterceptors,
    { provide: API_BASE_URL, useValue: environment.apiUrl },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
