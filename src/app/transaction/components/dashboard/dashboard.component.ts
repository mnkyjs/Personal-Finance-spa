import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  CategorieDto,
  DateRangeDto,
  TransactionDto,
  TransactionTypeEnum,
} from '../../../api/service/personal-finance-api.service';
import {AlertService} from '../../../shared/services/alert.service';
import {ApiExtensionService} from '../../../api/service/api-extension.service';
import {Observable} from 'rxjs';
import {TransactionStoreService} from '../../store/transaction-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transactionInputForm: FormGroup;
  selectInputForm: FormGroup;
  categories: CategorieDto[];
  transactions$ = this.tStore.transaction$;
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
    private formBuilder: FormBuilder,
    private financeApiService: ApiExtensionService,
    private alertService: AlertService,
    private tStore: TransactionStoreService,
  ) {
    this.transactions$.subscribe(res => {
      this.totalBalance = 0;
      res.map(data => {
        this.totalBalance += data.value;
      });
    });
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
  }

  deleteTransaction(transaction: TransactionDto): void {
    if (confirm(`${transaction.title} wirklich löschen?`)) {
      this.tStore.removeTransaction(transaction);
      this.alertService.success('Eintrag gelöscht');
    }
  }

  submit(): void {
    const transactionEntity = {
      ...this.transactionInputForm.value,
    } as TransactionDto;
    if (transactionEntity.transactionType === TransactionTypeEnum.Expense) {
      transactionEntity.value *= -1;
    }
    this.tStore.addTransactions(transactionEntity);
    this.alertService.success('Eintrag gespeichert');
    this.resetForm();
  }

  updateCalc(event): void {
    if (event.value !== null) {
      this.startDateForView = this.selectInputForm.get('start').value;

      this.endDayForView = this.selectInputForm.get('end').value;

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
