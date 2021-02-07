import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TransactionComponent} from './transaction.component';
import {ChartComponent} from './components/chart/chart.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'chart',
        component: ChartComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {
}
