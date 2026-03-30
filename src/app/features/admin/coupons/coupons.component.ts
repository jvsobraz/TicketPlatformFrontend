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
import { CouponService } from '../../../core/services/coupon.service';
import { CouponResponse, DiscountType } from '../../../core/models';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule, MatSnackBarModule, MatChipsModule],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <h1 class="section-title">Cupons de Desconto</h1>
        <a mat-button routerLink="/admin"><mat-icon>arrow_back</mat-icon> Voltar</a>
      </div>

      <!-- Create Form -->
      <mat-card class="create-card">
        <mat-card-header><mat-card-title>Criar Cupom</mat-card-title></mat-card-header>
        <mat-card-content>
          <form [formGroup]="couponForm" class="coupon-form">
            <mat-form-field appearance="outline">
              <mat-label>Código</mat-label>
              <input matInput formControlName="code" placeholder="PROMO20" style="text-transform:uppercase">
              <mat-hint>Código que o cliente usará na compra</mat-hint>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Tipo de Desconto</mat-label>
              <mat-select formControlName="discountType">
                <mat-option [value]="DiscountType.Percentage">Percentual (%)</mat-option>
                <mat-option [value]="DiscountType.Fixed">Valor Fixo (R$)</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>
                {{ couponForm.value.discountType === DiscountType.Percentage ? 'Desconto (%)' : 'Desconto (R$)' }}
              </mat-label>
              <input matInput type="number" formControlName="discountValue" min="1">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Máximo de Usos</mat-label>
              <input matInput type="number" formControlName="maxUses" placeholder="Ilimitado">
              <mat-hint>Deixe vazio para ilimitado</mat-hint>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Válido até</mat-label>
              <input matInput type="datetime-local" formControlName="validUntil">
            </mat-form-field>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="createCoupon()" [disabled]="couponForm.invalid || creating">
            @if (creating) { <mat-progress-spinner diameter="18" mode="indeterminate" /> }
            @else { <mat-icon>add</mat-icon> Criar Cupom }
          </button>
        </mat-card-actions>
      </mat-card>

      <!-- Coupons List -->
      <mat-card>
        <mat-card-header><mat-card-title>Meus Cupons</mat-card-title></mat-card-header>
        <mat-card-content>
          @if (loading) {
            <div style="text-align:center;padding:32px"><mat-progress-spinner mode="indeterminate" /></div>
          } @else if (coupons.length === 0) {
            <p style="color:#757575;padding:24px;text-align:center">Nenhum cupom criado ainda.</p>
          } @else {
            <div class="coupons-list">
              @for (coupon of coupons; track coupon.id) {
                <div class="coupon-item" [class.inactive]="!coupon.isActive">
                  <div class="coupon-code">{{ coupon.code }}</div>
                  <div class="coupon-details">
                    <span class="discount-badge">
                      {{ coupon.discountType === DiscountType.Percentage ? coupon.discountValue + '%' : (coupon.discountValue | currency:'BRL') }} OFF
                    </span>
                    <span>{{ coupon.usedCount }}{{ coupon.maxUses ? '/' + coupon.maxUses : '' }} usos</span>
                    @if (coupon.validUntil) {
                      <span>até {{ coupon.validUntil | date:'dd/MM/yyyy' }}</span>
                    }
                    <mat-chip [class]="coupon.isActive ? 'status-active' : 'status-cancelled'">
                      {{ coupon.isActive ? 'Ativo' : 'Inativo' }}
                    </mat-chip>
                  </div>
                </div>
              }
            </div>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container { padding:32px 16px; }
    .page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:32px; }
    .create-card { margin-bottom:24px; }
    .coupon-form { display:grid; grid-template-columns:repeat(3,1fr); gap:16px;
      @media(max-width:768px){grid-template-columns:1fr;} }
    .coupons-list { display:flex; flex-direction:column; gap:8px; }
    .coupon-item { display:flex; align-items:center; gap:16px; padding:12px 16px; background:#f5f5f5; border-radius:8px; }
    .coupon-item.inactive { opacity:0.6; }
    .coupon-code { font-family:monospace; font-size:1.1rem; font-weight:700; background:#e8eaf6; padding:6px 12px; border-radius:4px; min-width:120px; text-align:center; }
    .coupon-details { display:flex; gap:16px; align-items:center; flex-wrap:wrap; font-size:0.9rem; color:#616161; }
    .discount-badge { background:#6200ea; color:white; padding:2px 8px; border-radius:12px; font-weight:600; font-size:0.85rem; }
  `]
})
export class CouponsComponent implements OnInit {
  private couponService = inject(CouponService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  DiscountType = DiscountType;
  coupons: CouponResponse[] = [];
  loading = true;
  creating = false;

  couponForm = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(3)]],
    discountType: [DiscountType.Percentage, Validators.required],
    discountValue: [10, [Validators.required, Validators.min(1)]],
    maxUses: [null as number | null],
    validUntil: [null as string | null]
  });

  ngOnInit(): void {
    this.couponService.getMyCoupons().subscribe({
      next: (c) => { this.coupons = c; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  createCoupon(): void {
    if (this.couponForm.invalid) return;
    this.creating = true;
    const val = this.couponForm.value;
    this.couponService.createCoupon({
      code: val.code!.toUpperCase(),
      discountType: val.discountType!,
      discountValue: val.discountValue!,
      maxUses: val.maxUses || undefined,
      validUntil: val.validUntil || undefined
    }).subscribe({
      next: (c) => {
        this.coupons.unshift(c);
        this.couponForm.reset({ discountType: DiscountType.Percentage, discountValue: 10 });
        this.creating = false;
        this.snackBar.open('Cupom criado!', 'OK', { duration: 3000 });
      },
      error: (err) => {
        this.creating = false;
        this.snackBar.open(err.error?.error || 'Erro ao criar cupom', 'Fechar', { duration: 3000 });
      }
    });
  }
}
