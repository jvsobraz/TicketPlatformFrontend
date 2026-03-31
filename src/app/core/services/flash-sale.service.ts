import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlashSaleResponse, CreateFlashSaleRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class FlashSaleService {
  private http = inject(HttpClient);
  private readonly BASE = '/FlashSales';

  create(request: CreateFlashSaleRequest): Observable<FlashSaleResponse> {
    return this.http.post<FlashSaleResponse>(this.BASE, request);
  }

  getMySales(): Observable<FlashSaleResponse[]> {
    return this.http.get<FlashSaleResponse[]>(`${this.BASE}/my-sales`);
  }

  getByEvent(eventId: number): Observable<FlashSaleResponse[]> {
    return this.http.get<FlashSaleResponse[]>(`${this.BASE}/event/${eventId}`);
  }

  getByTicketType(ticketTypeId: number): Observable<FlashSaleResponse | null> {
    return this.http.get<FlashSaleResponse | null>(`${this.BASE}/ticket-type/${ticketTypeId}`);
  }

  cancel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE}/${id}`);
  }
}
