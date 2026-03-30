import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResaleResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class ResaleService {
  private readonly BASE_URL = '/Resale';
  constructor(private http: HttpClient) {}

  listForResale(ticketId: number, askingPrice: number): Observable<ResaleResponse> {
    return this.http.post<ResaleResponse>(this.BASE_URL, { ticketId, askingPrice });
  }

  getEventResales(eventId: number): Observable<ResaleResponse[]> {
    return this.http.get<ResaleResponse[]>(`${this.BASE_URL}/events/${eventId}`);
  }

  purchaseResale(id: number): Observable<ResaleResponse> {
    return this.http.post<ResaleResponse>(`${this.BASE_URL}/${id}/purchase`, {});
  }

  cancelResale(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
