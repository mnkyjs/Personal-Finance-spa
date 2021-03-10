import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  CategorieDto,
  TransactionDto,
  TransactionTypeEnum,
} from '../../../api/service/personal-finance-api.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {TransactionStoreService} from '../../store/transaction-store.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  transactionForChartView: TransactionDto[];
  @Input() categories: CategorieDto[];

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
    {
      // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];

  barChartData: ChartDataSets[] = [
    {data: [], label: 'Einnahmen'},
    {data: [], label: 'Ausgaben'},
  ];

  constructor(private store: TransactionStoreService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lineChart();
  }

  ngOnInit(): void {

  }

  private lineChart(): void {
    this.store.transaction$.subscribe(transactions => {
      transactions.map(transaction => {
        if (transaction.transactionType === TransactionTypeEnum.Einnahmen) {
          if (this.barChartData[0].data.length > 0) {
            this.barChartData[0].data.push(
              (this.barChartData[0]?.data.slice(-1)[0] as number) +
              transaction.value
            );
          } else {
            this.barChartData[0].data.push(transaction.value);
          }
          this.barChartLabels.push(
            transaction.date.toLocaleString('de-De').slice(0, 9)
          );
        }

        if (transaction.transactionType === TransactionTypeEnum.Ausgaben) {
          if (this.barChartData[1].data.length > 0) {
            this.barChartData[1].data.push(
              (this.barChartData[1]?.data.slice(-1)[0] as number) +
              transaction.value * -1
            );
          } else {
            this.barChartData[1].data.push(transaction.value * -1);
          }
          if (this.barChartData[0].data.length > 0) {
            const value = this.barChartData[0].data?.slice(-1)[0] as number;
            this.barChartData[0].data.push(value + transaction.value);
          }
          this.barChartLabels.push(
            transaction.date.toLocaleString('de-De').slice(0, 9)
          );
        }
      });
    });
  }
}
