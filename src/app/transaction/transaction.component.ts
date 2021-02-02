import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {WaitForTransactions} from './store/transaction.actions';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
})
export class TransactionComponent {

  constructor(private store: Store) {
    this.store.dispatch(new WaitForTransactions());
  }

}
