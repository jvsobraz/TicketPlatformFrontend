import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CouponResponse, CreateCouponRequest, CouponValidationResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class CouponService {
  private readonly BASE_URL = '/Coupons';
  constructor(private http: HttpClient) {}

  createCoupon(request: CreateCouponRequest): Observable<CouponResponse> {
    return this.http.post<CouponResponse>(this.BASE_URL, request);
  }

  getMyCoupons(): Observable<CouponResponse[]> {
    return this.http.get<CouponResponse[]>(`${this.BASE_URL}/my-coupons`);
  }

  validateCoupon(code: string, eventId: number): Observable<CouponValidationResponse> {
    return this.http.post<CouponValidationResponse>(`${this.BASE_URL}/validate`, { code, eventId });
  }
}
