import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  ApiException,
  CategorieDto,
  DateRangeDto,
  FinanceApiService,
  TransactionDto,
  TransactionTypeEnum,
} from '../../../api/service/personal-finance-api.service';
import {AlertService} from '../../../shared/services/alert.service';
import {ApiExtensionService} from '../../../api/service/api-extension.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {getTransactionsSelector} from '../../store/transaction.store';
import {LoadTransactionWithDateRange} from '../../store/transaction.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transactionInputForm: FormGroup;
  selectInputForm: FormGroup;
  categories: CategorieDto[];
  dbTransactions$: Observable<TransactionDto[]>;
  totalBalance = 0;

  startDateForView = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  endDayForView = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  availableMonths = [] as number[];
  availableYears = [] as number[];

  keys = Object.keys;
  transactionTypes = TransactionTypeEnum;

  constructor(
    private formBuilder: FormBuilder,
    private financeApiService: ApiExtensionService,
    private alertService: AlertService,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.transactionInputForm = this.formBuilder.group({
      transactionType: ['', Validators.required],
      categoryId: ['', Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', null],
    });

    this.selectInputForm = this.formBuilder.group({
      start: [this.startDateForView, Validators.required],
      end: [this.endDayForView, Validators.required],
    });

    this.financeApiService.getAllCategories().subscribe((value) => {
      if (value) {
        this.categories = value;
      }
    });

    this.store.dispatch(new LoadTransactionWithDateRange({
      startDate: this.startDateForView,
      endDate: this.endDayForView,
    } as DateRangeDto));

    this.dbTransactions$ = this.store
      .select(getTransactionsSelector)
      .pipe(tap(state => console.log(state)));

    this.financeApiService
      .getAllTransactionsInDateRange(
        {
          startDate: this.startDateForView,
          endDate: this.endDayForView,
        } as DateRangeDto
      )
      .subscribe((value) => {
        if (value) {
          value.map((transaction) => {
            this.totalBalance += transaction.value;
          });
        }
      });
  }

  deleteTransaction(transaction: TransactionDto): void {
    if (confirm(`${transaction.title} wirklich löschen?`)) {
      this.financeApiService.deleteTransaction(transaction.id).subscribe((value) => {
        this.alertService.success('Eintrag gelöscht');
      });
    }
  }

  submit(): void {
    const transactionEntity = {
      ...this.transactionInputForm.value,
    } as TransactionDto;
    transactionEntity.date.setHours(transactionEntity.date.getHours() + 2);
    if (transactionEntity.transactionType === TransactionTypeEnum.Expense) {
      transactionEntity.value *= -1;
    }
    this.financeApiService.postTransaction(transactionEntity).subscribe((value) => {
      if (value) {
        this.alertService.success('Eintrag gespeichert');
        this.resetForm();
      }
    });
  }

  updateCalc(event): void {
    if (event.value !== null) {
      this.startDateForView = this.selectInputForm.get('start').value;
      this.startDateForView.setHours(this.startDateForView.getHours() + 1);

      this.endDayForView = this.selectInputForm.get('end').value;
      this.endDayForView.setHours(this.endDayForView.getHours() + 1);

      this.financeApiService
        .getAllTransactionsInDateRange(
          {
            startDate: this.startDateForView,
            endDate: this.endDayForView,
          } as DateRangeDto
        )
        .subscribe((value) => {
          if (value) {
            value.map((transaction) => {
              this.totalBalance += transaction.value;
            });
          }
        });
    }
  }

  resetForm(): void {
    this.transactionInputForm.reset();
  }

  trackByFn(item): number {
    return item.id;
  }

  private _getYearAndMonthFromEntries(): number[] {
    const years = [] as number[];
    const months = [] as number[];
    this.dbTransactions$.subscribe(data => {
      if (data) {
        data.map(value => years.push(value.date.getFullYear()));
        data.map(value => months.push(value.date.getMonth()));
      }
    });
    return [...new Set(years), ...new Set(months)];
  }
}
