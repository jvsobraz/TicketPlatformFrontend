import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OrderService } from '../../core/services/order.service';
import { OrderResponse, OrderStatus, PaymentMethod } from '../../core/models';

declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatButtonModule, MatCardModule, MatIconModule,
    MatProgressSpinnerModule, MatSnackBarModule, MatDividerModule,
    TranslateModule
  ],
  template: `
    <div class="checkout-page">
      <div class="container checkout-container">
        <h1 class="checkout-title">
          <mat-icon>shopping_bag</mat-icon> {{ 'CHECKOUT.TITLE' | translate }}
        </h1>

        @if (loadingOrder) {
          <div class="loading-overlay"><mat-progress-spinner mode="indeterminate" /></div>
        } @else if (order) {

          @if (order.status === OrderStatus.Paid) {
            <!-- ── Success state ── -->
            <div class="success-state fade-in">
              <div class="success-circle">
                <mat-icon>check</mat-icon>
              </div>
              <h2>{{ 'CHECKOUT.PAYMENT_CONFIRMED' | translate }}</h2>
              <p>{{ 'CHECKOUT.TICKETS_GENERATED' | translate }}</p>
              <a mat-raised-button color="primary" routerLink="/my-tickets" class="success-btn">
                <mat-icon>confirmation_number</mat-icon> {{ 'CHECKOUT.GO_TO_TICKETS' | translate }}
              </a>
            </div>
          } @else {

            <div class="checkout-layout">
              <!-- ── Order summary ── -->
              <div class="summary-card">
                <div class="card-title-row">
                  <mat-icon>receipt_long</mat-icon>
                  <h2>{{ 'CHECKOUT.ORDER_PREFIX' | translate }} #{{ order.id }}</h2>
                </div>

                <div class="items-list">
                  @for (item of order.items; track item.id) {
                    <div class="order-item">
                      <div class="item-info">
                        <strong>{{ item.quantity }}x {{ item.ticketTypeName }}</strong>
                        <span>{{ item.eventTitle }}</span>
                      </div>
                      <span class="item-price">{{ item.subtotal | currency:'BRL' }}</span>
                    </div>
                  }
                </div>

                <div class="summary-total">
                  <span>{{ 'CHECKOUT.TOTAL_TO_PAY' | translate }}</span>
                  <strong class="total-value">{{ order.totalAmount | currency:'BRL' }}</strong>
                </div>

                <div class="payment-badge">
                  @if (order.paymentMethod === PaymentMethod.Pix) {
                    <mat-icon>pix</mat-icon> <span>{{ 'CHECKOUT.PIX_PAYMENT_LABEL' | translate }}</span>
                  } @else {
                    <mat-icon>credit_card</mat-icon> <span>{{ 'CHECKOUT.CARD_PAYMENT_LABEL' | translate }}</span>
                  }
                </div>
              </div>

              <!-- ── Payment panel ── -->
              <div class="payment-card">
                @if (order.paymentMethod === PaymentMethod.Pix) {
                  <!-- PIX flow -->
                  @if (!pixConfirmed) {
                    <div class="pix-instructions">
                      <div class="pix-icon-wrap">
                        <mat-icon>pix</mat-icon>
                      </div>
                      <h3>{{ 'CHECKOUT.PAY_WITH_PIX' | translate }}</h3>
                      <ul class="pix-steps">
                        <li><mat-icon>looks_one</mat-icon> {{ 'CHECKOUT.PIX_STEP1' | translate }}</li>
                        <li><mat-icon>looks_two</mat-icon> {{ 'CHECKOUT.PIX_STEP2' | translate }}</li>
                        <li><mat-icon>looks_3</mat-icon> {{ 'CHECKOUT.PIX_STEP3' | translate }} <strong>{{ order.totalAmount | currency:'BRL' }}</strong></li>
                        <li><mat-icon>looks_4</mat-icon> {{ 'CHECKOUT.PIX_STEP4' | translate }}</li>
                      </ul>
                      <div class="pix-detail-row">
                        <span>{{ 'CHECKOUT.PIX_AMOUNT' | translate }}</span><strong>{{ order.totalAmount | currency:'BRL' }}</strong>
                      </div>
                      <div class="pix-detail-row">
                        <span>{{ 'CHECKOUT.PIX_VALIDITY' | translate }}</span><strong>{{ 'CHECKOUT.PIX_VALIDITY_VALUE' | translate }}</strong>
                      </div>
                    </div>

                    @if (pixQrCode) {
                      <!-- QR Code exibido -->
                      <div class="qr-section fade-in">
                        <p class="qr-label">{{ 'CHECKOUT.SCAN_QR' | translate }}</p>
                        <img [src]="pixQrCode" alt="PIX QR Code" class="pix-qr">
                        @if (pixCopyPaste) {
                          <button mat-stroked-button class="copy-btn" (click)="copyPixCode()">
                            <mat-icon>content_copy</mat-icon> {{ 'CHECKOUT.PIX_COPY' | translate }}
                          </button>
                        }
                        <p class="pix-waiting">
                          <mat-progress-spinner diameter="16" mode="indeterminate" />
                          {{ 'CHECKOUT.WAITING_PAYMENT' | translate }}
                        </p>
                      </div>
                    }

                    <button mat-raised-button color="primary" class="pay-btn"
                            (click)="confirmPayment()" [disabled]="processingPayment || !stripeReady">
                      @if (processingPayment) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                      @else { <mat-icon>pix</mat-icon> {{ pixQrCode ? ('CHECKOUT.ALREADY_PAID_BTN' | translate) : ('CHECKOUT.GENERATE_QR' | translate) }} }
                    </button>

                  } @else {
                    <div class="pix-success">
                      <mat-icon>check_circle</mat-icon>
                      <p>{{ 'CHECKOUT.PIX_CONFIRMED_MSG' | translate }}</p>
                      <mat-progress-spinner mode="indeterminate" />
                    </div>
                  }

                } @else {
                  <!-- Card flow (Stripe Elements) -->
                  <h3 class="payment-title"><mat-icon>credit_card</mat-icon> {{ 'CHECKOUT.CARD_DATA' | translate }}</h3>
                  <div id="payment-element" class="stripe-element"></div>
                  @if (stripeError) {
                    <div class="stripe-error-box">
                      <mat-icon>error</mat-icon> {{ stripeError }}
                    </div>
                  }
                  <button mat-raised-button color="primary" class="pay-btn"
                          (click)="confirmPayment()" [disabled]="processingPayment || !stripeReady">
                    @if (processingPayment) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                    @else { <mat-icon>lock</mat-icon> {{ 'CHECKOUT.PAY_BTN' | translate }} {{ order.totalAmount | currency:'BRL' }} }
                  </button>
                }

                <button mat-button routerLink="/" class="cancel-btn">{{ 'CHECKOUT.CANCEL_ORDER' | translate }}</button>

                <div class="security-note">
                  <mat-icon>lock</mat-icon>
                  {{ 'CHECKOUT.SECURITY_NOTE' | translate }}
                </div>
              </div>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    /* ── Page ── */
    .checkout-page { padding-top: 64px; min-height: 100vh; background: var(--background); }

    .checkout-container { padding: 40px 16px 64px; max-width: 960px; }

    .checkout-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0 0 32px;
      mat-icon { color: var(--primary); font-size: 1.8rem; width: 1.8rem; height: 1.8rem; }
    }

    /* ── Layout ── */
    .checkout-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      align-items: start;

      @media (max-width: 768px) { grid-template-columns: 1fr; }
    }

    /* ── Summary card ── */
    .summary-card {
      background: var(--surface);
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .card-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      mat-icon { color: var(--primary); }
      h2 { font-size: 1rem; font-weight: 700; margin: 0; }
    }

    .items-list { display: flex; flex-direction: column; gap: 12px; }

    .order-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }

    .item-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      span { font-size: 0.82rem; color: var(--text-secondary); }
    }

    .item-price { font-weight: 600; font-size: 0.95rem; white-space: nowrap; }

    .summary-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0 0;
      span { font-size: 0.9rem; color: var(--text-secondary); }
    }

    .total-value { font-size: 1.4rem; font-weight: 800; color: var(--primary); }

    .payment-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--surface-2);
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-secondary);
      mat-icon { font-size: 18px; width: 18px; height: 18px; color: var(--primary); }
    }

    /* ── Payment card ── */
    .payment-card {
      background: var(--surface);
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .payment-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1rem;
      font-weight: 700;
      margin: 0;
      mat-icon { color: var(--primary); }
    }

    /* ── Stripe element ── */
    .stripe-element {
      padding: 16px;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      min-height: 80px;
      background: var(--surface-2);
    }

    .stripe-error-box {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--error-bg);
      color: var(--error-text);
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 0.88rem;
      mat-icon { font-size: 18px; width: 18px; height: 18px; }
    }

    /* ── PIX flow ── */
    .pix-instructions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .pix-icon-wrap {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--success-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      mat-icon { color: var(--success-text); font-size: 32px; width: 32px; height: 32px; }
    }

    .pix-instructions h3 { font-size: 1.1rem; font-weight: 700; margin: 0; }

    .pix-steps {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;

      li {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        font-size: 0.88rem;
        color: var(--text-secondary);
        mat-icon { font-size: 18px; width: 18px; height: 18px; color: var(--primary); flex-shrink: 0; }
      }
    }

    .pix-detail-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      padding: 8px 0;
      border-bottom: 1px solid var(--border);
      span { color: var(--text-secondary); }
    }

    .qr-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .qr-label { font-size: 0.88rem; color: var(--text-secondary); margin: 0; text-align: center; }

    .pix-qr {
      width: 200px;
      height: 200px;
      border: 2px solid var(--border);
      border-radius: var(--radius-sm);
    }

    .copy-btn { border-radius: 8px !important; font-size: 0.82rem !important; }

    .pix-waiting {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .pix-success {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 24px;
      text-align: center;
      mat-icon { font-size: 48px; width: 48px; height: 48px; color: var(--success); }
      p { color: var(--text-secondary); margin: 0; }
    }

    /* ── Buttons ── */
    .pay-btn {
      width: 100%;
      height: 52px !important;
      font-size: 1rem !important;
      border-radius: 10px !important;
      font-weight: 700 !important;
    }

    .cancel-btn { color: var(--text-hint) !important; font-size: 0.85rem !important; }

    .security-note {
      display: flex;
      align-items: center;
      gap: 6px;
      justify-content: center;
      font-size: 0.75rem;
      color: var(--text-hint);
      mat-icon { font-size: 14px; width: 14px; height: 14px; }
    }

    /* ── Success state ── */
    .success-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 80px 24px;
      gap: 16px;
    }

    .success-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: var(--success-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      mat-icon { font-size: 48px; width: 48px; height: 48px; color: var(--success); }
    }

    .success-state h2 { font-size: 1.6rem; font-weight: 800; margin: 0; }
    .success-state p  { color: var(--text-secondary); margin: 0; }

    .success-btn { height: 48px !important; font-size: 1rem !important; border-radius: 10px !important; }
  `]
})
export class CheckoutComponent implements OnInit {
  private orderService = inject(OrderService);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  order: OrderResponse | null = null;
  loadingOrder = true;
  processingPayment = false;
  stripeReady = false;
  stripeError = '';
  pixQrCode = '';
  pixCopyPaste = '';
  pixConfirmed = false;

