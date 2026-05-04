import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WaitlistService } from '../../core/services/waitlist.service';
import { WaitlistEntryResponse, WaitlistStatus } from '../../core/models';

@Component({
  selector: 'app-my-waitlist',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatChipsModule, MatSnackBarModule, TranslateModule],
  template: `
    <div class="container page-container">
      <h1 class="section-title">{{ 'WAITLIST.PAGE_TITLE' | translate }}</h1>

      @if (loading) {
        <div style="text-align:center;padding:64px"><mat-progress-spinner mode="indeterminate" /></div>
      } @else if (entries.length === 0) {
        <div class="empty-state">
          <mat-icon>hourglass_empty</mat-icon>
          <h3>{{ 'WAITLIST.EMPTY_TITLE' | translate }}</h3>
          <p>{{ 'WAITLIST.EMPTY_DESC' | translate }}</p>
          <a mat-raised-button color="primary" routerLink="/events">{{ 'WAITLIST.VIEW_EVENTS' | translate }}</a>
        </div>
      } @else {
        <div class="entries-grid">
          @for (entry of entries; track entry.id) {
            <mat-card class="entry-card">
              <mat-card-header>
                <mat-card-title>{{ entry.eventTitle }}</mat-card-title>
                <mat-card-subtitle>{{ entry.ticketTypeName }} — {{ entry.requestedQuantity }} {{ 'WAITLIST.TICKET_SUFFIX' | translate }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="entry-status">
                  <mat-chip [class]="getStatusClass(entry.status)">{{ getStatusLabel(entry.status) }}</mat-chip>
                  <span class="entry-date">{{ 'WAITLIST.IN_QUEUE_SINCE' | translate }} {{ entry.createdAt | date:'dd/MM/yyyy' }}</span>
                </div>
                @if (entry.status === WaitlistStatus.Notified && entry.buyUrl) {
                  <div class="notified-banner">
                    <mat-icon>notifications_active</mat-icon>
                    <div>
                      <strong>{{ 'WAITLIST.SLOT_AVAILABLE' | translate }}</strong>
                      @if (entry.expiresAt) {
                        <p>{{ 'WAITLIST.EXPIRES_AT' | translate }} {{ entry.expiresAt | date:'dd/MM HH:mm' }}</p>
                      }
                    </div>
                    <a mat-raised-button color="accent" [href]="entry.buyUrl">{{ 'WAITLIST.BUY_NOW' | translate }}</a>
                  </div>
                }
              </mat-card-content>
              <mat-card-actions>
                @if (entry.status === WaitlistStatus.Waiting) {
                  <button mat-button color="warn" (click)="leave(entry)">
                    <mat-icon>exit_to_app</mat-icon> {{ 'WAITLIST.LEAVE_QUEUE' | translate }}
                  </button>
                }
                <a mat-button [routerLink]="['/events', entry.eventId]">{{ 'WAITLIST.VIEW_EVENT' | translate }}</a>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .page-container { padding:32px 16px; }
    .entries-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:24px; }
    .entry-status { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
    .entry-date { font-size:0.85rem; color:var(--text-secondary); }
    .notified-banner { display:flex; align-items:center; gap:12px; background:var(--warning-bg); padding:12px; border-radius:8px; border-left:4px solid #ff6d00;
      mat-icon { color:#ff6d00; } p { margin:4px 0 0; font-size:0.85rem; color:var(--text-secondary); }
    }
    .empty-state { text-align:center; padding:64px 16px;
      mat-icon { font-size:64px; width:64px; height:64px; color:var(--text-hint); display:block; margin:0 auto 16px; }
      h3 { margin:0 0 8px; } p { color:var(--text-secondary); margin:0 0 24px; }
    }
  `]
})
export class MyWaitlistComponent implements OnInit {
  private waitlistService = inject(WaitlistService);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  entries: WaitlistEntryResponse[] = [];
  loading = true;
  WaitlistStatus = WaitlistStatus;

  ngOnInit(): void {
    this.waitlistService.getMyWaitlist().subscribe({
      next: (e) => { this.entries = e; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  leave(entry: WaitlistEntryResponse): void {
    if (!confirm(this.translate.instant('WAITLIST.CONFIRM_LEAVE'))) return;
    this.waitlistService.leaveWaitlist(entry.id).subscribe({
      next: () => {
        this.entries = this.entries.filter(e => e.id !== entry.id);
        this.snackBar.open(this.translate.instant('WAITLIST.LEFT_QUEUE'), 'OK', { duration: 3000 });
      },
      error: (err) => this.snackBar.open(err.error?.error || this.translate.instant('WAITLIST.LEAVE_ERROR'), 'Fechar', { duration: 3000 })
    });
  }

  getStatusLabel(status: WaitlistStatus): string {
    const keys: Record<number, string> = {
      0: 'WAITLIST.STATUS_WAITING',
      1: 'WAITLIST.STATUS_NOTIFIED',
      2: 'WAITLIST.STATUS_PURCHASED',
      3: 'WAITLIST.STATUS_EXPIRED'
    };
    return this.translate.instant(keys[status] ?? '');
  }

  getStatusClass(status: WaitlistStatus): string {
    const classes: Record<number, string> = { 0: 'status-pending', 1: 'status-active', 2: 'status-active', 3: 'status-cancelled' };
    return classes[status];
  }
}
