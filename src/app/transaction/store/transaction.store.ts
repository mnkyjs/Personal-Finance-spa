import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DateRangeDto, TransactionDto} from '../../api/service/personal-finance-api.service';

export const transactionEntityAdapter = createEntityAdapter<TransactionDto>({
  selectId: (transaction: TransactionDto) => transaction.id
});

export interface ITransactionState extends EntityState<TransactionDto> {
  transactionLoaded: boolean;
}

export const transactionStoreName = 'transactionStoreName';

export const adapter: EntityAdapter<TransactionDto> = createEntityAdapter<TransactionDto>();

export const initialTransactionState: ITransactionState = adapter.getInitialState({
  transactionLoaded: false
});

const {selectAll, selectEntities} = adapter.getSelectors();

export const getTransactionsSelector = createSelector(
  createFeatureSelector(transactionStoreName), selectAll
);

export const getTransactionSelector = (id: number) => createSelector(createFeatureSelector(transactionStoreName),
  (state: ITransactionState) => selectEntities(state)[id]);

