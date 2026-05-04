import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TicketService } from '../../core/services/ticket.service';
import { TicketResponse } from '../../core/models';
import QRCode from 'qrcode';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatButtonModule, MatIconModule,
    MatProgressSpinnerModule, MatSnackBarModule, MatTooltipModule,
    TranslateModule
  ],
  template: `
    <div class="tickets-page">
      <!-- Header -->
      <div class="page-hero">
        <div class="container">
          <div class="hero-content">
            <div>
              <h1 class="page-title">{{ 'MY_TICKETS.PAGE_TITLE' | translate }}</h1>
              <p class="page-subtitle">{{ tickets.length }} {{ 'MY_TICKETS.WALLET_LABEL' | translate }}</p>
            </div>
            <a mat-stroked-button routerLink="/events" class="browse-btn">
              <mat-icon>add</mat-icon> {{ 'MY_TICKETS.BUY_MORE' | translate }}
            </a>
          </div>
        </div>
      </div>

      <div class="container">
        @if (loading) {
          <div class="skeleton-list">
            @for (n of [1,2,3]; track n) {
              <div class="skeleton-ticket">
                <div class="sk-left"></div>
                <div class="sk-right"></div>
              </div>
            }
          </div>
        } @else if (tickets.length === 0) {
          <div class="empty-state fade-in">
            <mat-icon class="empty-icon">confirmation_number</mat-icon>
            <h2>{{ 'MY_TICKETS.EMPTY_TITLE' | translate }}</h2>
            <p>{{ 'MY_TICKETS.EMPTY_DESC' | translate }}</p>
            <a mat-raised-button color="primary" routerLink="/events">
              <mat-icon>search</mat-icon> {{ 'MY_TICKETS.SEE_EVENTS' | translate }}
            </a>
          </div>
        } @else {
          <!-- Tabs: valid / used -->
          <div class="tab-row">
            <button class="tab-btn" [class.active]="activeTab === 'valid'" (click)="activeTab = 'valid'">
              {{ 'MY_TICKETS.VALID_TAB' | translate }} ({{ validTickets.length }})
            </button>
            <button class="tab-btn" [class.active]="activeTab === 'used'" (click)="activeTab = 'used'">
              {{ 'MY_TICKETS.USED_TAB' | translate }} ({{ usedTickets.length }})
            </button>
          </div>

          <div class="tickets-list fade-in">
            @for (ticket of displayedTickets; track ticket.id) {
              <div class="wallet-card" [class.used]="ticket.isUsed">
                <!-- Torn edge decoration -->
                <div class="tear-line">
                  <div class="tear-circle left"></div>
                  <div class="tear-dots"></div>
                  <div class="tear-circle right"></div>
                </div>

                <!-- Left: event info -->
                <div class="card-left">
                  <div class="event-color-bar" [style.background]="getCategoryColor(ticket.eventTitle)"></div>
                  <div class="card-left-content">
                    <span class="event-category-label">{{ 'MY_TICKETS.TICKET_LABEL' | translate }}</span>
                    <h3 class="event-title-card">{{ ticket.eventTitle }}</h3>
                    <p class="ticket-type-name">{{ ticket.ticketTypeName }}</p>

                    <div class="info-rows">
                      <div class="info-row">
                        <mat-icon>calendar_today</mat-icon>
                        <span>{{ ticket.eventDateTime | date:'EEE, dd MMM yyyy':'':'pt-BR' }}</span>
                      </div>
                      <div class="info-row">
                        <mat-icon>schedule</mat-icon>
                        <span>{{ ticket.eventDateTime | date:'HH:mm' }}</span>
                      </div>
                      <div class="info-row">
                        <mat-icon>location_on</mat-icon>
                        <span>{{ ticket.eventVenue }}, {{ ticket.eventCity }}</span>
                      </div>
                    </div>

                    <div class="card-actions">
                      <button mat-stroked-button class="action-btn" (click)="downloadQRCode(ticket)">
                        <mat-icon>download</mat-icon> {{ 'MY_TICKETS.SAVE_BTN' | translate }}
                      </button>
                      <a mat-stroked-button class="action-btn" routerLink="/ticket-transfers">
                        <mat-icon>swap_horiz</mat-icon> {{ 'MY_TICKETS.TRANSFER' | translate }}
                      </a>
                      <button mat-icon-button class="share-btn" (click)="shareTicket(ticket)" [title]="'MY_TICKETS.SHARE' | translate">
                        <mat-icon>share</mat-icon>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Right: QR code rotativo -->
                <div class="card-right">
                  <div class="qr-wrap">
                    @if (ticket.isUsed) {
                      <img [src]="'data:image/png;base64,' + ticket.qrCodeBase64"
                           [alt]="ticket.serialNumber" class="qr-img qr-used">
                      <div class="used-stamp">
                        <mat-icon>check_circle</mat-icon>
                        <span>{{ 'MY_TICKETS.USED_STAMP' | translate }}</span>
                      </div>
                    } @else {
                      @if (liveQrMap[ticket.id]?.dataUrl) {
                        <img [src]="liveQrMap[ticket.id].dataUrl"
                             [alt]="ticket.serialNumber" class="qr-img"
                             [matTooltip]="'MY_TICKETS.ROTATING_QR_TOOLTIP' | translate">
                      } @else {
                        <div class="qr-loading">
                          <mat-progress-spinner diameter="40" mode="indeterminate" color="primary"/>
                        </div>
                      }
                    }
                  </div>

                  @if (!ticket.isUsed && liveQrMap[ticket.id]) {
                    <div class="qr-countdown" [class.expiring]="liveQrMap[ticket.id].secondsRemaining <= 10">
                      <mat-icon>refresh</mat-icon>
                      <span>{{ liveQrMap[ticket.id].secondsRemaining }}s</span>
                    </div>
                    <p class="qr-hint">{{ 'MY_TICKETS.AUTO_UPDATE' | translate }}</p>
                  }

                  <p class="serial-number">{{ ticket.serialNumber }}</p>
                  <div class="price-tag">{{ ticket.unitPrice | currency:'BRL' }}</div>
                  @if (ticket.isUsed && ticket.usedAt) {
                    <p class="used-date">{{ ticket.usedAt | date:'dd/MM/yy HH:mm' }}</p>
                  }
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    /* ── Page hero ── */
    .tickets-page { padding-top: 64px; }

    .page-hero {
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
      padding: 40px 0 32px;
    }

    .hero-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .page-title {
      font-size: clamp(1.6rem, 4vw, 2.2rem);
      font-weight: 800;
      color: white;
      margin: 0 0 4px;
    }

    .page-subtitle { color: rgba(255,255,255,.75); margin: 0; }

    .browse-btn {
      color: white !important;
      border-color: rgba(255,255,255,.5) !important;
      border-radius: 8px !important;
    }

    /* ── Tabs ── */
    .tab-row {
      display: flex;
      gap: 4px;
      margin: 28px 0 20px;
      background: var(--surface-2);
      border-radius: var(--radius-sm);
      padding: 4px;
      width: fit-content;
    }

    .tab-btn {
      background: none;
      border: none;
      padding: 8px 20px;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition);

      &.active {
        background: var(--surface);
        color: var(--primary);
        font-weight: 700;
        box-shadow: var(--shadow-sm);
      }
    }

    /* ── Wallet card ── */
    .tickets-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding-bottom: 48px;
    }

    .wallet-card {
      display: flex;
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      border: 1px solid var(--border);
      background: var(--surface);
      position: relative;
      transition: box-shadow var(--transition), transform var(--transition);
      min-height: 200px;

      &:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
      &.used { opacity: 0.75; }

      @media (max-width: 580px) { flex-direction: column; }
    }

    /* Torn tear line */
    .tear-line {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 200px;
      width: 1px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      z-index: 2;
      pointer-events: none;

      @media (max-width: 580px) {
        top: auto;
        bottom: 220px;
        left: 0;
        right: 0;
        width: 100%;
        height: 1px;
        flex-direction: row;
      }
    }

    .tear-circle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--background);
      border: 1px solid var(--border);
      flex-shrink: 0;
      &.left  { margin-left: -10px; @media (max-width: 580px) { margin-left: 0; margin-top: -10px; } }
      &.right { margin-left: -10px; @media (max-width: 580px) { margin-left: 0; margin-top: -10px; } }
    }

    .tear-dots {
      flex: 1;
      border-left: 2px dashed var(--border);
      @media (max-width: 580px) { border-left: none; border-top: 2px dashed var(--border); width: 100%; height: 0; flex: 1; }
    }

    /* ── Left section ── */
    .card-left {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    .event-color-bar {
      width: 6px;
      flex-shrink: 0;
    }

    .card-left-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
    }

    .event-category-label {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 1.2px;
      color: var(--text-hint);
      text-transform: uppercase;
    }

    .event-title-card {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0;
      line-height: 1.25;
    }

    .ticket-type-name {
      font-size: 0.82rem;
      color: var(--primary);
      font-weight: 600;
      margin: 0;
    }

    .info-rows { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }

    .info-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      color: var(--text-secondary);
      mat-icon { font-size: 14px; width: 14px; height: 14px; color: var(--text-hint); }
    }

    .card-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 12px;
      flex-wrap: wrap;
    }

    .action-btn {
      height: 32px !important;
      font-size: 0.78rem !important;
      padding: 0 10px !important;
      border-radius: 6px !important;
      line-height: 30px !important;
    }

    .share-btn { width: 32px !important; height: 32px !important; }

    /* ── Right section (QR stub) ── */
    .card-right {
      width: 200px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 20px 16px;
      background: var(--surface-2);

      @media (max-width: 580px) { width: 100%; padding: 20px; }
    }

    .qr-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .qr-img {
      width: 120px;
      height: 120px;
      border-radius: 8px;
      border: 2px solid var(--border);
      object-fit: contain;
    }

    .qr-loading {
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      border: 2px dashed var(--border);
    }

    .qr-used { filter: grayscale(80%); }

    .qr-countdown {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--success);
      background: rgba(67,160,71,.1);
      padding: 2px 8px;
      border-radius: 20px;
      mat-icon { font-size: 14px; width: 14px; height: 14px; }

      &.expiring {
        color: var(--warn);
        background: rgba(244,67,54,.1);
        animation: pulse 0.8s ease-in-out infinite;
      }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .qr-hint {
      font-size: 0.65rem;
      color: var(--text-hint);
      margin: 0;
      text-align: center;
    }

    .used-stamp {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,.45);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      gap: 2px;
      mat-icon { font-size: 32px; width: 32px; height: 32px; color: #69f0ae; }
      span { font-size: 0.7rem; font-weight: 700; letter-spacing: 1px; }
    }

    .serial-number {
      font-family: 'Courier New', monospace;
      font-size: 0.7rem;
      color: var(--text-hint);
      margin: 0;
      text-align: center;
      word-break: break-all;
    }

    .price-tag {
      background: var(--primary);
      color: white;
      padding: 3px 12px;
      border-radius: 20px;
      font-size: 0.82rem;
      font-weight: 700;
    }

    .used-date {
      font-size: 0.7rem;
      color: var(--text-hint);
      margin: 0;
      text-align: center;
    }

    /* ── Skeleton ── */
    .skeleton-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 28px;
    }

    .skeleton-ticket {
      display: flex;
      border-radius: var(--radius-md);
      overflow: hidden;
      height: 200px;
      border: 1px solid var(--border);
    }

    .sk-left {
      flex: 1;
      background: linear-gradient(90deg, var(--surface-2) 25%, var(--border) 50%, var(--surface-2) 75%);
      background-size: 400% 100%;
      animation: skeleton-shimmer 1.4s ease infinite;
    }

    .sk-right {
      width: 200px;
      background: linear-gradient(90deg, var(--surface-2) 25%, var(--border) 50%, var(--surface-2) 75%);
      background-size: 400% 100%;
      animation: skeleton-shimmer 1.4s .2s ease infinite;
    }
  `]
})
export class MyTicketsComponent implements OnInit, OnDestroy {
  private ticketService = inject(TicketService);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  tickets: TicketResponse[] = [];
  loading = true;
  activeTab: 'valid' | 'used' = 'valid';
  liveQrMap: Record<number, { dataUrl: string; secondsRemaining: number }> = {};

