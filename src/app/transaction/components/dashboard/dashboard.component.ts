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
  selectInputForm: FormGroup;
  categories: CategorieDto[];
  transactions$ = this._tStore.transaction$;
  totalBalance = 0;
  keys = Object.keys;
  transactionTypes = TransactionTypeEnum;
  startDateForView = new Date(new Date().getFullYear(), 0, 1);
  endDayForView = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  availableMonths = [] as number[];
  availableYears = [] as number[];


  constructor(
    private _financeApiService: ApiExtensionService,
    private _notificationService: NotificationService,
    private _tStore: TransactionStoreService,
    private _cStore: CategoryStoreService,
    private _formBuilder: FormBuilder
  ) {
    this.transactions$.subscribe(res => {
      this.totalBalance = 0;
      res.map(data => {
        this.totalBalance += data.value;
      });
    });
  }

  ngOnInit(): void {
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
