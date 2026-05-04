import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
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
import { ReviewService, EventReviewSummary } from '../../../core/services/review.service';
import { SeatMapService, SeatMap } from '../../../core/services/seat-map.service';
import { SeatMapComponent } from '../../seat-map/seat-map.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
    MatDividerModule, MatRadioModule, MatSelectModule, MatFormFieldModule,
    SeatMapComponent,
    TranslateModule
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
              <span><mat-icon>person</mat-icon> {{ 'EVENT_DETAIL.ORGANIZED_BY' | translate }} {{ event.organizerName }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Social Proof Banner -->
      @if (socialProof && (socialProof.viewersNow > 1 || socialProof.ticketsSoldLastHour > 0)) {
        <div class="social-proof-bar">
          @if (socialProof.viewersNow > 1) {
            <span><mat-icon>visibility</mat-icon> {{ socialProof.viewersNow }} {{ 'EVENT_DETAIL.WATCHING_NOW' | translate }}</span>
          }
          @if (socialProof.ticketsSoldLastHour > 0) {
            <span><mat-icon>local_fire_department</mat-icon> {{ socialProof.ticketsSoldLastHour }} {{ 'EVENT_DETAIL.SOLD_LAST_HOUR' | translate }}</span>
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
            <h2>{{ 'EVENT_DETAIL.ABOUT' | translate }}</h2>
            <p>{{ event.description }}</p>

            <h3>{{ 'EVENT_DETAIL.VENUE' | translate }}</h3>
            <p><mat-icon>location_on</mat-icon> {{ event.address }}, {{ event.city }}/{{ event.state }}</p>

            <!-- Share section -->
            <div class="share-section">
              <h3>{{ 'EVENT_DETAIL.SHARE' | translate }}</h3>
              <div class="share-buttons">
                <a mat-raised-button class="share-whatsapp" [href]="whatsappShareUrl()" target="_blank" rel="noopener">
                  <mat-icon>chat</mat-icon> {{ 'EVENT_DETAIL.SHARE_WHATSAPP' | translate }}
                </a>
                <button mat-stroked-button class="share-copy" (click)="copyLink()">
                  <mat-icon>link</mat-icon> {{ 'EVENT_DETAIL.COPY_LINK' | translate }}
                </button>
              </div>
            </div>

            <!-- Reviews section -->
            <div class="reviews-section">
              <h2>{{ 'EVENT_DETAIL.REVIEWS' | translate }}</h2>

              @if (reviewSummary()) {
                <div class="reviews-summary">
                  <div class="rating-big">
                    <span class="rating-number">{{ reviewSummary()!.averageRating | number:'1.1-1' }}</span>
                    <div class="stars-row">
                      @for (s of [1,2,3,4,5]; track s) {
                        <mat-icon class="star" [class.filled]="s <= reviewSummary()!.averageRating">star</mat-icon>
                      }
                    </div>
                    <span class="rating-count">{{ reviewSummary()!.totalReviews }} {{ 'EVENT_DETAIL.REVIEWS_COUNT' | translate }}</span>
                  </div>
                  <div class="rating-bars">
                    @for (star of [5,4,3,2,1]; track star) {
                      <div class="bar-row">
                        <span class="bar-label">{{ star }}</span>
                        <mat-icon class="bar-star">star</mat-icon>
                        <div class="bar-track">
                          <div class="bar-fill"
                               [style.width.%]="reviewSummary()!.totalReviews > 0
                                 ? (reviewSummary()!.ratingDistribution[star] || 0) / reviewSummary()!.totalReviews * 100
                                 : 0">
                          </div>
                        </div>
                        <span class="bar-count">{{ reviewSummary()!.ratingDistribution[star] || 0 }}</span>
                      </div>
                    }
                  </div>
                </div>

                <!-- Write review form -->
                @if (authService.isAuthenticated() && !reviewSubmitted()) {
                  <div class="write-review">
                    <h3>{{ 'EVENT_DETAIL.WRITE_REVIEW' | translate }}</h3>
                    <div class="star-picker">
                      @for (s of [1,2,3,4,5]; track s) {
                        <mat-icon class="star pick" [class.filled]="s <= newRating"
                                  (click)="newRating = s" (mouseover)="hoverRating = s"
                                  (mouseleave)="hoverRating = 0"
                                  [class.hover]="s <= hoverRating">star</mat-icon>
                      }
                    </div>
                    <textarea class="review-textarea" [(ngModel)]="newComment"
                              [placeholder]="'EVENT_DETAIL.REVIEW_PLACEHOLDER' | translate" rows="3"></textarea>
                    <button mat-raised-button color="primary" (click)="submitReview()"
                            [disabled]="newRating === 0 || submittingReview()">
                      @if (submittingReview()) { <mat-progress-spinner diameter="18" mode="indeterminate" /> }
                      @else { <mat-icon>send</mat-icon> {{ 'EVENT_DETAIL.SUBMIT_REVIEW' | translate }} }
                    </button>
                  </div>
                }

                <!-- Review list -->
                <div class="reviews-list">
                  @for (r of reviewSummary()!.reviews; track r.id) {
                    <div class="review-item">
                      <div class="review-header">
                        <div class="review-avatar">{{ r.userName.charAt(0).toUpperCase() }}</div>
                        <div>
                          <strong>{{ r.userName }}</strong>
                          <div class="review-stars">
                            @for (s of [1,2,3,4,5]; track s) {
                              <mat-icon class="star sm" [class.filled]="s <= r.rating">star</mat-icon>
                            }
                          </div>
                        </div>
                        <small class="review-date">{{ r.createdAt | date:'dd/MM/yyyy' }}</small>
                      </div>
                      @if (r.comment) { <p class="review-comment">{{ r.comment }}</p> }
                    </div>
                  }
                </div>
              } @else {
                <p class="no-reviews">{{ 'EVENT_DETAIL.NO_REVIEWS' | translate }}</p>
              }
            </div>
          </div>

          <!-- Seat Map -->
          @if (hasSeatMap()) {
            <div class="seat-map-section">
              <h2>{{ 'EVENT_DETAIL.SEAT_MAP' | translate }}</h2>
              <app-seat-map [eventId]="event!.id" (reserved)="onSeatsReserved($event)" />
            </div>
          }

          <!-- Ticket Purchase -->
          <div class="ticket-section">
            <mat-card class="ticket-card">
              <mat-card-header>
                <mat-card-title>{{ 'EVENT_DETAIL.TICKETS_TITLE' | translate }}</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                @for (tt of event.ticketTypes; track tt.id) {
                  @if (tt.isActive && tt.quantityAvailable > 0) {
                    <div class="ticket-type" [class.has-flash]="getFlashSale(tt.id)">
                      @if (getFlashSale(tt.id); as flash) {
                        <div class="flash-banner">
                          <span>⚡ {{ 'EVENT_DETAIL.FLASH_SALE_LABEL' | translate }}</span>
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
                            <span class="price-free">{{ 'EVENT_DETAIL.FREE' | translate }}</span>
                          } @else {
                            <span class="price">{{ tt.price | currency:'BRL' }}</span>
                          }
                        </div>
                        <small class="availability">{{ tt.quantityAvailable }} {{ 'EVENT_DETAIL.AVAILABLE' | translate }}</small>
                      </div>
                      <mat-form-field appearance="outline" class="qty-select">
                        <mat-label>{{ 'EVENT_DETAIL.QUANTITY' | translate }}</mat-label>
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
                        <span class="sold-out-badge">{{ 'EVENT_DETAIL.SOLD_OUT' | translate }}</span>
                      </div>
                      <button mat-stroked-button color="accent" (click)="joinWaitlist(tt)" [disabled]="joiningWaitlist === tt.id">
                        @if (joiningWaitlist === tt.id) { <mat-progress-spinner diameter="16" mode="indeterminate" /> }
                        @else { <mat-icon>hourglass_top</mat-icon> {{ 'EVENT_DETAIL.WAITLIST_BTN' | translate }} }
                      </button>
                    </div>
                    <mat-divider />
                  }
                }

                @if (totalItems > 0) {
                  <div class="order-summary">
                    <strong>{{ 'EVENT_DETAIL.SUMMARY' | translate }}</strong>
                    @for (item of cartItems; track item.ticketType.id) {
                      <div class="summary-line">
                        <span>{{ item.quantity }}x {{ item.ticketType.name }}</span>
                        <span>{{ item.ticketType.price * item.quantity | currency:'BRL' }}</span>
                      </div>
                    }
                    <mat-divider />
                    <div class="summary-total">
                      <strong>{{ 'EVENT_DETAIL.TOTAL' | translate }}</strong>
                      <strong>{{ totalAmount | currency:'BRL' }}</strong>
                    </div>
                  </div>

                  <div class="payment-method">
                    <p><strong>{{ 'EVENT_DETAIL.PAYMENT_METHOD' | translate }}</strong></p>
                    <mat-radio-group [(ngModel)]="selectedPaymentMethod" class="radio-group">
                      <mat-radio-button [value]="PaymentMethod.Card">
                        <mat-icon>credit_card</mat-icon> {{ 'EVENT_DETAIL.CARD' | translate }}
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
                  @else { <mat-icon>shopping_cart</mat-icon> {{ 'EVENT_DETAIL.BUY_TICKETS' | translate }} }
                </button>
                @if (!authService.isAuthenticated()) {
                  <p class="login-hint">
                    <a routerLink="/login">{{ 'EVENT_DETAIL.LOGIN_TO_BUY' | translate }}</a> {{ 'COMMON.OR' | translate }} <a routerLink="/register">{{ 'EVENT_DETAIL.REGISTER_TO_BUY' | translate }}</a> {{ 'EVENT_DETAIL.TO_BUY' | translate }}
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
    .ticket-info { flex: 1; p { color: var(--text-secondary); font-size: 0.9rem; margin: 4px 0; } }
    .availability { color: var(--text-secondary); }
    .qty-select { width: 100px; margin-left: 16px; }
    .order-summary { padding: 16px 0; }
    .summary-line, .summary-total { display: flex; justify-content: space-between; padding: 4px 0; }
    .summary-total { padding-top: 8px; }
    .payment-method { padding: 16px 0; }
    .radio-group { display: flex; gap: 16px; }
    .buy-btn { height: 48px; font-size: 1rem; }
    .login-hint { text-align: center; font-size: 0.9rem; color: var(--text-secondary); margin-top: 8px; a { color: var(--primary); } }
    .category-badge { background: rgba(255,255,255,0.2); color: white; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; }
    .social-proof-bar { background: var(--surface-2); color: var(--text-primary); padding: 10px 24px; display: flex; gap: 24px; flex-wrap: wrap; font-size: 0.88rem;
      span { display: flex; align-items: center; gap: 6px; mat-icon { font-size: 16px; width: 16px; height: 16px; } }
      .urgency { color: #ff6d00; font-weight: 600; }
    }
    .sold-out { opacity: 0.7; }
    .sold-out-badge { display: inline-block; background: #e53935; color: white; font-size: 0.75rem; padding: 2px 8px; border-radius: 4px; margin-top: 4px; }
    .has-flash { border-left: 3px solid #f44336; padding-left: 12px; }
    .flash-banner { background: #f44336; color: white; padding: 4px 10px; font-size: 0.78rem; font-weight: 700;
      display: flex; justify-content: space-between; align-items: center; border-radius: 4px 4px 0 0; margin: -16px -0px 8px;
      .flash-countdown { font-family: monospace; font-size: 0.9rem; } }
    .price-original { text-decoration: line-through; color: var(--text-hint); font-size: 0.9rem; margin-right: 6px; }
    .price-flash { color: #f44336; font-weight: 700; }
    .flash-discount { background: #f44336; color: white; font-size: 0.72rem; padding: 1px 6px; border-radius: 10px; margin-left: 6px; font-weight: 600; }
    .share-section { margin-top: 24px; h3 { font-size: 1rem; font-weight: 700; margin: 0 0 12px; } }
    .share-buttons { display: flex; gap: 10px; flex-wrap: wrap; }
    .share-whatsapp { background: #25d366 !important; color: white !important; border-radius: 8px !important; text-decoration: none; }
    .share-copy { border-radius: 8px !important; }

    /* Reviews */
    .reviews-section { margin-top: 32px; h2 { font-size: 1.2rem; font-weight: 800; margin: 0 0 16px; } }

    .reviews-summary {
      display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 24px;
      background: var(--surface-2); border-radius: var(--radius-md); padding: 16px;
    }

    .rating-big {
      display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 100px;
      .rating-number { font-size: 2.8rem; font-weight: 800; color: var(--primary); line-height: 1; }
      .rating-count { font-size: 0.78rem; color: var(--text-hint); }
    }

    .stars-row, .review-stars { display: flex; }

    .star {
      font-size: 20px; width: 20px; height: 20px; color: var(--border);
      &.filled { color: #f59e0b; }
      &.sm { font-size: 14px; width: 14px; height: 14px; }
      &.pick { font-size: 28px; width: 28px; height: 28px; cursor: pointer; transition: color 0.1s;
               &.hover { color: #fbbf24; } }
    }

    .rating-bars { flex: 1; display: flex; flex-direction: column; gap: 4px; justify-content: center; }
    .bar-row { display: flex; align-items: center; gap: 6px; font-size: 0.78rem;
      .bar-label { width: 10px; text-align: right; }
      .bar-star { font-size: 12px; width: 12px; height: 12px; color: #f59e0b; }
      .bar-track { flex: 1; height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }
      .bar-fill { height: 100%; background: #f59e0b; border-radius: 3px; transition: width 0.3s; }
      .bar-count { width: 20px; color: var(--text-hint); }
    }

    .write-review {
      background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md);
      padding: 16px; margin-bottom: 20px;
      h3 { font-size: 0.95rem; font-weight: 700; margin: 0 0 10px; }
    }

    .star-picker { display: flex; gap: 2px; margin-bottom: 12px; }

    .review-textarea {
      width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border);
      font-family: inherit; font-size: 0.9rem; resize: vertical; margin-bottom: 12px;
      background: var(--background); color: var(--text-primary);
      &:focus { outline: none; border-color: var(--border-focus); }
    }

    .reviews-list { display: flex; flex-direction: column; gap: 12px; }

    .review-item {
      background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 14px;
    }

    .review-header { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 6px; }

    .review-avatar {
      width: 36px; height: 36px; border-radius: 50%; background: var(--primary);
      color: white; display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 0.9rem; flex-shrink: 0;
    }

    .review-date { margin-left: auto; font-size: 0.72rem; color: var(--text-hint); white-space: nowrap; }

    .review-comment { margin: 0; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; }

    .no-reviews { color: var(--text-hint); font-size: 0.9rem; }
    .seat-map-section { margin-top: 32px; h2 { font-size: 1.2rem; font-weight: 800; margin: 0 0 16px; } }
  `]
})
export class EventDetailComponent implements OnInit, OnDestroy {
  private eventService = inject(EventService);
  private orderService = inject(OrderService);
  private socialProofService = inject(SocialProofService);
  private waitlistService = inject(WaitlistService);
  private flashSaleService = inject(FlashSaleService);
  private reviewService = inject(ReviewService);
  private seatMapService = inject(SeatMapService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);
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

  seatMap = signal<SeatMap | null>(null);
  hasSeatMap = signal(false);

  reviewSummary = signal<EventReviewSummary | null>(null);
  submittingReview = signal(false);
  reviewSubmitted = signal(false);
  newRating = 0;
  hoverRating = 0;
  newComment = '';

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
        this.reviewService.getReviews(id).subscribe({
          next: (summary) => this.reviewSummary.set(summary)
        });
        this.seatMapService.getByEvent(id).subscribe({
          next: (sm) => { this.seatMap.set(sm); this.hasSeatMap.set(true); },
          error: () => { this.hasSeatMap.set(false); }
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
        this.snackBar.open(this.translate.instant('EVENT_DETAIL.WAITLIST_SUCCESS'), 'OK', { duration: 5000, panelClass: 'success-snackbar' });
      },
      error: (err) => {
        this.joiningWaitlist = null;
        this.snackBar.open(err.error?.error || this.translate.instant('EVENT_DETAIL.WAITLIST_ERROR'), 'Fechar', { duration: 3000 });
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

  whatsappShareUrl(): string {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Confira este evento: ${this.event?.title} — `);
    return `https://wa.me/?text=${text}${url}`;
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href).then(() =>
      this.snackBar.open(this.translate.instant('EVENT_DETAIL.COPY_LINK_SUCCESS'), 'OK', { duration: 2000 })
    );
  }

  submitReview(): void {
    if (this.newRating === 0 || !this.event) return;
    this.submittingReview.set(true);
    this.reviewService.createReview(this.event.id, this.newRating, this.newComment || undefined).subscribe({
      next: () => {
        this.submittingReview.set(false);
        this.reviewSubmitted.set(true);
        this.snackBar.open(this.translate.instant('EVENT_DETAIL.REVIEW_SENT'), 'OK', { duration: 3000, panelClass: 'success-snackbar' });
        this.reviewService.getReviews(this.event!.id).subscribe(s => this.reviewSummary.set(s));
      },
      error: (err) => {
        this.submittingReview.set(false);
        this.snackBar.open(err.error?.error || this.translate.instant('EVENT_DETAIL.REVIEW_ERROR'), 'Fechar', { duration: 3000 });
      }
    });
  }

  onSeatsReserved(event: { seatIds: number[]; totalPrice: number }): void {
    this.snackBar.open(
      `${event.seatIds.length} ${this.translate.instant('EVENT_DETAIL.SEATS_RESERVED')}`,
      'OK', { duration: 5000, panelClass: 'success-snackbar' }
    );
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
        this.snackBar.open(err.error?.error || this.translate.instant('EVENT_DETAIL.ORDER_ERROR'), 'Fechar',
          { duration: 4000, panelClass: 'error-snackbar' });
      }
    });
  }
}
