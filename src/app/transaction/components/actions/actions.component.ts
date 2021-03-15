import {Component, OnInit} from '@angular/core';
import {TransactionStoreService} from '../../store/transaction-store.service';
import {Observable} from 'rxjs';
import {TransactionDto} from '../../../api/service/personal-finance-api.service';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  transaction$: Observable<TransactionDto> = this._ts.selectedTransaction$;

  constructor(private _ts: TransactionStoreService, private _bottomSheetRef: MatBottomSheetRef<ActionsComponent>) {
  }

  ngOnInit(): void {
  }

  showDetails(): void {
    this.dismiss();
  }

  edit(): void {
    this.dismiss();
  }

  delete(transaction: TransactionDto): void {
    if (confirm(`${transaction.title} wirklich löschen?`)) {
      this._ts.removeTransaction(transaction);
      this.dismiss();
    }
  }

  dismiss(): void {
    this._bottomSheetRef.dismiss();
  }
}
