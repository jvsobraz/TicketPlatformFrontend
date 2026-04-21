import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QueueStatus {
  entryId: number;
  position: number;
  totalInQueue: number;
  status: number; // 0=Waiting, 1=Active, 2=Completed, 3=Expired, 4=Skipped
  statusLabel: string;
  accessToken?: string;
  expiresAt?: string;
  secondsUntilExpiry?: number;
  eventId: number;
  eventTitle: string;
  requestedQuantity: number;
}

@Injectable({ providedIn: 'root' })
export class VirtualQueueService {
  constructor(private http: HttpClient) {}

  join(eventId: number, quantity: number): Observable<QueueStatus> {
    return this.http.post<QueueStatus>(`/queue/events/${eventId}/join`, { quantity });
  }

  getStatus(eventId: number): Observable<QueueStatus> {
    return this.http.get<QueueStatus>(`/queue/events/${eventId}/status`);
  }

  leave(eventId: number): Observable<void> {
    return this.http.delete<void>(`/queue/events/${eventId}/leave`);
  }

  validateToken(token: string): Observable<QueueStatus> {
    return this.http.get<QueueStatus>(`/queue/validate/${token}`);
  }
}
