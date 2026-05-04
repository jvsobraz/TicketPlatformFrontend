import { Component, OnDestroy, inject, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CheckinOfflineService } from '../../../core/services/checkin-offline.service';

interface ValidateResult {
  isValid: boolean;
  message: string;
  offline?: boolean;
  ticket?: {
    ticketId?: number;
    serialNumber: string;
    eventTitle?: string;
    ticketTypeName: string;
    holderName: string;
    wasAlreadyUsed?: boolean;
    usedAt?: string;
  };
}

interface EventOption { id: number; title: string; }

@Component({
  selector: 'app-scan',
  standalone: true,
  imports: [
    CommonModule, AsyncPipe, FormsModule, RouterLink,
    MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatProgressSpinnerModule, MatSelectModule,
    MatBadgeModule, MatTooltipModule, MatSnackBarModule,
    TranslateModule
  ],
  template: `
    <div class="scan-page">
      <div class="page-hero">
        <div class="container">
          <div class="hero-row">
            <a mat-icon-button routerLink="/admin" class="back-btn">
              <mat-icon>arrow_back</mat-icon>
            </a>
            <div class="hero-info">
              <h1 class="page-title">{{ 'SCAN.PAGE_TITLE' | translate }}</h1>
              <p class="page-subtitle">{{ 'SCAN.SUBTITLE' | translate }}</p>
            </div>
            <!-- Online / Offline badge -->
            <div class="online-badge" [class.offline]="!(isOnline$ | async)">
              <mat-icon>{{ (isOnline$ | async) ? 'wifi' : 'wifi_off' }}</mat-icon>
              <span>{{ (isOnline$ | async) ? ('SCAN.ONLINE' | translate) : ('SCAN.OFFLINE' | translate) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="container scan-content">

        <!-- Offline warning -->
        @if (!(isOnline$ | async)) {
          <div class="offline-banner fade-in">
            <mat-icon>cloud_off</mat-icon>
            <div>
              <strong>{{ 'SCAN.OFFLINE_ACTIVE' | translate }}</strong>
              <p>{{ 'SCAN.OFFLINE_DESC' | translate }}</p>
            </div>
          </div>
        }

        <!-- Sync banner when back online with pending queue -->
        @if ((isOnline$ | async) && queueCount() > 0) {
          <div class="sync-banner fade-in">
            <mat-icon>sync</mat-icon>
            <div>
              <strong>{{ queueCount() }} {{ 'SCAN.VALIDATED_TODAY' | translate }}</strong>
              <p>{{ 'SCAN.OFFLINE_DESC' | translate }}</p>
            </div>
            <button mat-raised-button color="primary" (click)="syncQueue()" [disabled]="syncing$ | async">
              @if (syncing$ | async) { <mat-progress-spinner diameter="18" mode="indeterminate"/> }
              @else { <mat-icon>sync</mat-icon> {{ 'SCAN.SYNC_BTN' | translate }} }
            </button>
          </div>
        }

        <!-- Stats -->
        <div class="stats-row">
          <div class="stat-chip success">
            <mat-icon>check_circle</mat-icon>
            <span>{{ validatedToday() }} {{ 'SCAN.VALIDATED_TODAY' | translate }}</span>
          </div>
          @if (lastResult() && !lastResult()!.isValid) {
            <div class="stat-chip warn">
              <mat-icon>warning</mat-icon>
              <span>{{ 'SCAN.LAST_INVALID' | translate }}</span>
            </div>
          }
          @if (lastResult()?.offline) {
            <div class="stat-chip offline-chip">
              <mat-icon>cloud_off</mat-icon>
              <span>{{ 'SCAN.OFFLINE' | translate }}</span>
            </div>
          }
        </div>

        <!-- Event selector + prefetch -->
        <div class="event-prefetch-card">
          <h3><mat-icon>event</mat-icon> {{ 'SCAN.PREFETCH_TITLE' | translate }}</h3>
          <p class="card-hint">{{ 'SCAN.PREFETCH_HINT' | translate }}</p>

          @if (eventsLoading()) {
            <div class="loading-row"><mat-progress-spinner diameter="24" mode="indeterminate"/><span>{{ 'SCAN.LOADING_EVENTS' | translate }}</span></div>
          } @else {
            <div class="prefetch-row">
              <mat-form-field appearance="outline" class="event-select">
                <mat-label>{{ 'SCAN.SELECT_EVENT' | translate }}</mat-label>
                <mat-select [(ngModel)]="selectedEventId" (ngModelChange)="onEventChange()">
                  @for (ev of events(); track ev.id) {
                    <mat-option [value]="ev.id">{{ ev.title }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>

              <button mat-raised-button color="accent" (click)="prefetchEvent()"
                      [disabled]="!selectedEventId || prefetching()">
                @if (prefetching()) { <mat-progress-spinner diameter="18" mode="indeterminate"/> }
                @else { <mat-icon>download</mat-icon> {{ 'SCAN.DOWNLOAD_BTN' | translate }} }
              </button>

              @if (selectedEventId) {
                <button mat-icon-button color="warn" (click)="clearCache()" [matTooltip]="'SCAN.CLEAR_CACHE' | translate">
                  <mat-icon>delete_outline</mat-icon>
                </button>
              }
            </div>

            @if (cacheInfo()) {
              <div class="cache-info">
                <mat-icon>check_circle</mat-icon>
                <span>{{ cacheInfo()!.count }} {{ 'SCAN.TICKETS_CACHED' | translate }} — {{ 'SCAN.CACHED_AT' | translate }} {{ cacheInfo()!.cachedAt | date:'dd/MM HH:mm' }}</span>
              </div>
            } @else if (selectedEventId) {
              <div class="cache-info warn">
                <mat-icon>cloud_off</mat-icon>
                <span>{{ 'SCAN.CACHE_MISSING' | translate }}</span>
              </div>
            }
          }
        </div>

        <!-- Camera scanner -->
        <div class="scanner-card">
          <div class="camera-wrap" [class.active]="cameraActive()">
            <video #videoEl autoplay playsinline class="camera-feed" [hidden]="!cameraActive()"></video>
            <canvas #canvasEl class="camera-canvas" hidden></canvas>

            @if (!cameraActive()) {
              <div class="camera-placeholder">
                <mat-icon>qr_code_scanner</mat-icon>
                <p>{{ 'SCAN.CAMERA_INACTIVE' | translate }}</p>
              </div>
            }

            @if (cameraActive()) {
              <div class="scan-overlay">
                <div class="scan-frame"></div>
                <p class="scan-hint">{{ 'SCAN.CAMERA_HINT' | translate }}</p>
              </div>
            }
          </div>

          <div class="camera-actions">
            @if (!cameraActive()) {
              <button mat-raised-button color="primary" (click)="startCamera()" class="camera-btn">
                <mat-icon>videocam</mat-icon> {{ 'SCAN.ACTIVATE_CAMERA' | translate }}
              </button>
            } @else {
              <button mat-stroked-button color="warn" (click)="stopCamera()" class="camera-btn">
                <mat-icon>videocam_off</mat-icon> {{ 'SCAN.DEACTIVATE_CAMERA' | translate }}
              </button>
            }
          </div>
        </div>

        <!-- Manual input -->
        <div class="manual-card">
          <h3><mat-icon>keyboard</mat-icon> {{ 'SCAN.MANUAL_TITLE' | translate }}</h3>
          <p class="manual-hint">{{ 'SCAN.MANUAL_HINT' | translate }}</p>
          <div class="manual-row">
            <mat-form-field appearance="outline" class="manual-input">
              <mat-label>{{ 'SCAN.MANUAL_CODE' | translate }}</mat-label>
              <mat-icon matPrefix>confirmation_number</mat-icon>
              <input matInput [(ngModel)]="manualCode" (keydown.enter)="validateManual()"
                     [placeholder]="'SCAN.MANUAL_PLACEHOLDER' | translate">
            </mat-form-field>
            <button mat-raised-button color="primary" (click)="validateManual()"
                    [disabled]="!manualCode.trim() || validating()" class="validate-btn">
              @if (validating()) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
              @else { <mat-icon>check</mat-icon> {{ 'SCAN.VALIDATE_BTN' | translate }} }
            </button>
          </div>
        </div>

        <!-- Result -->
        @if (lastResult()) {
          <div class="result-card fade-in"
               [class.result-valid]="lastResult()!.isValid && !lastResult()!.ticket?.wasAlreadyUsed"
               [class.result-invalid]="!lastResult()!.isValid && !lastResult()!.ticket?.wasAlreadyUsed"
               [class.result-warn]="lastResult()!.ticket?.wasAlreadyUsed">

            <div class="result-icon">
              @if (lastResult()!.isValid && !lastResult()!.ticket?.wasAlreadyUsed) {
                <mat-icon>check_circle</mat-icon>
              } @else if (lastResult()!.ticket?.wasAlreadyUsed) {
                <mat-icon>warning</mat-icon>
              } @else {
                <mat-icon>cancel</mat-icon>
              }
            </div>

            <div class="result-body">
              <div class="result-header">
                <h3>{{ lastResult()!.message }}</h3>
                @if (lastResult()!.offline) {
                  <span class="offline-tag"><mat-icon>cloud_off</mat-icon> {{ 'SCAN.OFFLINE' | translate }}</span>
                }
              </div>
              @if (lastResult()!.ticket) {
                <div class="ticket-info-grid">
                  @if (lastResult()!.ticket!.eventTitle) {
                    <div class="info-item">
                      <span class="label">{{ 'SCAN.EVENT' | translate }}</span>
                      <span class="value">{{ lastResult()!.ticket!.eventTitle }}</span>
                    </div>
                  }
                  <div class="info-item">
                    <span class="label">{{ 'SCAN.TICKET_TYPE' | translate }}</span>
                    <span class="value">{{ lastResult()!.ticket!.ticketTypeName }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">{{ 'SCAN.HOLDER' | translate }}</span>
                    <span class="value">{{ lastResult()!.ticket!.holderName }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">{{ 'SCAN.SERIAL' | translate }}</span>
                    <span class="value mono">{{ lastResult()!.ticket!.serialNumber }}</span>
                  </div>
                  @if (lastResult()!.ticket!.wasAlreadyUsed && lastResult()!.ticket!.usedAt) {
                    <div class="info-item full">
                      <span class="label">{{ 'SCAN.USED_AT' | translate }}</span>
                      <span class="value">{{ lastResult()!.ticket!.usedAt | date:'dd/MM/yyyy HH:mm' }}</span>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        }

        <!-- Offline queue -->
        @if (pendingQueue().length > 0) {
          <div class="queue-card">
            <h3><mat-icon>pending</mat-icon> {{ 'SCAN.QUEUE_TITLE' | translate }} ({{ pendingQueue().length }})</h3>
            <div class="queue-list">
              @for (item of pendingQueue().slice(0, 5); track item.id) {
                <div class="queue-item" [class.valid]="item.result.isValid" [class.invalid]="!item.result.isValid">
                  <mat-icon>{{ item.result.isValid ? 'check_circle' : 'cancel' }}</mat-icon>
                  <div>
                    <span class="queue-serial">{{ item.result.ticket?.serialNumber || item.qrCodeHash.substring(0, 16) + '...' }}</span>
                    <span class="queue-time">{{ item.validatedAt | date:'HH:mm:ss' }}</span>
                  </div>
                </div>
              }
              @if (pendingQueue().length > 5) {
                <p class="queue-more">+ {{ pendingQueue().length - 5 }} mais...</p>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .scan-page { padding-top: 64px; }

    .page-hero {
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
      padding: 32px 0 24px;
    }

    .hero-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .hero-info { flex: 1; }
    .back-btn { color: white !important; }
    .page-title { font-size: 1.6rem; font-weight: 800; color: white; margin: 0 0 4px; }
    .page-subtitle { color: rgba(255,255,255,.75); margin: 0; }

    .online-badge {
      display: flex; align-items: center; gap: 6px;
      padding: 6px 14px; border-radius: 20px; font-size: 0.82rem; font-weight: 700;
      background: rgba(67,160,71,.25); color: #c8e6c9;
      mat-icon { font-size: 16px; width: 16px; height: 16px; }
      &.offline { background: rgba(244,67,54,.25); color: #ffcdd2; }
    }

    .scan-content { padding: 20px 16px 64px; max-width: 680px; display: flex; flex-direction: column; gap: 16px; }

    /* Offline banner */
    .offline-banner, .sync-banner {
      display: flex; align-items: flex-start; gap: 12px; padding: 16px;
      border-radius: var(--radius-md); border: 1px solid;
      mat-icon { flex-shrink: 0; margin-top: 2px; }
      p { margin: 4px 0 0; font-size: 0.82rem; }
      strong { font-size: 0.9rem; }
    }

    .offline-banner {
      background: var(--warning-bg); border-color: #f57f17; color: var(--warning-text);
      mat-icon { color: #f57f17; }
    }

    .sync-banner {
      background: var(--info-bg); border-color: #1565c0; color: var(--info-text);
      mat-icon { color: #0288d1; }
      button { margin-left: auto; flex-shrink: 0; }
    }

    /* Stats */
    .stats-row { display: flex; gap: 10px; flex-wrap: wrap; }
    .stat-chip {
      display: flex; align-items: center; gap: 6px; padding: 6px 14px;
      border-radius: 20px; font-size: 0.82rem; font-weight: 600;
      mat-icon { font-size: 16px; width: 16px; height: 16px; }
      &.success { background: var(--success-bg); color: var(--success-text); }
      &.warn    { background: var(--warning-bg); color: var(--warning-text); }
      &.offline-chip { background: rgba(98,0,234,0.12); color: var(--primary); }
    }

    /* Event prefetch card */
    .event-prefetch-card {
      background: var(--surface); border-radius: var(--radius-md);
      border: 1px solid var(--border); box-shadow: var(--shadow-sm); padding: 20px;

      h3 { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; font-weight: 700; margin: 0 0 4px;
           mat-icon { color: var(--primary); font-size: 20px; width: 20px; height: 20px; } }
    }

    .card-hint { font-size: 0.82rem; color: var(--text-hint); margin: 0 0 14px; }

    .loading-row { display: flex; align-items: center; gap: 10px; color: var(--text-hint); font-size: 0.85rem; }

    .prefetch-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .event-select { flex: 1 1 200px; }

    .cache-info {
      display: flex; align-items: center; gap: 6px; margin-top: 10px;
      font-size: 0.82rem; color: var(--success-text);
      mat-icon { font-size: 16px; width: 16px; height: 16px; color: var(--success-text); }
      &.warn { color: var(--error-text); mat-icon { color: var(--error-text); } }
    }

    /* Camera */
    .scanner-card {
      background: var(--surface); border-radius: var(--radius-md);
      border: 1px solid var(--border); box-shadow: var(--shadow-sm); overflow: hidden;
    }

    .camera-wrap {
      position: relative; width: 100%; aspect-ratio: 4/3;
      background: #0a0a0a; display: flex; align-items: center; justify-content: center;
    }

    .camera-feed { width: 100%; height: 100%; object-fit: cover; }
    .camera-canvas { display: none; }

    .camera-placeholder {
      display: flex; flex-direction: column; align-items: center; gap: 8px; color: #999;
      mat-icon { font-size: 64px; width: 64px; height: 64px; color: #666; }
    }

    .scan-overlay {
      position: absolute; inset: 0;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;
    }

    .scan-frame {
      width: 220px; height: 220px; border: 3px solid var(--primary); border-radius: 12px;
      box-shadow: 0 0 0 4000px rgba(0,0,0,.5);
      animation: scan-pulse 2s ease-in-out infinite;
    }

    @keyframes scan-pulse {
      0%, 100% { border-color: var(--primary); }
      50% { border-color: #a78bfa; box-shadow: 0 0 0 4000px rgba(0,0,0,.5), 0 0 20px var(--primary); }
    }

    .scan-hint {
      color: white; font-size: 0.82rem; background: rgba(0,0,0,.5);
      padding: 4px 12px; border-radius: 20px; margin: 0;
    }

    .camera-actions { padding: 16px; display: flex; justify-content: center; }
    .camera-btn { height: 44px !important; border-radius: 8px !important; }

    /* Manual */
    .manual-card {
      background: var(--surface); border-radius: var(--radius-md);
      border: 1px solid var(--border); box-shadow: var(--shadow-sm); padding: 20px;

      h3 { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; font-weight: 700; margin: 0 0 4px;
           mat-icon { color: var(--primary); font-size: 20px; width: 20px; height: 20px; } }
    }

    .manual-hint { font-size: 0.82rem; color: var(--text-hint); margin: 0 0 16px; }
    .manual-row { display: flex; gap: 10px; align-items: flex-start; flex-wrap: wrap; }
    .manual-input { flex: 1 1 240px; }
    .validate-btn { height: 56px !important; border-radius: 8px !important; white-space: nowrap; }

    /* Result */
    .result-card {
      border-radius: var(--radius-md); border: 2px solid; padding: 20px;
      display: flex; gap: 16px; align-items: flex-start;

      &.result-valid   { background: var(--success-bg); border-color: #4caf50; .result-icon mat-icon { color: var(--success-text); } }
      &.result-invalid { background: var(--error-bg);   border-color: #f44336; .result-icon mat-icon { color: var(--error-text); } }
      &.result-warn    { background: var(--warning-bg); border-color: #ff9800; .result-icon mat-icon { color: var(--warning-text); } }
    }

    .result-icon mat-icon { font-size: 40px; width: 40px; height: 40px; }
    .result-body { flex: 1; }
    .result-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; h3 { margin: 0; font-size: 1rem; } }

    .offline-tag {
      display: inline-flex; align-items: center; gap: 4px;
      background: #7b1fa2; color: white; font-size: 0.7rem; font-weight: 700;
      padding: 2px 8px; border-radius: 12px; white-space: nowrap;
      mat-icon { font-size: 12px; width: 12px; height: 12px; }
    }

    .ticket-info-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
      @media (max-width: 480px) { grid-template-columns: 1fr; }
    }

    .info-item { display: flex; flex-direction: column; gap: 2px; &.full { grid-column: 1 / -1; } }
    .label { font-size: 0.72rem; color: var(--text-hint); text-transform: uppercase; letter-spacing: .5px; }
    .value { font-size: 0.88rem; font-weight: 600; &.mono { font-family: monospace; } }

    /* Offline queue */
    .queue-card {
      background: var(--surface); border-radius: var(--radius-md);
      border: 1px solid var(--border); box-shadow: var(--shadow-sm); padding: 20px;

      h3 { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; font-weight: 700; margin: 0 0 12px;
           mat-icon { color: #7b1fa2; font-size: 20px; width: 20px; height: 20px; } }
    }

    .queue-list { display: flex; flex-direction: column; gap: 6px; }

    .queue-item {
      display: flex; align-items: center; gap: 10px; padding: 8px 12px;
      border-radius: 8px; font-size: 0.82rem;
      mat-icon { font-size: 18px; width: 18px; height: 18px; flex-shrink: 0; }
      div { display: flex; gap: 8px; align-items: center; }
      &.valid   { background: var(--success-bg); mat-icon { color: var(--success-text); } }
      &.invalid { background: var(--error-bg);   mat-icon { color: var(--error-text); } }
    }

    .queue-serial { font-weight: 600; font-family: monospace; }
    .queue-time { color: var(--text-hint); font-size: 0.75rem; }
    .queue-more { margin: 6px 0 0; font-size: 0.78rem; color: var(--text-hint); text-align: center; }
  `]
})
export class ScanComponent implements OnDestroy {
  @ViewChild('videoEl') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasEl') canvasRef!: ElementRef<HTMLCanvasElement>;

