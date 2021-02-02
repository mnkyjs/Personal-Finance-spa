import {Actions, Effect, ofType} from '@ngrx/effects';
import {ApiExtensionService} from '../../api/service/api-extension.service';
import {
  DELETE_TRANSACTION,
  DeleteTransaction,
  LOAD_TRANSACTIONS_WITH_DATE_RANGE,
  LoadTransactionWithDateRange
} from './transaction.actions';
import {concatMap, map, switchMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class TransactionEffects {
  constructor(private actions$: Actions, private service: ApiExtensionService) {
  }

  @Effect({dispatch: false})
  deleteTransaction = this.actions$.pipe(
    ofType(DELETE_TRANSACTION),
    switchMap((action: DeleteTransaction) => this.service.deleteTransaction(action.transactionId))
  );

  @Effect({dispatch: false})
  getTransactionViaPeriod = this.actions$.pipe(
    ofType(LOAD_TRANSACTIONS_WITH_DATE_RANGE),
    tap((action: LoadTransactionWithDateRange) => this.service.loadTransactions(action.period))
  );
}
