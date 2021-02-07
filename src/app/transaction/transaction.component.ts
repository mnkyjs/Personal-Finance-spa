import {Component, OnInit} from '@angular/core';
import {TransactionStoreService} from './store/transaction-store.service';
import {Observable} from 'rxjs';
import {TransactionDto} from '../api/service/personal-finance-api.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
})
export class TransactionComponent {
  constructor() {

  }

}
