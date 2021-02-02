import {initialTransactionState, ITransactionState, transactionEntityAdapter} from './transaction.store';
import {DELETE_TRANSACTION, LOAD_TRANSACTIONS, LOAD_TRANSACTIONS_WITH_DATE_RANGE, TransactionActions} from './transaction.actions';

export function transactionsReducer(state = initialTransactionState, action: TransactionActions): ITransactionState {
  switch (action.type) {
    case LOAD_TRANSACTIONS_WITH_DATE_RANGE:
      return {...state};
    case LOAD_TRANSACTIONS:
      return transactionEntityAdapter.setAll(action.transactions, state);
    case DELETE_TRANSACTION:
      return transactionEntityAdapter.removeOne(action.transactionId, state);
    default:
      return state;
  }
}
