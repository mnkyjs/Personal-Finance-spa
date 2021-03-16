import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionDto, TransactionTypeEnum } from '../../../api/service/personal-finance-api.service';
import { TransactionStoreService } from '../../store/transaction-store.service';
import { CategoryStoreService } from '../../../category/store/category-store.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
    transactionInputForm: FormGroup;

    categories$ = this._categoryStoreService.categories$;
    keys = Object.keys;
    transactionTypes = TransactionTypeEnum;

    constructor(
        private _formBuilder: FormBuilder,
        private _transactionStoreService: TransactionStoreService,
        private _categoryStoreService: CategoryStoreService,
        private _notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.transactionInputForm = this._formBuilder.group({
            transactionType: ['', Validators.required],
            categoryId: ['', Validators.required],
            value: ['', Validators.required],
            date: ['', Validators.required],
            title: ['', Validators.required],
            description: ['', null],
        });
    }

    submit(): void {
        const transactionEntity = {
            ...this.transactionInputForm.value,
        } as TransactionDto;
        if (transactionEntity.transactionType === TransactionTypeEnum.Ausgaben) {
            transactionEntity.value *= -1;
        }
        this._transactionStoreService.addTransactions(transactionEntity);
        this.resetForm();
    }

    resetForm(): void {
        this.transactionInputForm.reset();
    }
}
