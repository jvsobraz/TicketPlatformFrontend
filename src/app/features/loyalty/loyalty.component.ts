import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoyaltyService } from '../../core/services/loyalty.service';
import { LoyaltyBalanceResponse, LoyaltyTransactionResponse, LoyaltyTransactionType } from '../../core/models';

@Component({
  selector: 'app-loyalty',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTableModule, MatChipsModule, MatDividerModule, TranslateModule],
  template: `
    <div class="container page-container">
      <h1 class="section-title">{{ 'LOYALTY.PAGE_TITLE_FULL' | translate }}</h1>

      <!-- Balance Card -->
      @if (balance) {
        <div class="balance-section">
          <mat-card class="balance-card">
            <div class="points-display">
              <mat-icon>stars</mat-icon>
              <div>
                <span class="points-number">{{ balance.points }}</span>
                <span class="points-label">{{ 'LOYALTY.ACCUMULATED_POINTS' | translate }}</span>
              </div>
            </div>
            <mat-divider vertical></mat-divider>
            <div class="redeem-display">
              <mat-icon>redeem</mat-icon>
              <div>
                <span class="redeem-value">{{ balance.redeemableValue | currency:'BRL' }}</span>
                <span class="redeem-label">{{ 'LOYALTY.AVAILABLE_FOR_REDEEM' | translate }}</span>
              </div>
            </div>
          </mat-card>

          <mat-card class="how-works-card">
            <mat-card-header><mat-card-title>{{ 'LOYALTY.HOW_WORKS' | translate }}</mat-card-title></mat-card-header>
            <mat-card-content>
              <div class="how-item"><mat-icon>shopping_cart</mat-icon><span [innerHTML]="'LOYALTY.HOW_EARN' | translate"></span></div>
              <div class="how-item"><mat-icon>redeem</mat-icon><span [innerHTML]="'LOYALTY.HOW_REDEEM' | translate"></span></div>
              <div class="how-item"><mat-icon>info</mat-icon><span [innerHTML]="'LOYALTY.HOW_MAX' | translate"></span></div>
            </mat-card-content>
          </mat-card>
        </div>
      }

      <!-- History -->
      <mat-card>
        <mat-card-header><mat-card-title>{{ 'LOYALTY.HISTORY' | translate }}</mat-card-title></mat-card-header>
        <mat-card-content>
          @if (loading) {
            <div style="text-align:center;padding:32px"><mat-progress-spinner mode="indeterminate" /></div>
          } @else if (history.length === 0) {
            <p style="color:#757575;padding:24px;text-align:center">{{ 'LOYALTY.NO_TRANSACTIONS' | translate }}</p>
          } @else {
            <table mat-table [dataSource]="history" class="full-width">
              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef>{{ 'LOYALTY.COL_DATE' | translate }}</th>
                <td mat-cell *matCellDef="let t">{{ t.createdAt | date:'dd/MM/yyyy' }}</td>
              </ng-container>
              <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef>{{ 'LOYALTY.COL_DESC' | translate }}</th>
                <td mat-cell *matCellDef="let t">{{ t.description }}</td>
              </ng-container>
              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>{{ 'LOYALTY.COL_TYPE' | translate }}</th>
                <td mat-cell *matCellDef="let t">
                  <mat-chip [class]="t.points > 0 ? 'status-active' : 'status-cancelled'">
                    {{ getTypeName(t.transactionType) }}
                  </mat-chip>
                </td>
              </ng-container>
              <ng-container matColumnDef="points">
                <th mat-header-cell *matHeaderCellDef>{{ 'LOYALTY.COL_POINTS' | translate }}</th>
                <td mat-cell *matCellDef="let t" [class]="t.points > 0 ? 'points-positive' : 'points-negative'">
                  {{ t.points > 0 ? '+' : '' }}{{ t.points }}
                </td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="['date','description','type','points']"></tr>
              <tr mat-row *matRowDef="let row; columns: ['date','description','type','points'];"></tr>
            </table>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container { padding:32px 16px; }
    .balance-section { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:24px;
      @media(max-width:768px){grid-template-columns:1fr;} }
    .balance-card { display:flex; align-items:center; justify-content:space-around; padding:32px; gap:24px; }
    .points-display, .redeem-display { display:flex; align-items:center; gap:16px;
      mat-icon { font-size:48px; width:48px; height:48px; }
    }
    .points-display mat-icon { color:#ffd600; }
    .redeem-display mat-icon { color:#43a047; }
    .points-number { display:block; font-size:2.5rem; font-weight:700; line-height:1; }
    .points-label, .redeem-label { display:block; font-size:0.85rem; color:var(--text-secondary); }
    .redeem-value { display:block; font-size:2rem; font-weight:700; color:#43a047; line-height:1; }
    .how-works-card { }
    .how-item { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border);
      mat-icon { color:#6200ea; } }
    .points-positive { color:#43a047; font-weight:600; }
    .points-negative { color:#e53935; font-weight:600; }
  `]
})
export class LoyaltyComponent implements OnInit {
  private loyaltyService = inject(LoyaltyService);
  private translate = inject(TranslateService);

  balance: LoyaltyBalanceResponse | null = null;
  history: LoyaltyTransactionResponse[] = [];
  loading = true;

  ngOnInit(): void {
    this.loyaltyService.getBalance().subscribe({ next: (b) => { this.balance = b; } });
    this.loyaltyService.getHistory().subscribe({
      next: (h) => { this.history = h; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  getTypeName(type: LoyaltyTransactionType): string {
    const keys: Record<number, string> = {
      0: 'LOYALTY.TYPE_EARNED',
      1: 'LOYALTY.TYPE_REDEEMED',
      2: 'LOYALTY.TYPE_EXPIRED',
      3: 'LOYALTY.TYPE_BONUS'
    };
    return this.translate.instant(keys[type] ?? '');
  }
}
