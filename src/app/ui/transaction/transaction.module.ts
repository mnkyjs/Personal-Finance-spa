import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { TransactionRoutingModule } from './transaction-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from "../../shared/shared.module";
import { ChartComponent } from './chart/chart.component';

const modules = [CommonModule, TransactionRoutingModule, MaterialModule, SharedModule, ChartsModule];

@NgModule({
  declarations: [DashboardComponent, ChartComponent],
  imports: [...modules],
  exports: [ChartComponent],
})
export class TransactionModule {}