  private http = inject(HttpClient);
  private offlineService = inject(CheckinOfflineService);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  readonly isOnline$ = this.offlineService.isOnline$;
  readonly syncing$ = this.offlineService.syncing$;

  cameraActive = signal(false);
  validating   = signal(false);
  lastResult   = signal<ValidateResult | null>(null);
  validatedToday = signal(0);
  prefetching  = signal(false);
  eventsLoading = signal(true);
  events       = signal<EventOption[]>([]);
  cacheInfo    = signal<{ cachedAt: string; count: number } | null>(null);
  pendingQueue = signal(this.offlineService.getQueue());
  queueCount   = signal(this.offlineService.getQueue().length);

  selectedEventId: number | null = null;
  manualCode = '';

  private stream?: MediaStream;
  private scanInterval?: ReturnType<typeof setInterval>;

  constructor() {
    this.loadEvents();
    // Auto-sync when coming back online
    this.isOnline$.subscribe(online => {
      if (online && this.offlineService.getQueue().length > 0) {
        this.syncQueue();
      }
    });
  }

  private loadEvents(): void {
    this.http.get<{ id: number; title: string }[]>('/Events/my-events').subscribe({
      next: (events) => { this.events.set(events); this.eventsLoading.set(false); },
      error: () => { this.eventsLoading.set(false); }
    });
  }

