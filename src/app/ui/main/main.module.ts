import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {LandingComponent} from './landing/landing.component';
import {SharedModule} from "../../shared/shared.module";


const modules = [
  CommonModule,
  MainRoutingModule,
  SharedModule
]

@NgModule({
  declarations: [LandingComponent],
  imports: [...modules]
})
export class MainModule {
}
