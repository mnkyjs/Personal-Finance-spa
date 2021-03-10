import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  CategorieDto,
  DateRangeDto,
  TransactionDto,
  TransactionTypeEnum,
} from '../../../api/service/personal-finance-api.service';
import {ApiExtensionService} from '../../../api/service/api-extension.service';
import {TransactionStoreService} from '../../store/transaction-store.service';
import {NotificationService} from '../../../shared/services/notification.service';
import {CategoryStoreService} from '../../../category/store/category-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  transactionInputForm: FormGroup;
  selectInputForm: FormGroup;
  categories: CategorieDto[];
  transactions$ = this._tStore.transaction$;
  categories$ = this._cStore.categories$;
  totalBalance = 0;

  startDateForView = new Date(new Date().getFullYear(), 0, 1);
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
    private _formBuilder: FormBuilder,
    private _financeApiService: ApiExtensionService,
    private _notificationService: NotificationService,
    private _tStore: TransactionStoreService,
    private _cStore: CategoryStoreService
  ) {
    this.transactions$.subscribe(res => {
      this.totalBalance = 0;
      res.map(data => {
        this.totalBalance += data.value;
      });
    });
  }

  ngOnInit(): void {
    this.transactionInputForm = this._formBuilder.group({
      transactionType: ['', Validators.required],
      categoryId: ['', Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', null],
    });
    this.selectInputForm = this._formBuilder.group({
      start: [this.startDateForView, Validators.required],
      end: [this.endDayForView, Validators.required],
    });
  }

  deleteTransaction(transaction: TransactionDto): void {
    if (confirm(`${transaction.title} wirklich löschen?`)) {
      this._tStore.removeTransaction(transaction);
      this._notificationService.showSuccess('Eintrag gelöscht');
    }
  }

  submit(): void {
    const transactionEntity = {
      ...this.transactionInputForm.value,
    } as TransactionDto;
    if (transactionEntity.transactionType === TransactionTypeEnum.Ausgaben) {
      transactionEntity.value *= -1;
    }
    this._tStore.addTransactions(transactionEntity);
    this._notificationService.showSuccess('Eintrag gespeichert');
    this.resetForm();
  }

  updateCalc(event): void {
    if (event.value !== null) {
      this.startDateForView = this.selectInputForm.get('start').value;

      this.endDayForView = this.selectInputForm.get('end').value;

      this._financeApiService
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

  getCategoryName(id: number): string {
    return this.categories?.find(item => item.id === id).name;
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
    this.transactions$.subscribe(data => {
      if (data) {
        data.map(value => years.push(value.date.getFullYear()));
        data.map(value => months.push(value.date.getMonth()));
      }
    });
    return [...new Set(years), ...new Set(months)];
  }
}