  onEventChange(): void {
    if (!this.selectedEventId) return;
    this.cacheInfo.set(this.offlineService.getCacheInfo(this.selectedEventId));
  }

  async prefetchEvent(): Promise<void> {
    if (!this.selectedEventId) return;
    this.prefetching.set(true);
    try {
      const count = await this.offlineService.prefetchEvent(this.selectedEventId);
      this.cacheInfo.set(this.offlineService.getCacheInfo(this.selectedEventId));
      this.snackBar.open(`${count} ${this.translate.instant('SCAN.PREFETCH_SUCCESS')}`, 'OK', { duration: 3000 });
    } catch {
      this.snackBar.open(this.translate.instant('SCAN.DOWNLOAD_ERROR'), 'Fechar', { duration: 4000 });
    } finally {
      this.prefetching.set(false);
    }
  }

  clearCache(): void {
    if (!this.selectedEventId) return;
    this.offlineService.clearCache(this.selectedEventId);
    this.cacheInfo.set(null);
    this.snackBar.open(this.translate.instant('SCAN.CACHE_CLEARED'), 'OK', { duration: 2000 });
  }

  async syncQueue(): Promise<void> {
    const { synced } = await this.offlineService.syncQueue();
    this.updateQueueSignals();
    this.snackBar.open(`${synced} ${this.translate.instant('SCAN.SYNC_SUCCESS')}`, 'OK', { duration: 3000 });
  }

