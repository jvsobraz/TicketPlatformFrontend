import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { ResaleService } from '../../core/services/resale.service';
import { ResaleResponse } from '../../core/models';

@Component({
  selector: 'app-resale',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule, MatChipsModule],
  template: `
    <div class="container page-container">
      <h1 class="section-title">Ingressos para Revenda</h1>
      <p class="subtitle">Compre ingressos de outros usuários com segurança. Preços limitados ao valor original.</p>

      @if (loading) {
        <div style="text-align:center;padding:64px"><mat-progress-spinner mode="indeterminate" /></div>
      } @else if (resales.length === 0) {
        <div class="empty-state">
          <mat-icon>sell</mat-icon>
          <h3>Nenhum ingresso à venda</h3>
          <p>Não há ingressos disponíveis para revenda no momento.</p>
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
                      <span class="price-label">Preço original</span>
                      <span>{{ r.originalPrice | currency:'BRL' }}</span>
                    </div>
                    <div class="asking-price">
                      <span class="price-label">Preço de venda</span>
                      <span class="price">{{ r.askingPrice | currency:'BRL' }}</span>
                    </div>
                  </div>
                  <div class="seller-info">
                    <mat-icon>person</mat-icon>
                    <span>Vendido por {{ r.sellerName }}</span>
                  </div>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" (click)="purchase(r)" [disabled]="purchasing === r.id">
                  @if (purchasing === r.id) { <mat-progress-spinner diameter="18" mode="indeterminate" /> }
                  @else { <mat-icon>shopping_cart</mat-icon> Comprar por {{ r.askingPrice | currency:'BRL' }} }
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
    .subtitle { color:#757575; margin:-16px 0 32px; }
    .resale-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:24px; }
    .resale-info { display:flex; flex-direction:column; gap:12px; }
    .info-row { display:flex; align-items:center; gap:8px; color:#616161; font-size:0.9rem; mat-icon { font-size:18px; width:18px; height:18px; } }
    .price-section { display:flex; justify-content:space-between; padding:12px; background:#f5f5f5; border-radius:8px; }
    .price-label { display:block; font-size:0.75rem; color:#757575; margin-bottom:4px; }
    .original-price span:last-child { text-decoration:line-through; color:#9e9e9e; }
    .asking-price .price { color:#6200ea; font-size:1.2rem; font-weight:700; }
    .seller-info { display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#757575; }
    .empty-state { text-align:center; padding:64px;
      mat-icon { font-size:64px; width:64px; height:64px; color:#bdbdbd; display:block; margin:0 auto 16px; }
      h3 { margin:0 0 8px; } p { color:#757575; }
    }
  `]
})
export class ResaleComponent implements OnInit {
  private resaleService = inject(ResaleService);
  private snackBar = inject(MatSnackBar);

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
        this.snackBar.open('Compra realizada! Verifique seus ingressos.', 'OK', { duration: 4000 });
      },
      error: (err) => {
        this.purchasing = null;
        this.snackBar.open(err.error?.error || 'Erro ao comprar', 'Fechar', { duration: 3000 });
      }
    });
  }
}
