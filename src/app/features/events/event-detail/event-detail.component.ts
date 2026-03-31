import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventService } from '../../../core/services/event.service';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { SocialProofService } from '../../../core/services/social-proof.service';
import { WaitlistService } from '../../../core/services/waitlist.service';
import { FlashSaleService } from '../../../core/services/flash-sale.service';
import { EventResponse, TicketTypeResponse, PaymentMethod, OrderItemRequest, SocialProofResponse, FlashSaleResponse } from '../../../core/models';

interface CartItem {
  ticketType: TicketTypeResponse;
  quantity: number;
}

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatButtonModule, MatCardModule, MatIconModule,
    MatProgressSpinnerModule, MatSnackBarModule,
    MatDividerModule, MatRadioModule, MatSelectModule, MatFormFieldModule
  ],
  template: `
    @if (loading) {
      <div class="loading-overlay" style="min-height: 100vh">
        <mat-progress-spinner mode="indeterminate" />
      </div>
    } @else if (event) {
      <!-- Event Banner -->
      <div class="event-banner" [style.background-image]="'url(' + (event.imageUrl || 'assets/default-event.jpg') + ')'">
        <div class="banner-overlay">
          <div class="container">
            <span class="category-badge" *ngIf="event.category">{{ event.category }}</span>
            <h1>{{ event.title }}</h1>
            <div class="event-meta-list">
              <span><mat-icon>calendar_today</mat-icon> {{ event.dateTime | date:'EEEE, dd/MM/yyyy - HH:mm':'':'pt' }}</span>
              <span><mat-icon>location_on</mat-icon> {{ event.venue }}, {{ event.city }}/{{ event.state }}</span>
              <span><mat-icon>person</mat-icon> Organizado por {{ event.organizerName }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Social Proof Banner -->
      @if (socialProof && (socialProof.viewersNow > 1 || socialProof.ticketsSoldLastHour > 0)) {
        <div class="social-proof-bar">
          @if (socialProof.viewersNow > 1) {
            <span><mat-icon>visibility</mat-icon> {{ socialProof.viewersNow }} pessoas vendo agora</span>
          }
          @if (socialProof.ticketsSoldLastHour > 0) {
            <span><mat-icon>local_fire_department</mat-icon> {{ socialProof.ticketsSoldLastHour }} ingressos vendidos na última hora</span>
          }
          @if (socialProof.urgencyMessage) {
            <span class="urgency"><mat-icon>warning</mat-icon> {{ socialProof.urgencyMessage }}</span>
          }
        </div>
      }

      <div class="container event-content">
        <div class="event-layout">
          <!-- Description -->
          <div class="event-description-section">
            <h2>Sobre o Evento</h2>
            <p>{{ event.description }}</p>

            <h3>Local</h3>
            <p><mat-icon>location_on</mat-icon> {{ event.address }}, {{ event.city }}/{{ event.state }}</p>
          </div>

          <!-- Ticket Purchase -->
          <div class="ticket-section">
            <mat-card class="ticket-card">
              <mat-card-header>
                <mat-card-title>Ingressos</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                @for (tt of event.ticketTypes; track tt.id) {
                  @if (tt.isActive && tt.quantityAvailable > 0) {
                    <div class="ticket-type" [class.has-flash]="getFlashSale(tt.id)">
                      @if (getFlashSale(tt.id); as flash) {
                        <div class="flash-banner">
                          <span>⚡ PROMOÇÃO FLASH</span>
                          <span class="flash-countdown">{{ getCountdown(flash.endAt) }}</span>
                        </div>
                      }
                      <div class="ticket-info">
                        <strong>{{ tt.name }}</strong>
                        @if (tt.description) { <p>{{ tt.description }}</p> }
                        <div class="ticket-price">
                          @if (getFlashSale(tt.id); as flash) {
                            <span class="price-original">{{ tt.price | currency:'BRL' }}</span>
                            <span class="price price-flash">{{ flash.flashPrice | currency:'BRL' }}</span>
                            <span class="flash-discount">-{{ flash.discountType === 0 ? flash.discountValue + '%' : (flash.discountValue | currency:'BRL') }}</span>
                          } @else if (tt.price === 0) {
                            <span class="price-free">GRATUITO</span>
                          } @else {
                            <span class="price">{{ tt.price | currency:'BRL' }}</span>
                          }
                        </div>
                        <small class="availability">{{ tt.quantityAvailable }} disponíveis</small>
                      </div>
                      <mat-form-field appearance="outline" class="qty-select">
                        <mat-label>Qtd</mat-label>
                        <mat-select [(ngModel)]="quantities[tt.id]">
                          @for (n of getQuantityOptions(tt.quantityAvailable); track n) {
                            <mat-option [value]="n">{{ n }}</mat-option>
                          }
                        </mat-select>
                      </mat-form-field>
                    </div>
                    <mat-divider />
                  } @else if (tt.isActive && tt.quantityAvailable === 0) {
                    <div class="ticket-type sold-out">
                      <div class="ticket-info">
                        <strong>{{ tt.name }}</strong>
                        <span class="sold-out-badge">ESGOTADO</span>
                      </div>
                      <button mat-stroked-button color="accent" (click)="joinWaitlist(tt)" [disabled]="joiningWaitlist === tt.id">
                        @if (joiningWaitlist === tt.id) { <mat-progress-spinner diameter="16" mode="indeterminate" /> }
                        @else { <mat-icon>hourglass_top</mat-icon> Lista de Espera }
                      </button>
                    </div>
                    <mat-divider />
                  }
                }

                @if (totalItems > 0) {
                  <div class="order-summary">
                    <strong>Resumo:</strong>
                    @for (item of cartItems; track item.ticketType.id) {
                      <div class="summary-line">
                        <span>{{ item.quantity }}x {{ item.ticketType.name }}</span>
                        <span>{{ item.ticketType.price * item.quantity | currency:'BRL' }}</span>
                      </div>
                    }
                    <mat-divider />
                    <div class="summary-total">
                      <strong>Total</strong>
                      <strong>{{ totalAmount | currency:'BRL' }}</strong>
                    </div>
                  </div>

                  <div class="payment-method">
                    <p><strong>Forma de Pagamento:</strong></p>
                    <mat-radio-group [(ngModel)]="selectedPaymentMethod" class="radio-group">
                      <mat-radio-button [value]="PaymentMethod.Card">
                        <mat-icon>credit_card</mat-icon> Cartão
                      </mat-radio-button>
                      <mat-radio-button [value]="PaymentMethod.Pix">
                        <mat-icon>pix</mat-icon> PIX
                      </mat-radio-button>
                    </mat-radio-group>
                  </div>
                }
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" class="full-width buy-btn"
                        [disabled]="totalItems === 0 || buying"
                        (click)="buyTickets()">
                  @if (buying) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                  @else { <mat-icon>shopping_cart</mat-icon> Comprar Ingressos }
                </button>
                @if (!authService.isAuthenticated()) {
                  <p class="login-hint">
                    <a routerLink="/login">Entre</a> ou <a routerLink="/register">cadastre-se</a> para comprar
                  </p>
                }
              </mat-card-actions>
            </mat-card>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .event-banner { height: 400px; background-size: cover; background-position: center; position: relative; }
    .banner-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
      display: flex; align-items: flex-end; padding-bottom: 32px; color: white;
      h1 { font-size: 2rem; font-weight: 700; margin: 8px 0; } }
    .event-meta-list { display: flex; gap: 16px; flex-wrap: wrap;
      span { display: flex; align-items: center; gap: 4px; } }
    .event-content { padding: 32px 16px; }
    .event-layout { display: grid; grid-template-columns: 1fr 380px; gap: 32px;
      @media (max-width: 900px) { grid-template-columns: 1fr; } }
    .ticket-card { position: sticky; top: 80px; }
    .ticket-type { display: flex; justify-content: space-between; align-items: flex-start; padding: 16px 0; }
    .ticket-info { flex: 1; p { color: #616161; font-size: 0.9rem; margin: 4px 0; } }
    .availability { color: #757575; }
    .qty-select { width: 100px; margin-left: 16px; }
    .order-summary { padding: 16px 0; }
    .summary-line, .summary-total { display: flex; justify-content: space-between; padding: 4px 0; }
    .summary-total { padding-top: 8px; }
    .payment-method { padding: 16px 0; }
    .radio-group { display: flex; gap: 16px; }
    .buy-btn { height: 48px; font-size: 1rem; }
    .login-hint { text-align: center; font-size: 0.9rem; color: #757575; margin-top: 8px; a { color: #6200ea; } }
    .category-badge { background: rgba(255,255,255,0.2); color: white; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; }
    .social-proof-bar { background: #1a1a2e; color: white; padding: 10px 24px; display: flex; gap: 24px; flex-wrap: wrap; font-size: 0.88rem;
      span { display: flex; align-items: center; gap: 6px; mat-icon { font-size: 16px; width: 16px; height: 16px; } }
      .urgency { color: #ff6d00; font-weight: 600; }
    }
    .sold-out { opacity: 0.7; }
    .sold-out-badge { display: inline-block; background: #e53935; color: white; font-size: 0.75rem; padding: 2px 8px; border-radius: 4px; margin-top: 4px; }
    .has-flash { border-left: 3px solid #f44336; padding-left: 12px; }
    .flash-banner { background: #f44336; color: white; padding: 4px 10px; font-size: 0.78rem; font-weight: 700;
      display: flex; justify-content: space-between; align-items: center; border-radius: 4px 4px 0 0; margin: -16px -0px 8px;
      .flash-countdown { font-family: monospace; font-size: 0.9rem; } }
    .price-original { text-decoration: line-through; color: #9e9e9e; font-size: 0.9rem; margin-right: 6px; }
    .price-flash { color: #f44336; font-weight: 700; }
    .flash-discount { background: #f44336; color: white; font-size: 0.72rem; padding: 1px 6px; border-radius: 10px; margin-left: 6px; font-weight: 600; }
  `]
})
export class EventDetailComponent implements OnInit, OnDestroy {
  private eventService = inject(EventService);
  private orderService = inject(OrderService);
  private socialProofService = inject(SocialProofService);
  private waitlistService = inject(WaitlistService);
  private flashSaleService = inject(FlashSaleService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  authService = inject(AuthService);

  event: EventResponse | null = null;
  socialProof: SocialProofResponse | null = null;
  flashSales: FlashSaleResponse[] = [];
  loading = true;
  buying = false;
  joiningWaitlist: number | null = null;
  quantities: Record<number, number> = {};
  selectedPaymentMethod = PaymentMethod.Card;
  PaymentMethod = PaymentMethod;

  private countdownTimer?: ReturnType<typeof setInterval>;
  countdownTick = 0; // increments every second to trigger change detection

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.eventService.getEventById(id).subscribe({
      next: (event) => {
        this.event = event;
        event.ticketTypes.forEach(tt => this.quantities[tt.id] = 0);
        this.loading = false;
        this.socialProofService.trackView(id).subscribe();
        this.socialProofService.getSocialProof(id).subscribe({
          next: (sp) => { this.socialProof = sp; }
        });
        this.flashSaleService.getByEvent(id).subscribe({
          next: (sales) => {
            this.flashSales = sales;
            if (sales.length > 0) {
              this.countdownTimer = setInterval(() => { this.countdownTick++; }, 1000);
            }
          }
        });
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/events']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  }

  getFlashSale(ticketTypeId: number): FlashSaleResponse | null {
    return this.flashSales.find(f => f.ticketTypeId === ticketTypeId && f.isRunning) ?? null;
  }

  getCountdown(endAt: string): string {
    void this.countdownTick; // read to trigger re-evaluation
    const diff = Math.max(0, new Date(endAt).getTime() - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }

  joinWaitlist(tt: TicketTypeResponse): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    this.joiningWaitlist = tt.id;
    this.waitlistService.joinWaitlist({ ticketTypeId: tt.id, quantity: 1 }).subscribe({
      next: () => {
        this.joiningWaitlist = null;
        this.snackBar.open('Você entrou na lista de espera! Avisaremos quando houver vagas.', 'OK', { duration: 5000, panelClass: 'success-snackbar' });
      },
      error: (err) => {
        this.joiningWaitlist = null;
        this.snackBar.open(err.error?.error || 'Erro ao entrar na fila', 'Fechar', { duration: 3000 });
      }
    });
  }

  get cartItems(): CartItem[] {
    if (!this.event) return [];
    return this.event.ticketTypes
      .filter(tt => this.quantities[tt.id] > 0)
      .map(tt => ({ ticketType: tt, quantity: this.quantities[tt.id] }));
  }

  get totalItems(): number {
    return this.cartItems.reduce((sum, i) => sum + i.quantity, 0);
  }

  get totalAmount(): number {
    return this.cartItems.reduce((sum, i) => sum + i.ticketType.price * i.quantity, 0);
  }

  getQuantityOptions(max: number): number[] {
    return Array.from({ length: Math.min(max, 10) + 1 }, (_, i) => i);
  }

  buyTickets(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    const items: OrderItemRequest[] = this.cartItems.map(i => ({
      ticketTypeId: i.ticketType.id,
      quantity: i.quantity
    }));

    this.buying = true;
    this.orderService.createOrder({ items, paymentMethod: this.selectedPaymentMethod }).subscribe({
      next: (order) => {
        this.buying = false;
        this.router.navigate(['/checkout', order.id]);
      },
      error: (err) => {
        this.buying = false;
        this.snackBar.open(err.error?.error || 'Erro ao criar pedido', 'Fechar',
          { duration: 4000, panelClass: 'error-snackbar' });
      }
    });
  }
}
