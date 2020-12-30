import { Component, Input, OnInit } from '@angular/core';
import {
  CategorieDto,
  TransactionDto,
  TransactionTypeEnum,
} from '../../../shared/api/service/personal-finance-api.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  transactionForChartView: TransactionDto[];

  @Input() transactions: TransactionDto[];
  @Input() categories: CategorieDto[];
  @Input() transactionType: TransactionTypeEnum;

  transactionTypeEnum = TransactionTypeEnum;
  chartCategories: string[] = [];
  chartCategoriesAmount: number[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[];

  constructor() {}

  ngOnInit(): void {
    this._prepareTransactionArray();
    this._prepareDataForChart();

    this.barChartLabels = this.chartCategories;
    this.barChartData = [
      {
        data: this.chartCategoriesAmount,
        label:
          this.transactionType === TransactionTypeEnum.Income
            ? 'Einnahmen'
            : 'Ausgaben',
        backgroundColor:
          this.transactionType === TransactionTypeEnum.Income
            ? '#66BB6A'
            : '#ef5350',
      },
    ];
  }

  private _prepareTransactionArray(): void {
    switch (this.transactionType) {
      case TransactionTypeEnum.Income:
        this.transactionForChartView = [
          ...this.transactions?.filter(
            (t) => t.transactionType === TransactionTypeEnum.Income
          ),
        ];
        break;

      case TransactionTypeEnum.Expense:
        this.transactionForChartView = [
          ...this.transactions?.filter(
            (t) => t.transactionType === TransactionTypeEnum.Expense
          ),
        ];
        break;

      default:
        break;
    }
  }

  private _prepareDataForChart(): void {
    const tempCategories: string[] = [];
    const tempAmounts: number[] = [];
    let currentAmount = 0;
    let sortedArray = [
      ...this.transactionForChartView.sort((a, b) =>
        a.categoryId > b.categoryId ? 1 : -1
      ),
    ];
    let currentCategoryId = [...sortedArray]?.shift().categoryId;

    for (const transaction of sortedArray) {
      if (transaction.categoryId === currentCategoryId) {
        tempCategories.indexOf(
          this.categories.find((c) => c.id === transaction.categoryId).name
        ) === -1 &&
          tempCategories.push(
            this.categories.find((c) => c.id === transaction.categoryId).name
          );
        currentAmount += transaction.value;
      } else {
        tempAmounts.push(currentAmount);
        tempCategories.indexOf(
          this.categories.find((c) => c.id === transaction.categoryId).name
        ) === -1 &&
          tempCategories.push(
            this.categories.find((c) => c.id === transaction.categoryId).name
          );
        currentCategoryId = transaction.categoryId;
        currentAmount = 0;
        currentAmount += transaction.value;
      }

      if (transaction === sortedArray[sortedArray.length - 1]) {
        tempAmounts.push(currentAmount);
      }
    }

    this.chartCategoriesAmount = tempAmounts;
    this.chartCategories = tempCategories;
  }
}
