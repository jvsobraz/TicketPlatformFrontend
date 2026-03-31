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
    MatProgressSpinnerModule, MatSelectModule, MatFormFieldModule, MatSnackBarModule
  ],
  template: `
    <div class="container pay-container">
      @if (loading) {
        <div class="center-spinner"><mat-progress-spinner mode="indeterminate" /></div>
      } @else if (error) {
        <mat-card class="error-card">
          <mat-icon>error_outline</mat-icon>
          <h2>Link inválido ou expirado</h2>
          <p>Este link de pagamento não está mais disponível.</p>
          <a mat-raised-button color="primary" routerLink="/events">Ver Eventos</a>
        </mat-card>
      } @else if (link) {
        <div class="pay-layout">
          <!-- Header -->
          <div class="pay-header">
            <mat-icon class="logo-icon">confirmation_number</mat-icon>
            <h1>Link de Pagamento</h1>
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
                  <span><strong>Evento:</strong> {{ link.eventTitle }}</span>
                </div>
              }
              @if (link.ticketTypeName) {
                <div class="info-row">
                  <mat-icon>confirmation_number</mat-icon>
                  <span><strong>Ingresso:</strong> {{ link.ticketTypeName }}</span>
                </div>
              }
              @if (link.expiresAt) {
                <div class="info-row">
                  <mat-icon>schedule</mat-icon>
                  <span><strong>Válido até:</strong> {{ link.expiresAt | date:'dd/MM/yyyy HH:mm' }}</span>
                </div>
              }
              @if (link.maxUses) {
                <div class="info-row">
                  <mat-icon>toll</mat-icon>
                  <span><strong>Usos restantes:</strong> {{ link.maxUses - link.usedCount }}</span>
                </div>
              }
            </div>

            @if (!isAuthenticated) {
              <div class="auth-notice">
                <mat-icon>login</mat-icon>
                <p>Faça login para continuar com a compra</p>
                <a mat-raised-button color="primary" [routerLink]="['/login']" [queryParams]="{returnUrl: currentUrl}">
                  Fazer Login
                </a>
                <a mat-button [routerLink]="['/register']">Criar Conta</a>
              </div>
            } @else {
              <div class="checkout-options">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Quantidade</mat-label>
                  <mat-select [(ngModel)]="quantity">
                    @for (n of [1,2,3,4,5]; track n) {
                      <mat-option [value]="n">{{ n }} ingresso{{ n > 1 ? 's' : '' }}</mat-option>
                    }
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Forma de Pagamento</mat-label>
                  <mat-select [(ngModel)]="paymentMethod">
                    <mat-option [value]="PaymentMethod.Card">💳 Cartão de Crédito</mat-option>
                    <mat-option [value]="PaymentMethod.Pix">⚡ PIX</mat-option>
                  </mat-select>
                </mat-form-field>

                <button mat-raised-button color="primary" class="full-width buy-btn"
                        (click)="proceed()" [disabled]="proceeding">
                  @if (proceeding) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                  @else { <mat-icon>shopping_cart</mat-icon> Comprar Agora }
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
    .custom-message { background:#ede7f6; border-radius:8px; padding:16px; display:flex; align-items:flex-start; gap:12px; margin-bottom:20px;
      mat-icon { color:#6200ea; flex-shrink:0; }
      p { margin:0; font-style:italic; color:#4527a0; }
    }
    .link-info { display:flex; flex-direction:column; gap:8px; margin-bottom:24px; padding:16px; background:#f5f5f5; border-radius:8px; }
    .info-row { display:flex; align-items:center; gap:8px; font-size:0.9rem;
      mat-icon { font-size:18px; width:18px; height:18px; color:#6200ea; }
    }
    .auth-notice { text-align:center; padding:24px; display:flex; flex-direction:column; align-items:center; gap:12px;
      mat-icon { font-size:40px; width:40px; height:40px; color:#bdbdbd; }
      p { color:#757575; margin:0; }
    }
    .checkout-options { display:flex; flex-direction:column; gap:16px; }
    .full-width { width:100%; }
    .buy-btn { height:52px; font-size:1rem; }
    .error-card { text-align:center; padding:48px; display:flex; flex-direction:column; align-items:center; gap:16px;
      mat-icon { font-size:56px; width:56px; height:56px; color:#e53935; }
      h2 { margin:0; }
      p { color:#757575; }
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
        this.snackBar.open(err?.error?.message || 'Erro ao criar pedido.', 'OK', { duration: 4000 });
      }
    });
  }
}
