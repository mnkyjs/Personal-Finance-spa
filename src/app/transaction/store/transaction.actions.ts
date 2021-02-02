import {Action} from '@ngrx/store';
import {DateRangeDto, TransactionDto} from '../../api/service/personal-finance-api.service';

export const LOAD_TRANSACTIONS = '[transaction] load transactions';
export const LOAD_TRANSACTIONS_WITH_DATE_RANGE = '[transaction] load transactions with date range';
export const WAIT_FOR_TRANSACTIONS = '[transaction] wait for transactions';
export const DELETE_TRANSACTION = '[transaction] delete transaction';

export class LoadTransactions implements Action {
  readonly type = LOAD_TRANSACTIONS;

  constructor(public transactions: TransactionDto[]) {
  }
}

export class LoadTransactionWithDateRange implements Action {
  readonly type = LOAD_TRANSACTIONS_WITH_DATE_RANGE;

  constructor(public period: DateRangeDto) {
  }
}

export class WaitForTransactions implements Action {
  readonly type = WAIT_FOR_TRANSACTIONS;
}

export class DeleteTransaction implements Action {
  readonly type = DELETE_TRANSACTION;

  constructor(public transactionId: number) {
  }
}

export type TransactionActions =
  LoadTransactions |
  LoadTransactionWithDateRange |
  WaitForTransactions |
  DeleteTransaction;
