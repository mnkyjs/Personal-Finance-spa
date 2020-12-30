import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material.module';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';

const modules = [
  CommonModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
  SharedRoutingModule,
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, DialogBoxComponent],
  imports: [...modules],
  exports: [...modules],
  providers: [AuthService],
})
export class SharedModule {}
