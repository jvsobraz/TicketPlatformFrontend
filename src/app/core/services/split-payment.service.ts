import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SplitParticipant {
  id: number;
  name?: string;
  email?: string;
  amount: number;
  status: number; // 0=Pending, 1=Paid, 2=Expired
  statusLabel: string;
  stripeClientSecret?: string;
  paidAt?: string;
}

export interface SplitPayment {
  id: number;
  token: string;
  shareUrl: string;
  eventId: number;
  eventTitle: string;
  ticketTypeName: string;
  totalQuantity: number;
  totalAmount: number;
  shareAmount: number;
  maxParticipants: number;
  paidCount: number;
  status: number; // 0=Open, 1=Complete, 2=Expired, 3=Cancelled
  statusLabel: string;
  expiresAt: string;
  createdAt: string;
  participants: SplitParticipant[];
}

@Injectable({ providedIn: 'root' })
export class SplitPaymentService {
  constructor(private http: HttpClient) {}

  create(ticketTypeId: number, participants: number, quantityPerParticipant: number): Observable<SplitPayment> {
    return this.http.post<SplitPayment>('/split', { ticketTypeId, participants, quantityPerParticipant });
  }

  getByToken(token: string): Observable<SplitPayment> {
    return this.http.get<SplitPayment>(`/split/${token}`);
  }

  getMy(): Observable<SplitPayment[]> {
    return this.http.get<SplitPayment[]>('/split/my');
  }

  joinAndPay(token: string): Observable<SplitPayment> {
    return this.http.post<SplitPayment>(`/split/${token}/join`, {});
  }
}
