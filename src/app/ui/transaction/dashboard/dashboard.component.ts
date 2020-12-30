import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  CategorieDto,
  DateRangeDto,
  FinanceApiService,
  TransactionDto,
  TransactionTypeEnum,
} from "../../../shared/api/service/personal-finance-api.service";
import { AlertService } from "../../../shared/services/alert.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transactionInputForm: FormGroup;
  selectInputForm: FormGroup;
  categories: CategorieDto[];
  dbTransactions: TransactionDto[];
  totalBalance = 0;

  startDateForView = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  endDayForView = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  availableMonths = [] as number[];
  availableYears = [] as number[];

  keys = Object.keys;
  transactionTypes = TransactionTypeEnum;

  constructor(private _fb: FormBuilder, private _apiService: FinanceApiService, private _alert: AlertService) {
  }

  ngOnInit(): void {
    this.transactionInputForm = this._fb.group({
      transactionType: ['', Validators.required],
      categoryId: ['', Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', null],
    });

    this.selectInputForm = this._fb.group({
      start: [this.startDateForView, Validators.required],
      end: [this.endDayForView, Validators.required],
    });

    this._apiService.getAllCategories().subscribe(value => {
      if (value) {
        this.categories = value;
      }
    });

    this._apiService.getAllTransactionsInDateRange(new DateRangeDto({
      startDate: this.startDateForView,
      endDate: this.endDayForView
    })).subscribe(value => {
      if (value) {
        this.dbTransactions = value;
        value.map(transaction => {
          switch (transaction.transactionType) {
            case TransactionTypeEnum.Expense:
              this.totalBalance -= transaction.value
              break;

            case TransactionTypeEnum.Income:
              this.totalBalance += transaction.value
              break;

            default:
              break;
          }
        });
      }
    })

  }

  deleteTransaction(transactionId: number) {
    this._apiService.deleteTransaction(transactionId).subscribe(value => {
      this._alert.success('Eintrag gelöscht');
    });
  }

  submit() {
    const transactionEntity = {...this.transactionInputForm.value} as TransactionDto;
    transactionEntity.date.setHours(transactionEntity.date.getHours() + 2);
    this._apiService.postTransaction(transactionEntity).subscribe(value => {
      if (value) {
        this._alert.success('Eintrag gespeichert');
        this.resetForm();
      }
    })
  }

  updateCalc(event) {
    if (event.value !== null) {
      this.startDateForView = this.selectInputForm.get('start').value;
      this.startDateForView.setHours(this.startDateForView.getHours() + 1)

      this.endDayForView = this.selectInputForm.get('end').value;
      this.endDayForView.setHours(this.endDayForView.getHours() + 1)

      this._apiService.getAllTransactionsInDateRange(new DateRangeDto({
        startDate: this.startDateForView,
        endDate: this.endDayForView,
      })).subscribe(value => {
        if (value) {
          this.dbTransactions = value;
          value.map(transaction => {
            this.totalBalance += transaction.value
          });
        }
      })
    }
  }

  resetForm() {
    this.transactionInputForm.reset();
  }

  trackByFn(item) {
    return item.id;
  }

  private _getYearsFromEntries(): number[] {

    const years = [] as number[];
    for (let i = 0; i < this.dbTransactions.length; i++) {
      years.push(this.dbTransactions[i].date.getFullYear());
    }
    return [...new Set(years)];
  }

  private _getYMonthsFromEntries(): number[] {

    const months = [] as number[];
    for (let i = 0; i < this.dbTransactions.length; i++) {
      months.push(this.dbTransactions[i].date.getMonth());
    }
    return [...new Set(months)];
  }
}
