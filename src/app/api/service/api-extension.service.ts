import {Inject, Injectable, Optional} from '@angular/core';
import {API_BASE_URL, DateRangeDto, FinanceApiService} from './personal-finance-api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiExtensionService extends FinanceApiService {
  private httpClient: HttpClient;
  private readonly url: string;

  constructor(@Inject(HttpClient) client: HttpClient,  @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    super(client, baseUrl);
    this.httpClient = client;
    this.url = baseUrl !== undefined && baseUrl !== null ? baseUrl : 'http://localhost:6025';
  }

  loadTransactions(period: DateRangeDto): void {
    this.getAllTransactionsInDateRange(period);
  }
}
