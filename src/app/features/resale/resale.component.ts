import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ResaleService } from '../../core/services/resale.service';
import { ResaleResponse } from '../../core/models';

@Component({
  selector: 'app-resale',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule, MatChipsModule, TranslateModule],
  template: `
    <div class="container page-container">
      <h1 class="section-title">{{ 'RESALE.PAGE_TITLE_FULL' | translate }}</h1>
      <p class="subtitle">{{ 'RESALE.PAGE_SUBTITLE' | translate }}</p>

      @if (loading) {
        <div style="text-align:center;padding:64px"><mat-progress-spinner mode="indeterminate" /></div>
      } @else if (resales.length === 0) {
        <div class="empty-state">
          <mat-icon>sell</mat-icon>
          <h3>{{ 'RESALE.NO_LISTINGS_TITLE' | translate }}</h3>
          <p>{{ 'RESALE.NO_LISTINGS_DESC' | translate }}</p>
        </div>
      } @else {
        <div class="resale-grid">
          @for (r of resales; track r.id) {
            <mat-card class="resale-card">
              <mat-card-header>
                <mat-card-title>{{ r.eventTitle }}</mat-card-title>
                <mat-card-subtitle>{{ r.ticketTypeName }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="resale-info">
                  <div class="info-row">
                    <mat-icon>calendar_today</mat-icon>
                    <span>{{ r.eventDateTime | date:'dd/MM/yyyy HH:mm' }}</span>
                  </div>
                  <div class="price-section">
                    <div class="original-price">
                      <span class="price-label">{{ 'RESALE.ORIGINAL_PRICE_LABEL' | translate }}</span>
                      <span>{{ r.originalPrice | currency:'BRL' }}</span>
                    </div>
                    <div class="asking-price">
                      <span class="price-label">{{ 'RESALE.ASKING_PRICE_LABEL' | translate }}</span>
                      <span class="price">{{ r.askingPrice | currency:'BRL' }}</span>
                    </div>
                  </div>
                  <div class="seller-info">
                    <mat-icon>person</mat-icon>
                    <span>{{ 'RESALE.SOLD_BY' | translate }} {{ r.sellerName }}</span>
                  </div>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" (click)="purchase(r)" [disabled]="purchasing === r.id">
                  @if (purchasing === r.id) { <mat-progress-spinner diameter="18" mode="indeterminate" /> }
                  @else { <mat-icon>shopping_cart</mat-icon> {{ 'RESALE.BUY_FOR' | translate }} {{ r.askingPrice | currency:'BRL' }} }
                </button>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .page-container { padding:32px 16px; }
    .subtitle { color:var(--text-secondary); margin:-16px 0 32px; }
    .resale-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:24px; }
    .resale-info { display:flex; flex-direction:column; gap:12px; }
    .info-row { display:flex; align-items:center; gap:8px; color:var(--text-secondary); font-size:0.9rem; mat-icon { font-size:18px; width:18px; height:18px; } }
    .price-section { display:flex; justify-content:space-between; padding:12px; background:var(--surface-2); border-radius:8px; }
    .price-label { display:block; font-size:0.75rem; color:var(--text-secondary); margin-bottom:4px; }
    .original-price span:last-child { text-decoration:line-through; color:var(--text-hint); }
    .asking-price .price { color:var(--primary); font-size:1.2rem; font-weight:700; }
    .seller-info { display:flex; align-items:center; gap:8px; font-size:0.85rem; color:var(--text-secondary); }
    .empty-state { text-align:center; padding:64px;
      mat-icon { font-size:64px; width:64px; height:64px; color:var(--text-hint); display:block; margin:0 auto 16px; }
      h3 { margin:0 0 8px; } p { color:var(--text-secondary); }
    }
  `]
})
export class ResaleComponent implements OnInit {
  private resaleService = inject(ResaleService);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  resales: ResaleResponse[] = [];
  loading = true;
  purchasing: number | null = null;

  ngOnInit(): void {
    // For demo: load general resales - in production filter by event
    this.loading = false;
  }

  purchase(resale: ResaleResponse): void {
    this.purchasing = resale.id;
    this.resaleService.purchaseResale(resale.id).subscribe({
      next: () => {
        this.resales = this.resales.filter(r => r.id !== resale.id);
        this.purchasing = null;
        this.snackBar.open(this.translate.instant('RESALE.PURCHASE_SUCCESS'), 'OK', { duration: 4000 });
      },
      error: (err) => {
        this.purchasing = null;
        this.snackBar.open(err.error?.error || this.translate.instant('RESALE.PURCHASE_ERROR'), 'Fechar', { duration: 3000 });
      }
    });
  }
}
