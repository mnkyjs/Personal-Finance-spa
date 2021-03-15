import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DateRangeDto, TransactionDto} from '../../api/service/personal-finance-api.service';
import {ApiExtensionService} from '../../api/service/api-extension.service';
import {StateService} from '../../shared/services/state.service';
import {NotificationService} from "../../shared/services/notification.service";

interface TransactionState {
  transactions: TransactionDto[];
  isLoading: boolean;
  selectedTransactionId: number;
}

const initState: TransactionState = {
  transactions: [],
  isLoading: false,
  selectedTransactionId: undefined,
};

@Injectable({
  providedIn: 'root'
})
export class TransactionStoreService extends StateService<TransactionState> {
  transaction$: Observable<TransactionDto[]> = this.select(state => state.transactions);

  selectedTransaction$: Observable<TransactionDto> = this.select(state => {
    return state.transactions.find(item => item.id === state.selectedTransactionId);
  });

  isLoading$: Observable<boolean> = this.select(state => state.isLoading);

  startDateForView = new Date(new Date().getFullYear(), 0, 1);
  endDayForView = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  constructor(private apiService: ApiExtensionService, private _alert: NotificationService) {
    super(initState);
    this.loadTransactions({
      startDate: this.startDateForView,
      endDate: this.endDayForView,
    } as DateRangeDto);
  }

  selectTransaction(transaction: TransactionDto): void {
    this.setState({
      selectedTransactionId: transaction.id
    });
  }

  unSelectTransaction(): void {
    this.setState({
      selectedTransactionId: undefined
    });
  }

  getCurrentState(): TransactionState {
    return this.state;
  }

  loading(): void {
    this.setState({isLoading: true});
  }

  addTransactions(transaction: TransactionDto): void {
    this.apiService.createTransaction(transaction).subscribe((data) => {
      if (data) {
        this.setState({transactions: [...this.state.transactions, data]});
        this._alert.showSuccess('Eintrag gespeichert');
      }
    });
  }

  loadTransactions(period: DateRangeDto): void {
    this.loading();
    this.apiService.getAllTransactionsInDateRange(period).subscribe(data => {
      if (data) {
        this.setState({transactions: data, isLoading: false});
      }
      this.setState({isLoading: false});
    });
  }

  updateTransaction(transaction: TransactionDto): void {
    this.apiService.updateTransaction(transaction.id, transaction).subscribe((data) => {
      if (data) {
        this.setState({
          transactions: this.state.transactions.map((item) => (item.id === transaction.id ? data : item)),
        });
      }
    });
  }

  removeTransaction(transaction: TransactionDto): void {
    this.apiService.deleteTransaction(transaction.id).subscribe(() => {
      this.setState({
        selectedTransactionId: undefined,
        transactions: this.state.transactions.filter((item) => item.id !== transaction.id)
      });
      this._alert.showSuccess('Eintrag gelöscht');
    });
  }

}
