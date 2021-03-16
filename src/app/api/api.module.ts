import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceApiService } from './service/personal-finance-api.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [FinanceApiService],
})
export class ApiModule {}
