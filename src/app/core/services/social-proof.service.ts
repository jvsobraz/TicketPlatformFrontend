import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocialProofResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class SocialProofService {
  private readonly BASE_URL = '/SocialProof';
  constructor(private http: HttpClient) {}

  trackView(eventId: number): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}/events/${eventId}/view`, {});
  }

  getSocialProof(eventId: number): Observable<SocialProofResponse> {
    return this.http.get<SocialProofResponse>(`${this.BASE_URL}/events/${eventId}`);
  }
}
