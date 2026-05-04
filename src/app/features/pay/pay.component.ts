import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PaymentLinkService } from '../../core/services/payment-link.service';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { PaymentLinkResponse, PaymentMethod } from '../../core/models';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatProgressSpinnerModule, MatSelectModule, MatFormFieldModule, MatSnackBarModule,
    TranslateModule
  ],
  template: `
    <div class="container pay-container">
      @if (loading) {
        <div class="center-spinner"><mat-progress-spinner mode="indeterminate" /></div>
      } @else if (error) {
        <mat-card class="error-card">
          <mat-icon>error_outline</mat-icon>
          <h2>{{ 'PAY.LINK_INVALID' | translate }}</h2>
          <p>{{ 'PAY.LINK_UNAVAILABLE' | translate }}</p>
          <a mat-raised-button color="primary" routerLink="/events">{{ 'PAY.VIEW_EVENTS' | translate }}</a>
        </mat-card>
      } @else if (link) {
        <div class="pay-layout">
          <!-- Header -->
          <div class="pay-header">
            <mat-icon class="logo-icon">confirmation_number</mat-icon>
            <h1>{{ 'PAY.PAYMENT_LINK' | translate }}</h1>
          </div>

          <mat-card class="pay-card">
            @if (link.customMessage) {
              <div class="custom-message">
                <mat-icon>campaign</mat-icon>
                <p>{{ link.customMessage }}</p>
              </div>
            }

            <div class="link-info">
              @if (link.eventTitle) {
                <div class="info-row">
                  <mat-icon>event</mat-icon>
                  <span><strong>{{ 'PAY.EVENT_LABEL' | translate }}</strong> {{ link.eventTitle }}</span>
                </div>
              }
              @if (link.ticketTypeName) {
                <div class="info-row">
                  <mat-icon>confirmation_number</mat-icon>
                  <span><strong>{{ 'PAY.TICKET_LABEL' | translate }}</strong> {{ link.ticketTypeName }}</span>
                </div>
              }
              @if (link.expiresAt) {
                <div class="info-row">
                  <mat-icon>schedule</mat-icon>
                  <span><strong>{{ 'PAY.VALID_UNTIL' | translate }}</strong> {{ link.expiresAt | date:'dd/MM/yyyy HH:mm' }}</span>
                </div>
              }
              @if (link.maxUses) {
                <div class="info-row">
                  <mat-icon>toll</mat-icon>
                  <span><strong>{{ 'PAY.REMAINING_USES' | translate }}</strong> {{ link.maxUses - link.usedCount }}</span>
                </div>
              }
            </div>

            @if (!isAuthenticated) {
              <div class="auth-notice">
                <mat-icon>login</mat-icon>
                <p>{{ 'PAY.LOGIN_TO_CONTINUE' | translate }}</p>
                <a mat-raised-button color="primary" [routerLink]="['/login']" [queryParams]="{returnUrl: currentUrl}">
                  {{ 'PAY.LOGIN_BTN' | translate }}
                </a>
                <a mat-button [routerLink]="['/register']">{{ 'PAY.CREATE_ACCOUNT' | translate }}</a>
              </div>
            } @else {
              <div class="checkout-options">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>{{ 'PAY.QUANTITY' | translate }}</mat-label>
                  <mat-select [(ngModel)]="quantity">
                    @for (n of [1,2,3,4,5]; track n) {
                      <mat-option [value]="n">{{ n }} {{ n > 1 ? ('PAY.TICKET_PL' | translate) : ('PAY.TICKET_SG' | translate) }}</mat-option>
                    }
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>{{ 'PAY.PAYMENT_METHOD_LABEL' | translate }}</mat-label>
                  <mat-select [(ngModel)]="paymentMethod">
                    <mat-option [value]="PaymentMethod.Card">{{ 'PAY.CARD_OPTION' | translate }}</mat-option>
                    <mat-option [value]="PaymentMethod.Pix">{{ 'PAY.PIX_OPTION' | translate }}</mat-option>
                  </mat-select>
                </mat-form-field>

                <button mat-raised-button color="primary" class="full-width buy-btn"
                        (click)="proceed()" [disabled]="proceeding">
                  @if (proceeding) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                  @else { <mat-icon>shopping_cart</mat-icon> {{ 'PAY.BUY_NOW' | translate }} }
                </button>
              </div>
            }
          </mat-card>
        </div>
      }
    </div>
  `,
  styles: [`
    .pay-container { padding:32px 16px; max-width:520px; }
    .center-spinner { display:flex; justify-content:center; padding:64px; }
    .pay-layout { display:flex; flex-direction:column; gap:24px; }
    .pay-header { display:flex; align-items:center; gap:12px;
      .logo-icon { font-size:36px; width:36px; height:36px; color:#6200ea; }
      h1 { margin:0; font-size:1.5rem; }
    }
    .pay-card { padding:24px; }
    .custom-message { background:rgba(98,0,234,0.12); border-radius:8px; padding:16px; display:flex; align-items:flex-start; gap:12px; margin-bottom:20px;
      mat-icon { color:var(--primary); flex-shrink:0; }
      p { margin:0; font-style:italic; color:var(--text-secondary); }
    }
    .link-info { display:flex; flex-direction:column; gap:8px; margin-bottom:24px; padding:16px; background:var(--surface-2); border-radius:8px; }
    .info-row { display:flex; align-items:center; gap:8px; font-size:0.9rem;
      mat-icon { font-size:18px; width:18px; height:18px; color:var(--primary); }
    }
    .auth-notice { text-align:center; padding:24px; display:flex; flex-direction:column; align-items:center; gap:12px;
      mat-icon { font-size:40px; width:40px; height:40px; color:var(--text-hint); }
      p { color:var(--text-secondary); margin:0; }
    }
    .checkout-options { display:flex; flex-direction:column; gap:16px; }
    .full-width { width:100%; }
    .buy-btn { height:52px; font-size:1rem; }
    .error-card { text-align:center; padding:48px; display:flex; flex-direction:column; align-items:center; gap:16px;
      mat-icon { font-size:56px; width:56px; height:56px; color:var(--warn); }
      h2 { margin:0; }
      p { color:var(--text-secondary); }
    }
  `]
})
export class PayComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private paymentLinkService = inject(PaymentLinkService);
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  link: PaymentLinkResponse | null = null;
  loading = true;
  error = false;
  proceeding = false;
  quantity = 1;
  paymentMethod = PaymentMethod.Card;
  PaymentMethod = PaymentMethod;
  currentUrl = '';

  get isAuthenticated(): boolean {
    return !!this.authService.currentUser();
  }

  ngOnInit(): void {
    const token = this.route.snapshot.params['token'];
    this.currentUrl = `/pay/${token}`;

    this.paymentLinkService.getByToken(token).subscribe({
      next: (link) => { this.link = link; this.loading = false; },
      error: () => { this.error = true; this.loading = false; }
    });
  }

  proceed(): void {
    if (!this.link || !this.link.ticketTypeId) {
      // No specific ticket type — redirect to event page
      if (this.link?.eventId) {
        this.router.navigate(['/events', this.link.eventId]);
      } else {
        this.router.navigate(['/events']);
      }
      return;
    }

    this.proceeding = true;
    this.orderService.createOrder({
      items: [{ ticketTypeId: this.link.ticketTypeId, quantity: this.quantity }],
      paymentMethod: this.paymentMethod,
      installments: 1,
      bundles: [],
      paymentLinkToken: this.link.token
    } as any).subscribe({
      next: (order) => {
        this.proceeding = false;
        this.router.navigate(['/checkout', order.id]);
      },
      error: (err) => {
        this.proceeding = false;
        this.snackBar.open(err?.error?.message || this.translate.instant('PAY.ORDER_ERROR'), 'OK', { duration: 4000 });
      }
    });
  }
}
