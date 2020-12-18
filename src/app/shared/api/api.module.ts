import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FinanceApiService} from "./service/personal-finance-api.service";

const modules = [CommonModule]

const services = [FinanceApiService]

@NgModule({
  declarations: [],
  imports: [...modules],
  providers: [...services]
})
export class ApiModule {
}
