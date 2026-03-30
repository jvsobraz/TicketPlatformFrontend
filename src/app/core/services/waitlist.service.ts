import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WaitlistEntryResponse, JoinWaitlistRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class WaitlistService {
  private readonly BASE_URL = '/Waitlist';
  constructor(private http: HttpClient) {}

  joinWaitlist(request: JoinWaitlistRequest): Observable<WaitlistEntryResponse> {
    return this.http.post<WaitlistEntryResponse>(`${this.BASE_URL}/join`, request);
  }

  getMyWaitlist(): Observable<WaitlistEntryResponse[]> {
    return this.http.get<WaitlistEntryResponse[]>(`${this.BASE_URL}/my`);
  }

  leaveWaitlist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

  checkToken(token: string): Observable<WaitlistEntryResponse> {
    return this.http.get<WaitlistEntryResponse>(`${this.BASE_URL}/check-token/${token}`);
  }
}
