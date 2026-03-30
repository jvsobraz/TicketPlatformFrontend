import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoyaltyBalanceResponse, LoyaltyTransactionResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class LoyaltyService {
  private readonly BASE_URL = '/Loyalty';
  constructor(private http: HttpClient) {}

  getBalance(): Observable<LoyaltyBalanceResponse> {
    return this.http.get<LoyaltyBalanceResponse>(`${this.BASE_URL}/balance`);
  }

  getHistory(): Observable<LoyaltyTransactionResponse[]> {
    return this.http.get<LoyaltyTransactionResponse[]>(`${this.BASE_URL}/history`);
  }
}