  OrderStatus = OrderStatus;
  PaymentMethod = PaymentMethod;

  private stripe: any;
  private elements: any;
  private pollInterval?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.params['orderId']);
    this.orderService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.loadingOrder = false;
        if (order.status === OrderStatus.Pending && order.stripeClientSecret) {
          this.initStripe(order.stripeClientSecret, order.paymentMethod);
        }
      },
      error: () => {
        this.loadingOrder = false;
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.pollInterval) clearInterval(this.pollInterval);
  }

  private async initStripe(clientSecret: string, paymentMethod: PaymentMethod): Promise<void> {
    try {
      // Fetch publishable key from backend
      const config: any = await this.http.get('/Config/stripe-key').toPromise();
      const publishableKey = config?.publishableKey;

      if (!publishableKey || publishableKey.includes('COLOQUE')) {
        this.stripeError = 'Chave do Stripe não configurada. Configure Stripe:PublishableKey no appsettings.';
        return;
      }

      if (typeof Stripe === 'undefined') {
        await this.loadStripeScript();
      }

      this.stripe = Stripe(publishableKey);
      this.elements = this.stripe.elements({ clientSecret, locale: 'pt-BR' });

      if (paymentMethod === PaymentMethod.Card) {
        const paymentEl = this.elements.create('payment');
        setTimeout(() => {
          paymentEl.mount('#payment-element');
          this.stripeReady = true;
        }, 100);
      } else {
        // PIX — ready to confirm immediately
        this.stripeReady = true;
      }
    } catch (err) {
      console.error('Stripe init error:', err);
      this.stripeError = 'Erro ao inicializar pagamento.';
    }
  }

  private loadStripeScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }

  async confirmPayment(): Promise<void> {
    if (!this.stripe || !this.order) return;

    // If PIX QR code already shown, "já paguei" — poll once more then redirect
    if (this.order.paymentMethod === PaymentMethod.Pix && this.pixQrCode) {
      this.pollForPixConfirmation(true);
      return;
    }

    this.processingPayment = true;
    this.stripeError = '';

    try {
      let result: any;

      if (this.order.paymentMethod === PaymentMethod.Pix) {
        result = await this.stripe.confirmPixPayment(this.order.stripeClientSecret, {
          payment_method: { pix: {} }
        });

        if (result.error) {
          this.stripeError = result.error.message || 'Erro ao gerar PIX.';
          this.processingPayment = false;
          return;
        }

        // PIX intent created — extract QR code from next_action
        const nextAction = result.paymentIntent?.next_action;
        if (nextAction?.type === 'pix_display_qr_code') {
          this.pixQrCode = nextAction.pix_display_qr_code?.image_url_png ?? '';
          this.pixCopyPaste = nextAction.pix_display_qr_code?.data ?? '';
        }
        this.processingPayment = false;

        // Start polling for payment confirmation
        this.pollForPixConfirmation(false);

      } else {
        result = await this.stripe.confirmPayment({
          elements: this.elements,
          confirmParams: { return_url: `${window.location.origin}/checkout/${this.order.id}` },
          redirect: 'if_required'
        });

        if (result.error) {
          this.stripeError = result.error.message || 'Erro no pagamento.';
          this.processingPayment = false;
        } else if (result.paymentIntent?.status === 'succeeded') {
          // Notify backend to generate tickets
          this.orderService.confirmOrder(this.order!.id).subscribe({
            next: () => {
              this.order!.status = OrderStatus.Paid;
              this.processingPayment = false;
              this.snackBar.open(this.translate.instant('CHECKOUT.PAYMENT_SUCCESS'), 'OK', { duration: 3000, panelClass: 'success-snackbar' });
            },
            error: () => {
              this.order!.status = OrderStatus.Paid;
              this.processingPayment = false;
            }
          });
        }
      }
    } catch (err) {
      this.stripeError = 'Erro inesperado no pagamento.';
      this.processingPayment = false;
    }
  }

  private pollForPixConfirmation(immediate: boolean): void {
    if (this.pollInterval) clearInterval(this.pollInterval);

    const check = () => {
      this.orderService.getOrderById(this.order!.id).subscribe({
        next: (o) => {
          if (o.status === OrderStatus.Paid) {
            if (this.pollInterval) clearInterval(this.pollInterval);
            this.order = o;
            this.pixConfirmed = true;
            setTimeout(() => this.router.navigate(['/my-tickets']), 2000);
          }
        }
      });
    };

    if (immediate) { check(); return; }
    this.pollInterval = setInterval(check, 4000);
  }

  copyPixCode(): void {
    navigator.clipboard.writeText(this.pixCopyPaste).then(() =>
      this.snackBar.open(this.translate.instant('CHECKOUT.PIX_COPIED'), 'OK', { duration: 2000 })
    );
  }
}
