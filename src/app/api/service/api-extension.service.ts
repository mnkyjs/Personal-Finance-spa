import {Inject, Injectable, Optional} from '@angular/core';
import {API_BASE_URL, DateRangeDto, FinanceApiService} from './personal-finance-api.service';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {LoadTransactions} from '../../transaction/store/transaction.actions';

@Injectable({
  providedIn: 'root'
})
export class ApiExtensionService extends FinanceApiService {
  private httpClient: HttpClient;
  private readonly url: string;

  constructor(@Inject(HttpClient) client: HttpClient, private store: Store, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    super(client, baseUrl);
    this.httpClient = client;
    this.url = baseUrl !== undefined && baseUrl !== null ? baseUrl : 'http://localhost:6025';
  }

  loadTransactions(period: DateRangeDto): void {
    this.getAllTransactionsInDateRange(period)
      .pipe(take(1))
      .subscribe(data => this.store.dispatch(new LoadTransactions(data)));
  }
}
