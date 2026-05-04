import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SplitPaymentService, SplitPayment } from '../../core/services/split-payment.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-split',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatTooltipModule,
    TranslateModule
  ],
  template: `
    <div class="split-page">
      <div class="page-hero">
        <div class="container">
          <h1 class="page-title">{{ 'SPLIT.PAGE_TITLE_FULL' | translate }}</h1>
          @if (split()) {
            <p class="page-subtitle">{{ split()!.eventTitle }} · {{ split()!.ticketTypeName }}</p>
          }
        </div>
      </div>

      <div class="container split-content">
        @if (loading()) {
          <div class="center"><mat-progress-spinner mode="indeterminate" diameter="48"/></div>

        } @else if (!split()) {
          <div class="error-card">
            <mat-icon>link_off</mat-icon>
            <h2>{{ 'SPLIT.NOT_FOUND' | translate }}</h2>
            <p>{{ 'SPLIT.NOT_FOUND_DESC' | translate }}</p>
            <a mat-raised-button color="primary" routerLink="/events">{{ 'SPLIT.VIEW_EVENTS' | translate }}</a>
          </div>

        } @else {
          <!-- Status banner -->
          <div class="status-banner" [ngClass]="bannerClass()">
            <mat-icon>{{ bannerIcon() }}</mat-icon>
            <div>
              <strong>{{ split()!.statusLabel }}</strong>
              @if (split()!.status === 0) {
                <p>{{ split()!.paidCount }} {{ 'SPLIT.OF' | translate }} {{ split()!.maxParticipants }} {{ 'SPLIT.PAYMENTS_CONFIRMED' | translate }}</p>
              }
            </div>
            <span class="expires-tag">
              {{ 'SPLIT.EXPIRES' | translate }} {{ split()!.expiresAt | date:'dd/MM HH:mm' }}
            </span>
          </div>

          <!-- Summary -->
          <div class="summary-card">
            <div class="summary-row">
              <span>{{ 'SPLIT.ORDER_TOTAL' | translate }}</span>
              <strong>{{ split()!.totalAmount | currency:'BRL' }}</strong>
            </div>
            <div class="summary-row highlight">
              <span>{{ 'SPLIT.YOUR_PART' | translate }} ({{ split()!.totalQuantity / split()!.maxParticipants }} {{ split()!.totalQuantity / split()!.maxParticipants > 1 ? ('SPLIT.TICKETS_PLURAL' | translate) : ('SPLIT.TICKET' | translate) }})</span>
              <strong>{{ split()!.shareAmount | currency:'BRL' }}</strong>
            </div>
          </div>

          <!-- Share link -->
          @if (isCreator() && split()!.status === 0) {
            <div class="share-card">
              <h3><mat-icon>share</mat-icon> {{ 'SPLIT.SHARE_LINK' | translate }}</h3>
              <p>{{ 'SPLIT.SHARE_DESC' | translate }}</p>
              <div class="link-row">
                <span class="link-text">{{ split()!.shareUrl }}</span>
                <button mat-icon-button (click)="copyLink()" [matTooltip]="'SPLIT.COPY_LINK' | translate">
                  <mat-icon>content_copy</mat-icon>
                </button>
                <button mat-icon-button (click)="shareLink()" [matTooltip]="'SPLIT.SHARE' | translate" *ngIf="canShare()">
                  <mat-icon>share</mat-icon>
                </button>
              </div>
            </div>
          }

          <!-- Participants -->
          <div class="participants-card">
            <h3><mat-icon>group</mat-icon> {{ 'SPLIT.PARTICIPANTS' | translate }} ({{ split()!.participants.length }}/{{ split()!.maxParticipants }})</h3>

            <!-- Filled spots -->
            @for (p of split()!.participants; track p.id) {
              <div class="participant-row" [ngClass]="participantClass(p.status)">
                <div class="participant-avatar">{{ initials(p.name) }}</div>
                <div class="participant-info">
                  <span class="participant-name">{{ p.name || p.email || ('SPLIT.PARTICIPANT_DEFAULT' | translate) }}</span>
                  <span class="participant-amount">{{ p.amount | currency:'BRL' }}</span>
                </div>
                <div class="participant-status">
                  <mat-icon>{{ p.status === 1 ? 'check_circle' : p.status === 2 ? 'cancel' : 'schedule' }}</mat-icon>
                  <span>{{ p.statusLabel }}</span>
                </div>

                <!-- Payment button for current user's pending slot -->
                @if (isMySlot(p) && p.status === 0 && p.stripeClientSecret) {
                  <button mat-raised-button color="primary" class="pay-btn" (click)="goToPay(p.stripeClientSecret!)">
                    <mat-icon>payment</mat-icon> {{ 'SPLIT.PAY_AMOUNT' | translate }} {{ p.amount | currency:'BRL' }}
                  </button>
                }
              </div>
            }

            <!-- Empty spots -->
            @for (n of emptySlots(); track n) {
              <div class="participant-row empty">
                <div class="participant-avatar empty-avatar"><mat-icon>person_outline</mat-icon></div>
                <div class="participant-info">
                  <span class="participant-name">{{ 'SPLIT.SLOT_AVAILABLE' | translate }}</span>
                  <span class="participant-amount">{{ split()!.shareAmount | currency:'BRL' }}</span>
                </div>
                @if (!isParticipant() && !isCreator() && split()!.status === 0) {
                  <button mat-raised-button color="accent" class="join-btn" (click)="joinAndPay()" [disabled]="joining()">
                    @if (joining()) { <mat-progress-spinner diameter="16" mode="indeterminate"/> }
                    @else { <mat-icon>add</mat-icon> {{ 'SPLIT.JOIN' | translate }} }
                  </button>
                }
              </div>
            }
          </div>

          <!-- My payment section (after joining) -->
          @if (myParticipant() && myParticipant()!.status === 0 && myParticipant()!.stripeClientSecret) {
            <div class="payment-card">
              <h3><mat-icon>payment</mat-icon> {{ 'SPLIT.PAY' | translate }}</h3>
              <p>{{ 'SPLIT.PAYMENT_DESC_PREFIX' | translate }} <strong>{{ myParticipant()!.amount | currency:'BRL' }}</strong>.</p>
              <button mat-raised-button color="primary" class="pay-full-btn"
                      (click)="goToPay(myParticipant()!.stripeClientSecret!)">
                <mat-icon>credit_card</mat-icon> {{ 'SPLIT.PAY_CARD' | translate }}
              </button>
            </div>
          }

          <!-- Success state -->
          @if (split()!.status === 1) {
            <div class="success-card">
              <mat-icon>celebration</mat-icon>
              <h2>{{ 'SPLIT.COMPLETE' | translate }}</h2>
              <p>{{ 'SPLIT.COMPLETE_DESC' | translate }}</p>
              <a mat-raised-button color="primary" routerLink="/my-tickets">
                <mat-icon>confirmation_number</mat-icon> {{ 'SPLIT.VIEW_TICKETS' | translate }}
              </a>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .split-page { padding-top: 64px; }

    .page-hero {
      background: linear-gradient(135deg, #00695c 0%, #009688 100%);
      padding: 32px 0 24px;
    }

    .page-title { font-size: 1.6rem; font-weight: 800; color: white; margin: 0 0 4px; }
    .page-subtitle { color: rgba(255,255,255,.75); margin: 0; }

    .split-content { padding: 24px 16px 64px; max-width: 580px; display: flex; flex-direction: column; gap: 16px; }
    .center { display: flex; justify-content: center; padding: 48px; }

    /* Error */
    .error-card {
      display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 48px 24px; text-align: center;
      mat-icon { font-size: 64px; width: 64px; height: 64px; color: var(--text-hint); }
      h2 { margin: 0; }
      p { margin: 0; color: var(--text-secondary); }
    }

    /* Status banner */
    .status-banner {
      display: flex; align-items: center; gap: 12px; padding: 14px 16px;
      border-radius: var(--radius-sm); border: 1px solid;
      mat-icon { flex-shrink: 0; }
      div { flex: 1; strong { display: block; } p { margin: 2px 0 0; font-size: 0.82rem; } }
      .expires-tag { font-size: 0.75rem; color: var(--text-hint); white-space: nowrap; }

      &.open     { background: var(--info-bg);    border-color: #1565c0; color: var(--info-text); }
      &.complete { background: var(--success-bg); border-color: #4caf50; color: var(--success-text); }
      &.expired  { background: var(--surface-2);  border-color: var(--border); color: var(--text-secondary); }
    }

    /* Summary */
    .summary-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius-md); padding: 16px 20px; display: flex; flex-direction: column; gap: 8px;
    }
    .summary-row {
      display: flex; justify-content: space-between; align-items: center;
      font-size: 0.9rem; color: var(--text-secondary);
      &.highlight { font-size: 1rem; color: var(--text-primary); padding-top: 8px; border-top: 1px solid var(--border); }
    }

    /* Share */
    .share-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px 20px;
      h3 { display: flex; align-items: center; gap: 8px; margin: 0 0 4px; font-size: 0.95rem;
           mat-icon { color: var(--primary); font-size: 18px; width: 18px; height: 18px; } }
      p { font-size: 0.82rem; color: var(--text-secondary); margin: 0 0 12px; }
    }

    .link-row {
      display: flex; align-items: center; gap: 8px;
      background: var(--surface-2); border-radius: 8px; padding: 8px 12px;
    }
    .link-text { flex: 1; font-size: 0.78rem; font-family: monospace; color: var(--text-secondary); word-break: break-all; }

    /* Participants */
    .participants-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px 20px;
      h3 { display: flex; align-items: center; gap: 8px; margin: 0 0 16px; font-size: 0.95rem;
           mat-icon { color: var(--primary); font-size: 18px; width: 18px; height: 18px; } }
    }

    .participant-row {
      display: flex; align-items: center; gap: 12px; padding: 10px 0;
      border-bottom: 1px solid var(--border);
      &:last-child { border-bottom: none; }
      &.paid   { background: transparent; }
      &.pending { background: transparent; }
      &.empty  { opacity: 0.6; }
    }

    .participant-avatar {
      width: 36px; height: 36px; border-radius: 50%; background: var(--primary);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.8rem; font-weight: 700; color: white; flex-shrink: 0;
    }

    .empty-avatar { background: var(--surface-2); mat-icon { color: var(--text-hint); font-size: 20px; width: 20px; height: 20px; } }

    .participant-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .participant-name { font-size: 0.88rem; font-weight: 600; }
    .participant-amount { font-size: 0.78rem; color: var(--text-hint); }

    .participant-status {
      display: flex; align-items: center; gap: 4px; font-size: 0.75rem;
      mat-icon { font-size: 16px; width: 16px; height: 16px; }
    }

    .participant-row.paid .participant-status { color: #4caf50; mat-icon { color: #4caf50; } }
    .participant-row.pending .participant-status { color: #ff9800; mat-icon { color: #ff9800; } }

    .pay-btn, .join-btn { height: 32px !important; font-size: 0.78rem !important; border-radius: 16px !important; }

    /* Payment card */
    .payment-card {
      background: var(--success-bg); border: 2px solid #4caf50; border-radius: var(--radius-md); padding: 20px;
      h3 { display: flex; align-items: center; gap: 8px; margin: 0 0 8px; color: var(--success-text);
           mat-icon { color: var(--success-text); font-size: 20px; width: 20px; height: 20px; } }
      p { margin: 0 0 16px; font-size: 0.9rem; color: var(--success-text); }
    }

    .pay-full-btn { height: 44px !important; border-radius: 22px !important; }

    /* Success */
    .success-card {
      background: var(--success-bg); border: 2px solid #4caf50; border-radius: var(--radius-md);
      padding: 32px 24px; display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center;
      mat-icon { font-size: 64px; width: 64px; height: 64px; color: var(--success-text); }
      h2 { margin: 0; color: var(--success-text); }
      p { margin: 0; color: var(--success-text); font-size: 0.9rem; }
    }
  `]
})
export class SplitComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private splitService = inject(SplitPaymentService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  loading = signal(true);
  joining = signal(false);
  split = signal<SplitPayment | null>(null);

  private token!: string;
  private currentUserId?: number;

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')!;
    this.currentUserId = this.authService.currentUser()?.id;
    this.load();
  }

  private load(): void {
    this.splitService.getByToken(this.token).subscribe({
      next: (s) => { this.split.set(s); this.loading.set(false); },
      error: () => { this.split.set(null); this.loading.set(false); }
    });
  }

  joinAndPay(): void {
    this.joining.set(true);
    this.splitService.joinAndPay(this.token).subscribe({
      next: (s) => { this.split.set(s); this.joining.set(false); },
      error: (e) => {
        this.snackBar.open(e.error?.error || this.translate.instant('SPLIT.JOIN_ERROR'), 'Fechar', { duration: 4000 });
        this.joining.set(false);
      }
    });
  }

  goToPay(clientSecret: string): void {
    // Redirect to Stripe-hosted payment or embedded checkout
    // For now navigate to a generic checkout page with client secret
    window.location.href = `/checkout-split?secret=${clientSecret}`;
  }

  copyLink(): void {
    navigator.clipboard.writeText(this.split()!.shareUrl).then(() =>
      this.snackBar.open(this.translate.instant('SPLIT.LINK_COPIED'), 'OK', { duration: 2000 })
    );
  }

  shareLink(): void {
    navigator.share({ title: this.translate.instant('SPLIT.SHARE_TITLE'), url: this.split()!.shareUrl });
  }

  canShare(): boolean { return 'share' in navigator; }

  isCreator(): boolean {
    return this.currentUserId === (this.split()?.participants[0]?.id ?? -1) ||
           this.authService.currentUser()?.id === this.currentUserId;
  }

  isParticipant(): boolean {
    return this.split()?.participants.some(p => p.id === this.currentUserId) ?? false;
  }

  myParticipant() {
    return this.split()?.participants.find(p => p.id === this.currentUserId) ?? null;
  }

  isMySlot(p: any): boolean { return p.userId === this.currentUserId; }

  emptySlots(): number[] {
    const s = this.split();
    if (!s) return [];
    const empty = s.maxParticipants - s.participants.length;
    return Array.from({ length: empty }, (_, i) => i);
  }

  bannerClass(): string {
    const status = this.split()?.status;
    if (status === 0) return 'open';
    if (status === 1) return 'complete';
    return 'expired';
  }

  bannerIcon(): string {
    const status = this.split()?.status;
    if (status === 1) return 'check_circle';
    if (status === 0) return 'group';
    return 'timer_off';
  }

  participantClass(status: number): string {
    if (status === 1) return 'paid';
    if (status === 2) return 'expired';
    return 'pending';
  }

  initials(name?: string): string {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}
