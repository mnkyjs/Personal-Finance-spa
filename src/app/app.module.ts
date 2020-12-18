import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './shared/auth/components/login/login.component';
import {RegisterComponent} from './shared/auth/components/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./shared/auth/tools/token.interceptor";
import {API_BASE_URL, FinanceApiService} from "./shared/api/service/personal-finance-api.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import {ApiModule} from "./shared/api/api.module";


const modules = [
  BrowserModule,
  HttpClientModule,
  AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  ApiModule,
  SharedModule
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [...modules],
  providers: [
    {provide: API_BASE_URL, useValue: 'http://localhost:6025'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
