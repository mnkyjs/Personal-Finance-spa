import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {MaterialModule} from '../shared/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const modules = [
  CommonModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
  AuthRoutingModule
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [...modules]
})
export class AuthModule {
}
