import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    CategorieDto,
    DateRangeDto,
    TransactionDto,
    TransactionTypeEnum,
} from '../../../api/service/personal-finance-api.service';
import { ApiExtensionService } from '../../../api/service/api-extension.service';
import { TransactionStoreService } from '../../store/transaction-store.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { CategoryStoreService } from '../../../category/store/category-store.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActionsComponent } from '../actions/actions.component';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TransactionGroup } from '../../models/transaction-group';
import { MatDialog } from '@angular/material/dialog';
import { InputComponent } from '../input/input.component';
import { DialogBoxComponent } from '../../../shared/components/dialog-box/dialog-box.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
    transactions: TransactionDto[] = [];
    categories: CategorieDto[] = [];
    groupedByDate: TransactionGroup[] = [];
    totalBalance = 0;
    keys = Object.keys;
    transactionTypes = TransactionTypeEnum;
    availableMonths = [] as number[];
    availableYears = [] as number[];
    private _destroy$ = new Subject();

    constructor(
        public dialog: MatDialog,
        private _apiExtensionService: ApiExtensionService,
        private _notificationService: NotificationService,
        private _transactionStoreService: TransactionStoreService,
        private _categoryStoreService: CategoryStoreService,
        private _formBuilder: FormBuilder,
        private _matBottomSheet: MatBottomSheet,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this._transactionStoreService.transaction$.pipe(takeUntil(this._destroy$)).subscribe((res) => {
            this.totalBalance = 0;
            res.map((data) => {
                this.totalBalance += data.value;
            });
            if (res.length > 0) {
                this.setTransactions(res);
            }
        });

        this._categoryStoreService.categories$.pipe(takeUntil(this._destroy$)).subscribe((res) => {
            if (res?.length > 0) {
                this.setCategories(res);
            }
        });
    }

    setCategories(data: CategorieDto[]): void {
        this.categories = data;
        this._changeDetectorRef.markForCheck();
    }

    setTransactions(data: TransactionDto[]): void {
        this.transactions = data.reverse();
        this._changeDetectorRef.markForCheck();
    }

    getCategoryName(id: number): string {
        return this.categories?.find((item) => item.id === id)?.name;
    }

    trackByFn(item): number {
        return item.id;
    }

    openBottomSheet(transaction: TransactionDto): void {
        this._transactionStoreService.selectTransaction(transaction);
        this._matBottomSheet.open(ActionsComponent);
    }

    openDateRangeDialog(): void {
        const dialogRef = this.dialog.open(DialogBoxComponent, {
            data: {
                action: 'dateRange',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
        });
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
            this.groupedByDate.push({ date: mapElement[0], transactions: mapElement[1] });
        }
        this.groupedByDate.reverse().map((value) => value.transactions.reverse());
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
