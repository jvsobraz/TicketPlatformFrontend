import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentLinkResponse, CreatePaymentLinkRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class PaymentLinkService {
  private http = inject(HttpClient);
  private readonly BASE = '/PaymentLinks';

  create(request: CreatePaymentLinkRequest): Observable<PaymentLinkResponse> {
    return this.http.post<PaymentLinkResponse>(this.BASE, request);
  }

  getMyLinks(): Observable<PaymentLinkResponse[]> {
    return this.http.get<PaymentLinkResponse[]>(`${this.BASE}/my-links`);
  }

  getByToken(token: string): Observable<PaymentLinkResponse> {
    return this.http.get<PaymentLinkResponse>(`${this.BASE}/token/${token}`);
  }

  deactivate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE}/${id}`);
  }
}
