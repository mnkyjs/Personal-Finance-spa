import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./auth/service/auth.service";


const modules = [
  CommonModule,
  SharedRoutingModule,
]

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers:[AuthService]
})
export class SharedModule {
}
