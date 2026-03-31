import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketTransferResponse, InitiateTransferRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class TicketTransferService {
  private http = inject(HttpClient);
  private readonly BASE = '/TicketTransfers';

  initiate(request: InitiateTransferRequest): Observable<TicketTransferResponse> {
    return this.http.post<TicketTransferResponse>(this.BASE, request);
  }

  accept(token: string): Observable<TicketTransferResponse> {
    return this.http.post<TicketTransferResponse>(`${this.BASE}/accept/${token}`, {});
  }

  cancel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE}/${id}`);
  }

  getSent(): Observable<TicketTransferResponse[]> {
    return this.http.get<TicketTransferResponse[]>(`${this.BASE}/sent`);
  }

  getPending(): Observable<TicketTransferResponse[]> {
    return this.http.get<TicketTransferResponse[]>(`${this.BASE}/pending`);
  }
}