  private countdownInterval?: ReturnType<typeof setInterval>;

  get validTickets() { return this.tickets.filter(t => !t.isUsed); }
  get usedTickets()  { return this.tickets.filter(t => t.isUsed); }
  get displayedTickets() { return this.activeTab === 'valid' ? this.validTickets : this.usedTickets; }

  ngOnInit(): void {
    this.ticketService.getMyTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.loading = false;
        // Inicia QR rotativo para todos os ingressos válidos
        this.validTickets.forEach(t => this.loadLiveQr(t.id));
        this.startCountdown();
      },
      error: () => { this.loading = false; }
    });
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  private loadLiveQr(ticketId: number): void {
    this.ticketService.getLiveQrToken(ticketId).subscribe({
      next: async (resp) => {
        const dataUrl = await QRCode.toDataURL(resp.token, {
          width: 240,
          margin: 1,
          color: { dark: '#1a1a2e', light: '#ffffff' },
          errorCorrectionLevel: 'M'
        });
        this.liveQrMap[ticketId] = { dataUrl, secondsRemaining: resp.secondsRemaining };
      },
      error: () => {
        // Fallback: usa QR estático se o endpoint falhar
        const ticket = this.tickets.find(t => t.id === ticketId);
        if (ticket) {
          this.liveQrMap[ticketId] = {
            dataUrl: `data:image/png;base64,${ticket.qrCodeBase64}`,
            secondsRemaining: 60
          };
        }
      }
    });
  }

  private startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      for (const id in this.liveQrMap) {
        const entry = this.liveQrMap[+id];
        entry.secondsRemaining--;
        // Renova 5 segundos antes de expirar
        if (entry.secondsRemaining <= 5) {
          this.loadLiveQr(+id);
        }
      }
    }, 1000);
  }

  downloadQRCode(ticket: TicketResponse): void {
    const src = this.liveQrMap[ticket.id]?.dataUrl
      ?? `data:image/png;base64,${ticket.qrCodeBase64}`;
    const link = document.createElement('a');
    link.href = src;
    link.download = `ingresso-${ticket.serialNumber}.png`;
    link.click();
  }

  shareTicket(ticket: TicketResponse): void {
    const text = `Meu ingresso para ${ticket.eventTitle} — ${ticket.serialNumber}`;
    if (navigator.share) {
      navigator.share({ title: ticket.eventTitle, text });
    } else {
      navigator.clipboard.writeText(text).then(() =>
        this.snackBar.open(this.translate.instant('MY_TICKETS.INFO_COPIED'), 'OK', { duration: 2000 })
      );
    }
  }

  getCategoryColor(title: string): string {
    const colors = ['#6200ea','#e91e63','#ff6d00','#00bcd4','#43a047','#f44336'];
    let hash = 0;
    for (let i = 0; i < title.length; i++) hash = title.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  }
}
