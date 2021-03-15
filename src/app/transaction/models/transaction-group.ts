import {TransactionDto} from '../../api/service/personal-finance-api.service';

export interface TransactionGroup {
  date: string;
  transactions: TransactionDto[];
}
