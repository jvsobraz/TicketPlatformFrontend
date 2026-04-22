import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganizerDashboardResponse, EventAnalyticsResponse, PlatformDashboardResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly BASE_URL = '/Analytics';
  constructor(private http: HttpClient) {}

  getDashboard(): Observable<OrganizerDashboardResponse> {
    return this.http.get<OrganizerDashboardResponse>(`${this.BASE_URL}/dashboard`);
  }

  getEventAnalytics(eventId: number): Observable<EventAnalyticsResponse> {
    return this.http.get<EventAnalyticsResponse>(`${this.BASE_URL}/events/${eventId}`);
  }

  getPlatformDashboard(): Observable<PlatformDashboardResponse> {
    return this.http.get<PlatformDashboardResponse>(`${this.BASE_URL}/platform`);
  }
}
