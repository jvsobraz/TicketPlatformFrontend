import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AffiliateLinkResponse, AffiliateEarningsResponse, CreateAffiliateLinkRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class AffiliateService {
  private readonly BASE_URL = '/Affiliates';
  constructor(private http: HttpClient) {}

  createLink(request: CreateAffiliateLinkRequest): Observable<AffiliateLinkResponse> {
    return this.http.post<AffiliateLinkResponse>(this.BASE_URL, request);
  }

  getMyLinks(): Observable<AffiliateLinkResponse[]> {
    return this.http.get<AffiliateLinkResponse[]>(`${this.BASE_URL}/my-links`);
  }

  getMyEarnings(): Observable<AffiliateEarningsResponse> {
    return this.http.get<AffiliateEarningsResponse>(`${this.BASE_URL}/earnings`);
  }
}
