import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsModule} from 'ng2-charts';
import {TransactionRoutingModule} from './transaction-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MaterialModule} from '../shared/material.module';
import {SharedModule} from '../shared/shared.module';
import {ChartComponent} from './components/chart/chart.component';
import {TransactionComponent} from './transaction.component';
import {StoreModule} from '@ngrx/store';
import {transactionStoreName} from './store/transaction.store';
import {transactionsReducer} from './store/transaction.reducer';
import {TransactionEffects} from './store/transaction.effects';
import {EffectsModule} from '@ngrx/effects';

const modules = [
  CommonModule,
  TransactionRoutingModule,
  MaterialModule,
  SharedModule,
  ChartsModule,
  StoreModule.forFeature(transactionStoreName, transactionsReducer),
  EffectsModule.forFeature([TransactionEffects])
];

@NgModule({
  declarations: [DashboardComponent, ChartComponent, TransactionComponent],
  imports: [...modules],
  exports: [ChartComponent],
})
export class TransactionModule {
}
