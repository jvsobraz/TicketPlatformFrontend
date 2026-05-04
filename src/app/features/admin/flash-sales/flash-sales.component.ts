import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FlashSaleService } from '../../../core/services/flash-sale.service';
import { FlashSaleResponse, DiscountType } from '../../../core/models';

@Component({
  selector: 'app-flash-sales',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatChipsModule,
    TranslateModule
  ],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <h1 class="section-title">⚡ {{ 'FLASH_SALES.PAGE_TITLE' | translate }}</h1>
        <a mat-button routerLink="/admin"><mat-icon>arrow_back</mat-icon> {{ 'COMMON.BACK' | translate }}</a>
      </div>

      <div class="content-grid">
        <!-- Create form -->
        <mat-card class="create-card">
          <mat-card-header>
            <mat-card-title>{{ 'FLASH_SALES.CREATE_TITLE' | translate }}</mat-card-title>
            <mat-card-subtitle>{{ 'FLASH_SALES.CREATE_SUBTITLE' | translate }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="form" (ngSubmit)="create()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'FLASH_SALES.TICKET_TYPE_ID' | translate }}</mat-label>
                <input matInput type="number" formControlName="ticketTypeId" placeholder="Ex: 5">
                <mat-icon matSuffix>confirmation_number</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'FLASH_SALES.DISCOUNT_TYPE' | translate }}</mat-label>
                <mat-select formControlName="discountType">
                  <mat-option [value]="DiscountType.Percentage">{{ 'FLASH_SALES.PERCENTAGE_TYPE' | translate }}</mat-option>
                  <mat-option [value]="DiscountType.Fixed">{{ 'FLASH_SALES.FIXED_TYPE' | translate }}</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'FLASH_SALES.DISCOUNT_VALUE' | translate }}</mat-label>
                <input matInput type="number" formControlName="discountValue" min="0.01" step="0.01">
                <span matSuffix>{{ form.value.discountType === DiscountType.Percentage ? '%' : 'R$' }}</span>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'FLASH_SALES.STARTS' | translate }}</mat-label>
                <input matInput type="datetime-local" formControlName="startAt">
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'FLASH_SALES.ENDS' | translate }}</mat-label>
                <input matInput type="datetime-local" formControlName="endAt">
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'FLASH_SALES.MAX_TICKETS' | translate }}</mat-label>
                <input matInput type="number" formControlName="maxTickets" min="1">
              </mat-form-field>

              <button mat-raised-button color="warn" type="submit"
                      [disabled]="form.invalid || creating" class="full-width">
                @if (creating) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                @else { <mat-icon>bolt</mat-icon> {{ 'FLASH_SALES.CREATE_BTN' | translate }} }
              </button>
            </form>
          </mat-card-content>
        </mat-card>

        <!-- Sales list -->
        <div class="sales-list">
          @if (loading) {
            <div style="text-align:center;padding:32px"><mat-progress-spinner mode="indeterminate" /></div>
          } @else if (sales.length === 0) {
            <mat-card class="empty-card">
              <mat-icon>flash_off</mat-icon>
              <p>{{ 'FLASH_SALES.NO_SALES' | translate }}</p>
            </mat-card>
          } @else {
            @for (sale of sales; track sale.id) {
              <mat-card class="sale-card" [class.running]="sale.isRunning" [class.ended]="!sale.isActive || isEnded(sale)">
                <div class="sale-header">
                  <div class="sale-info">
                    <span class="sale-title">{{ sale.ticketTypeName }}</span>
                    <span class="sale-event">{{ sale.eventTitle }}</span>
                  </div>
                  <div class="sale-badge">
                    @if (sale.isRunning) {
                      <mat-chip color="warn" highlighted>⚡ {{ 'FLASH_SALES.LIVE' | translate }}</mat-chip>
                    } @else if (!sale.isActive || isEnded(sale)) {
                      <mat-chip>{{ 'FLASH_SALES.ENDED' | translate }}</mat-chip>
                    } @else {
                      <mat-chip color="primary">{{ 'FLASH_SALES.SCHEDULED' | translate }}</mat-chip>
                    }
                  </div>
                </div>

                <div class="sale-prices">
                  <span class="original-price">{{ sale.originalPrice | currency:'BRL' }}</span>
                  <mat-icon>arrow_forward</mat-icon>
                  <span class="flash-price">{{ sale.flashPrice | currency:'BRL' }}</span>
                  <span class="discount-badge">
                    -{{ sale.discountType === DiscountType.Percentage ? sale.discountValue + '%' : (sale.discountValue | currency:'BRL') }}
                  </span>
                </div>

                <div class="sale-meta">
                  <span><mat-icon>schedule</mat-icon> {{ sale.startAt | date:'dd/MM HH:mm' }} → {{ sale.endAt | date:'dd/MM HH:mm' }}</span>
                  @if (sale.maxTickets) {
                    <span><mat-icon>confirmation_number</mat-icon> {{ sale.ticketsSold }}/{{ sale.maxTickets }} {{ 'FLASH_SALES.TICKETS_SOLD' | translate }}</span>
                  }
                </div>

                @if (sale.isActive && !isEnded(sale)) {
                  <mat-card-actions>
                    <button mat-button color="warn" (click)="cancel(sale.id)">
                      <mat-icon>cancel</mat-icon> {{ 'COMMON.CANCEL' | translate }}
                    </button>
                  </mat-card-actions>
                }
              </mat-card>
            }
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding:32px 16px; }
    .page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:32px; }
    .content-grid { display:grid; grid-template-columns:380px 1fr; gap:24px;
      @media(max-width:900px){grid-template-columns:1fr;} }
    form { display:flex; flex-direction:column; gap:12px; margin-top:8px; }
    .full-width { width:100%; }
    .sales-list { display:flex; flex-direction:column; gap:12px; }
    .sale-card { padding:16px; transition:box-shadow 0.2s; }
    .sale-card.running { border-left:4px solid #f44336; box-shadow:0 2px 8px rgba(244,67,54,0.2); }
    .sale-card.ended { opacity:0.6; }
    .sale-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; }
    .sale-title { display:block; font-weight:600; }
    .sale-event { display:block; font-size:0.82rem; color:var(--text-secondary); }
    .sale-prices { display:flex; align-items:center; gap:8px; margin-bottom:12px; flex-wrap:wrap; }
    .original-price { text-decoration:line-through; color:var(--text-hint); }
    .flash-price { font-size:1.3rem; font-weight:700; color:#e53935; }
    .discount-badge { background:#e53935; color:#fff; border-radius:12px; padding:2px 10px; font-size:0.8rem; font-weight:600; }
    .sale-meta { display:flex; gap:16px; font-size:0.8rem; color:var(--text-secondary); flex-wrap:wrap;
      span { display:flex; align-items:center; gap:4px; mat-icon { font-size:14px; width:14px; height:14px; } } }
    .empty-card { text-align:center; padding:48px;
      mat-icon { font-size:48px; width:48px; height:48px; color:var(--text-hint); display:block; margin:0 auto 16px; } p { color:var(--text-secondary); } }
  `]
})
export class FlashSalesComponent implements OnInit {
  private service = inject(FlashSaleService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);

  DiscountType = DiscountType;
  sales: FlashSaleResponse[] = [];
  loading = true;
  creating = false;

  form = this.fb.group({
    ticketTypeId: [null as number | null, [Validators.required, Validators.min(1)]],
    discountType: [DiscountType.Percentage, Validators.required],
    discountValue: [null as number | null, [Validators.required, Validators.min(0.01)]],
    startAt: ['', Validators.required],
    endAt: ['', Validators.required],
    maxTickets: [null as number | null]
  });

  ngOnInit(): void {
    this.service.getMySales().subscribe({
      next: (data) => { this.sales = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  isEnded(sale: FlashSaleResponse): boolean {
    return new Date(sale.endAt) <= new Date();
  }

  create(): void {
    if (this.form.invalid) return;
    const v = this.form.value;
    this.creating = true;
    this.service.create({
      ticketTypeId: v.ticketTypeId!,
      discountType: v.discountType!,
      discountValue: v.discountValue!,
      startAt: new Date(v.startAt!).toISOString(),
      endAt: new Date(v.endAt!).toISOString(),
      maxTickets: v.maxTickets ?? undefined
    }).subscribe({
      next: (sale) => {
        this.sales.unshift(sale);
        this.form.reset({ discountType: DiscountType.Percentage });
        this.creating = false;
        this.snackBar.open(this.translate.instant('FLASH_SALES.CREATED'), 'OK', { duration: 3000 });
      },
      error: () => { this.creating = false; }
    });
  }

  cancel(id: number): void {
    this.service.cancel(id).subscribe({
      next: () => {
        const sale = this.sales.find(s => s.id === id);
        if (sale) sale.isActive = false;
        this.snackBar.open(this.translate.instant('FLASH_SALES.CANCELLED_MSG'), 'OK', { duration: 2000 });
      }
    });
  }
}