  async startCamera(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      this.cameraActive.set(true);
      setTimeout(() => {
        this.videoRef.nativeElement.srcObject = this.stream!;
        this.startScanning();
      }, 100);
    } catch {
      this.snackBar.open(this.translate.instant('SCAN.CAMERA_ERROR'), 'Fechar', { duration: 4000 });
    }
  }

  stopCamera(): void {
    this.stream?.getTracks().forEach(t => t.stop());
    if (this.scanInterval) clearInterval(this.scanInterval);
    this.cameraActive.set(false);
  }

  private startScanning(): void {
    if (!('BarcodeDetector' in window)) return;
    const detector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
    this.scanInterval = setInterval(async () => {
      if (!this.videoRef?.nativeElement) return;
      try {
        const barcodes = await detector.detect(this.videoRef.nativeElement);
        if (barcodes.length > 0) {
          this.stopCamera();
          await this.validate(barcodes[0].rawValue as string);
        }
      } catch { /* ignore */ }
    }, 500);
  }

  validateManual(): void {
    if (!this.manualCode.trim()) return;
    this.validate(this.manualCode.trim()).then(() => { this.manualCode = ''; });
  }

  private async validate(code: string): Promise<void> {
    this.validating.set(true);
    const isOnline = navigator.onLine;

    if (!isOnline && this.selectedEventId) {
      // Offline validation against cache
      const result = this.offlineService.validateOffline(code, this.selectedEventId);
      this.lastResult.set({
        isValid: result.isValid,
        message: result.message,
        offline: true,
        ticket: result.ticket ? {
          serialNumber: result.ticket.serialNumber ?? '',
          holderName: result.ticket.holderName ?? '',
          ticketTypeName: result.ticket.ticketTypeName ?? '',
          wasAlreadyUsed: result.wasAlreadyUsed,
          usedAt: result.ticket.usedAt
        } : undefined
      });
      if (result.isValid && !result.wasAlreadyUsed) {
        this.validatedToday.update(n => n + 1);
        this.playBeep(true);
      } else {
        this.playBeep(false);
      }
      this.updateQueueSignals();
      this.validating.set(false);
      return;
    }

    this.http.post<{ isValid: boolean; message: string; ticket?: any }>('/Tickets/validate', { qRCodeHash: code }).subscribe({
      next: (result) => {
        this.lastResult.set(result);
        if (result.isValid && !result.ticket?.wasAlreadyUsed) {
          this.validatedToday.update(n => n + 1);
          this.playBeep(true);
        } else {
          this.playBeep(false);
        }
        this.validating.set(false);
      },
      error: (err) => {
        this.lastResult.set({ isValid: false, message: err.error?.error || 'Ingresso inválido ou não encontrado.' });
        this.playBeep(false);
        this.validating.set(false);
      }
    });
  }

  private updateQueueSignals(): void {
    const queue = this.offlineService.getQueue();
    this.pendingQueue.set([...queue]);
    this.queueCount.set(queue.length);
  }

  private playBeep(success: boolean): void {
    try {
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.frequency.value = success ? 880 : 220;
      oscillator.type = 'sine';
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch { /* AudioContext may be blocked before user gesture */ }
  }

  ngOnDestroy(): void { this.stopCamera(); }
}
