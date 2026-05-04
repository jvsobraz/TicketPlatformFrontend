import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { VirtualQueueService, QueueStatus } from '../../core/services/virtual-queue.service';

@Component({
  selector: 'app-queue',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule,
    TranslateModule
  ],
  template: `
    <div class="queue-page">
      <div class="page-hero">
        <div class="container">
          <a mat-icon-button routerLink="/events" class="back-btn"><mat-icon>arrow_back</mat-icon></a>
          <h1 class="page-title">{{ 'QUEUE.PAGE_TITLE' | translate }}</h1>
          @if (status()) {
            <p class="page-subtitle">{{ status()!.eventTitle }}</p>
          }
        </div>
      </div>

      <div class="container queue-content">
        @if (loading()) {
          <div class="center"><mat-progress-spinner mode="indeterminate" diameter="48"/></div>

        } @else if (!status()) {
          <!-- Join queue -->
          <div class="join-card fade-in">
            <div class="join-icon">
              <mat-icon>queue</mat-icon>
            </div>
            <h2>{{ 'QUEUE.JOIN_TITLE' | translate }}</h2>
            <p>{{ 'QUEUE.JOIN_DESC' | translate }} <strong>{{ 'QUEUE.JOIN_DESC_MINUTES' | translate }}</strong> {{ 'QUEUE.JOIN_DESC_SUFFIX' | translate }}</p>

            <div class="quantity-row">
              <span class="qty-label">{{ 'QUEUE.QUANTITY' | translate }}</span>
              <div class="qty-controls">
                <button mat-icon-button (click)="qty = qty > 1 ? qty - 1 : 1"><mat-icon>remove</mat-icon></button>
                <span class="qty-value">{{ qty }}</span>
                <button mat-icon-button (click)="qty = qty < 10 ? qty + 1 : 10"><mat-icon>add</mat-icon></button>
              </div>
            </div>

            <button mat-raised-button color="primary" class="join-btn" (click)="join()" [disabled]="joining()">
              @if (joining()) { <mat-progress-spinner diameter="20" mode="indeterminate"/> }
              @else { <mat-icon>queue</mat-icon> {{ 'QUEUE.JOIN_BTN' | translate }} }
            </button>
          </div>

        } @else {
          <!-- Queue status -->
          <div class="status-card fade-in" [ngClass]="statusClass()">

            <!-- Active: your turn! -->
            @if (status()!.status === 1) {
              <div class="active-header">
                <mat-icon class="pulse-icon">celebration</mat-icon>
                <h2>{{ 'QUEUE.YOUR_TURN' | translate }}</h2>
              </div>
              <p class="active-msg">{{ 'QUEUE.YOUR_TURN_DESC' | translate }} <strong>{{ status()!.secondsUntilExpiry }}</strong>{{ 'QUEUE.SECONDS' | translate }}</p>

              <div class="timer-ring">
                <svg viewBox="0 0 100 100" class="ring-svg">
                  <circle cx="50" cy="50" r="45" class="ring-bg"/>
                  <circle cx="50" cy="50" r="45" class="ring-progress"
                          [style.stroke-dashoffset]="timerDashOffset()"/>
                </svg>
                <div class="timer-text">
                  <span class="timer-seconds">{{ status()!.secondsUntilExpiry }}</span>
                  <span class="timer-unit">{{ 'QUEUE.SEC_UNIT' | translate }}</span>
                </div>
              </div>

              <a mat-raised-button color="primary" class="buy-btn"
                 [routerLink]="['/events', status()!.eventId]"
                 [queryParams]="{ queueToken: status()!.accessToken }">
                <mat-icon>confirmation_number</mat-icon> {{ 'QUEUE.BUY_NOW' | translate }}
              </a>

            } @else if (status()!.status === 0) {
              <!-- Waiting -->
              <div class="waiting-header">
                <mat-icon>hourglass_top</mat-icon>
                <h2>{{ 'QUEUE.WAITING' | translate }}</h2>
              </div>

              <div class="position-display">
                <span class="position-number">{{ status()!.position }}º</span>
                <span class="position-label">{{ 'QUEUE.POSITION_LABEL' | translate }}</span>
              </div>

              <p class="queue-size">{{ status()!.totalInQueue }} {{ 'QUEUE.IN_QUEUE' | translate }}</p>
              <p class="queue-hint">{{ 'QUEUE.KEEP_OPEN' | translate }}</p>

            } @else {
              <!-- Expired / completed -->
              <mat-icon class="done-icon">{{ status()!.status === 2 ? 'check_circle' : 'timer_off' }}</mat-icon>
              <h2>{{ status()!.statusLabel }}</h2>
              @if (status()!.status === 3) {
                <p>{{ 'QUEUE.EXPIRED_DESC' | translate }}</p>
                <button mat-raised-button color="primary" (click)="rejoin()">
                  <mat-icon>refresh</mat-icon> {{ 'QUEUE.REJOIN' | translate }}
                </button>
              }
            }

            @if (status()!.status < 2) {
              <button mat-stroked-button color="warn" class="leave-btn" (click)="leave()">
                <mat-icon>exit_to_app</mat-icon> {{ 'QUEUE.LEAVE' | translate }}
              </button>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .queue-page { padding-top: 64px; }

    .page-hero {
      background: linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%);
      padding: 32px 0 24px; display: flex; align-items: center; gap: 12px;
    }

    .page-hero .container { display: flex; flex-direction: column; gap: 4px; }
    .back-btn { color: white !important; align-self: flex-start; }
    .page-title { font-size: 1.6rem; font-weight: 800; color: white; margin: 0; }
    .page-subtitle { color: rgba(255,255,255,.75); margin: 0; }

    .queue-content { padding: 32px 16px 64px; max-width: 480px; }
    .center { display: flex; justify-content: center; padding: 48px; }

    /* Join card */
    .join-card {
      background: var(--surface); border-radius: var(--radius-md);
      border: 1px solid var(--border); box-shadow: var(--shadow-md);
      padding: 32px 24px; display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center;
    }

    .join-icon {
      width: 80px; height: 80px; border-radius: 50%;
      background: rgba(98,0,234,0.12);
      display: flex; align-items: center; justify-content: center;
      mat-icon { font-size: 40px; width: 40px; height: 40px; color: var(--primary); }
    }

    .join-card h2 { margin: 0; font-size: 1.3rem; font-weight: 800; }
    .join-card p { margin: 0; color: var(--text-secondary); font-size: 0.9rem; max-width: 340px; }

    .quantity-row {
      display: flex; align-items: center; gap: 16px;
      background: var(--surface-2); padding: 12px 20px; border-radius: 40px;
    }
    .qty-label { font-size: 0.88rem; font-weight: 600; color: var(--text-secondary); }
    .qty-controls { display: flex; align-items: center; gap: 8px; }
    .qty-value { font-size: 1.2rem; font-weight: 800; min-width: 24px; text-align: center; }

    .join-btn { height: 48px !important; border-radius: 24px !important; padding: 0 32px !important; font-size: 1rem !important; }

    /* Status card */
    .status-card {
      background: var(--surface); border-radius: var(--radius-md);
      border: 2px solid var(--border); box-shadow: var(--shadow-md);
      padding: 32px 24px; display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center;

      &.status-waiting { border-color: #ff9800; }
      &.status-active  { border-color: #4caf50; background: var(--success-bg); }
      &.status-done    { border-color: var(--border); }
    }

    /* Active state */
    .active-header { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .active-header h2 { margin: 0; font-size: 1.4rem; font-weight: 800; color: var(--success-text); }
    .active-msg { color: var(--success-text); margin: 0; font-size: 0.95rem; }

    .pulse-icon {
      font-size: 48px; width: 48px; height: 48px; color: var(--success-text);
      animation: pulse-scale 1s ease-in-out infinite;
    }

    @keyframes pulse-scale {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.15); }
    }

    .timer-ring { position: relative; width: 140px; height: 140px; }
    .ring-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
    .ring-bg { fill: none; stroke: rgba(76,175,80,0.2); stroke-width: 8; }
    .ring-progress {
      fill: none; stroke: #66bb6a; stroke-width: 8;
      stroke-dasharray: 283; stroke-linecap: round;
      transition: stroke-dashoffset 1s linear;
    }
    .timer-text {
      position: absolute; inset: 0; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
    }
    .timer-seconds { font-size: 2rem; font-weight: 800; color: var(--success-text); line-height: 1; }
    .timer-unit { font-size: 0.75rem; color: var(--success-text); }

    .buy-btn { height: 48px !important; border-radius: 24px !important; padding: 0 32px !important; font-size: 1rem !important; }

    /* Waiting state */
    .waiting-header { display: flex; flex-direction: column; align-items: center; gap: 4px;
      mat-icon { font-size: 48px; width: 48px; height: 48px; color: #ff9800; }
      h2 { margin: 0; font-size: 1.3rem; font-weight: 800; }
    }

    .position-display {
      display: flex; flex-direction: column; align-items: center;
      background: var(--warning-bg); border-radius: 16px; padding: 20px 40px;
    }
    .position-number { font-size: 4rem; font-weight: 900; color: var(--warning-text); line-height: 1; }
    .position-label { font-size: 0.82rem; font-weight: 600; color: var(--warning-text); text-transform: uppercase; letter-spacing: 1px; }

    .queue-size { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }
    .queue-hint { font-size: 0.82rem; color: var(--text-hint); margin: 0; max-width: 300px; }

    /* Done state */
    .done-icon { font-size: 64px; width: 64px; height: 64px; color: var(--text-hint); }

    .leave-btn { border-radius: 20px !important; }
  `]
})
export class QueueComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private queueService = inject(VirtualQueueService);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  loading = signal(true);
  joining = signal(false);
  status = signal<QueueStatus | null>(null);
  qty = 1;

  private eventId!: number;
  private pollInterval?: ReturnType<typeof setInterval>;
  private countdownInterval?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.eventId = +this.route.snapshot.paramMap.get('eventId')!;
    this.queueService.getStatus(this.eventId).subscribe({
      next: (s) => { this.status.set(s); this.loading.set(false); this.startPolling(); },
      error: () => { this.loading.set(false); }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.pollInterval);
    clearInterval(this.countdownInterval);
  }

  join(): void {
    this.joining.set(true);
    this.queueService.join(this.eventId, this.qty).subscribe({
      next: (s) => { this.status.set(s); this.joining.set(false); this.startPolling(); },
      error: (e) => {
        this.snackBar.open(e.error?.error || this.translate.instant('QUEUE.JOIN_ERROR'), 'Fechar', { duration: 4000 });
        this.joining.set(false);
      }
    });
  }

  leave(): void {
    this.queueService.leave(this.eventId).subscribe({
      next: () => { this.status.set(null); clearInterval(this.pollInterval); },
      error: () => {}
    });
  }

  rejoin(): void {
    this.status.set(null);
  }

  statusClass(): string {
    const s = this.status()?.status;
    if (s === 0) return 'status-waiting';
    if (s === 1) return 'status-active';
    return 'status-done';
  }

  timerDashOffset(): number {
    const max = 10 * 60; // 10 min window
    const remaining = this.status()?.secondsUntilExpiry ?? 0;
    const circumference = 283;
    return circumference - (remaining / max) * circumference;
  }

  private startPolling(): void {
    clearInterval(this.pollInterval);
    this.pollInterval = setInterval(() => {
      this.queueService.getStatus(this.eventId).subscribe({
        next: (s) => {
          this.status.set(s);
          // Navigate away if active and user clicks buy
          if (s.status === 2) clearInterval(this.pollInterval);
        },
        error: () => {}
      });
    }, 10000); // poll every 10s

    // Local countdown for active
    this.countdownInterval = setInterval(() => {
      const s = this.status();
      if (s && s.status === 1 && s.secondsUntilExpiry! > 0) {
        this.status.set({ ...s, secondsUntilExpiry: s.secondsUntilExpiry! - 1 });
      }
    }, 1000);
  }
}
