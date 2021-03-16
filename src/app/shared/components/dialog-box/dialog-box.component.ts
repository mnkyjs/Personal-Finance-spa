import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategorieDto, DateRangeDto } from '../../../api/service/personal-finance-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiExtensionService } from '../../../api/service/api-extension.service';
import { TransactionStoreService } from '../../../transaction/store/transaction-store.service';

@Component({
    selector: 'app-dialog-box',
    templateUrl: './dialog-box.component.html',
    styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent {
    action: string;
    endDayForView = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    localData: any;
    selectInputForm: FormGroup;
    startDateForView = new Date(new Date().getFullYear(), 0, 1);
    totalBalance = 0;

    constructor(
        public dialogRef: MatDialogRef<DialogBoxComponent>,
        // @Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private _apiExtensionService: ApiExtensionService,
        private _transactionStoreService: TransactionStoreService
    ) {
        this.localData = { ...data };
        this.action = this.localData.action;
        if (this.localData.action === 'dateRange') {
            this.selectInputForm = this._formBuilder.group({
                start: [this.startDateForView, Validators.required],
                end: [this.endDayForView, Validators.required],
            });
        }
    }

    closeDialog(): void {
        this.dialogRef.close({ event: 'Cancel' });
    }

    doAction(): void {
        if (this.localData.action === 'dateRange') {
            this.updateCalc();
        } else {
            this.dialogRef.close({ event: this.action, data: this.localData });
        }
    }

    updateCalc(): void {
        this.startDateForView = this.selectInputForm.get('start').value;
        this.endDayForView = this.selectInputForm.get('end').value;
        this._transactionStoreService.loadTransactions({
            startDate: this.startDateForView,
            endDate: this.endDayForView,
        } as DateRangeDto);
        this.dialogRef.close();
    }
}
