import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ActionsComponent} from '../actions/actions.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TransactionGroup} from "../../models/transaction-group";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  transactions: TransactionDto[] = [];
  categories: CategorieDto[] = [];
  groupedByDate: TransactionGroup[] = [];
  selectInputForm: FormGroup;
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
  private _destroy$ = new Subject();

  constructor(
    private _financeApiService: ApiExtensionService,
    private _notificationService: NotificationService,
    private _tStore: TransactionStoreService,
    private _cStore: CategoryStoreService,
    private _formBuilder: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    private _cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this._tStore.transaction$
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        this.totalBalance = 0;
        res.map(data => {
          this.totalBalance += data.value;
        });
        if (res.length > 0) {
          this.setTransactions(res);
        }
      });

    this._cStore.categories$
      .pipe(takeUntil(this._destroy$))
      .subscribe((res) => {
        if (res?.length > 0) {
          this.setCategories(res);
        }
      });

    this.selectInputForm = this._formBuilder.group({
      start: [this.startDateForView, Validators.required],
      end: [this.endDayForView, Validators.required],
    });
  }

  setCategories(data: CategorieDto[]): void {
    this.categories = data;
    this._cdr.markForCheck();
  }

  setTransactions(data: TransactionDto[]): void {
    this.transactions = data.reverse();
    this._cdr.markForCheck();
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
    return this.categories?.find(item => item.id === id)?.name;
  }

  trackByFn(item): number {
    return item.id;
  }

  openBottomSheet(transaction: TransactionDto): void {
    this._tStore.selectTransaction(transaction);
    this._bottomSheet.open(ActionsComponent);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }



  /* Group all transaction via date and return a new array */
  groupBy(): void {
    const map = new Map();
    for (const transaction of this.transactions) {
      const collection = map.get(transaction.date);
      if (!collection) {
        map.set(transaction.date, [transaction]);
      } else {
        collection.push(transaction);
      }
    }
    for (const mapElement of map) {
      this.groupedByDate.push({date: mapElement[0], transactions: mapElement[1]});
    }
    this.groupedByDate.reverse().map(value => value.transactions.reverse());
  }


  private _getYearAndMonthFromEntries(): number[] {
    const years = [] as number[];
    const months = [] as number[];
    for (const transaction of this.transactions) {
      years.push(transaction.date.getFullYear());
      months.push(transaction.date.getMonth());
    }
    return [...new Set(years), ...new Set(months)];
  }
}
