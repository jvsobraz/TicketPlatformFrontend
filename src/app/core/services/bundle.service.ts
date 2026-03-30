import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BundleResponse, CreateBundleRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class BundleService {
  private readonly BASE_URL = '/Bundles';
  constructor(private http: HttpClient) {}

  createBundle(request: CreateBundleRequest): Observable<BundleResponse> {
    return this.http.post<BundleResponse>(this.BASE_URL, request);
  }

  getEventBundles(eventId: number): Observable<BundleResponse[]> {
    return this.http.get<BundleResponse[]>(`/Events/${eventId}/bundles`);
  }

  getBundleById(id: number): Observable<BundleResponse> {
    return this.http.get<BundleResponse>(`${this.BASE_URL}/${id}`);
  }
}
