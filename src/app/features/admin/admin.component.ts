import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EventService } from '../../core/services/event.service';
import { EventListResponse, EventStatus } from '../../core/models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatButtonModule, MatCardModule, MatIconModule,
    MatProgressSpinnerModule, MatTableModule, MatChipsModule, MatSnackBarModule,
    TranslateModule
  ],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <h1 class="section-title">{{ 'ADMIN.TITLE' | translate }}</h1>
        <a mat-raised-button color="primary" routerLink="/admin/create-event">
          <mat-icon>add</mat-icon> {{ 'ADMIN.CREATE_EVENT' | translate }}
        </a>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-icon>event</mat-icon>
          <div>
            <h3>{{ events.length }}</h3>
            <p>{{ 'ADMIN.ACTIVE_EVENTS' | translate }}</p>
          </div>
        </mat-card>
        <mat-card class="stat-card">
          <mat-icon color="primary">check_circle</mat-icon>
          <div>
            <h3>{{ activeEvents }}</h3>
            <p>{{ 'ADMIN.ACTIVE_EVENTS' | translate }}</p>
          </div>
        </mat-card>
        <mat-card class="stat-card">
          <mat-icon style="color:#ff6d00">confirmation_number</mat-icon>
          <div>
            <h3>{{ totalSold }}</h3>
            <p>{{ 'ADMIN.TICKETS_SOLD' | translate }}</p>
          </div>
        </mat-card>
      </div>

      <!-- Ferramentas -->
      <div class="tools-section">
        <h2 class="tools-title">{{ 'ADMIN.TOOLS_TITLE' | translate }}</h2>
        <div class="tools-grid">
          <a mat-raised-button routerLink="/admin/analytics" class="tool-btn">
            <mat-icon>bar_chart</mat-icon>
            <span>{{ 'ADMIN.ANALYTICS' | translate }}</span>
          </a>
          <a mat-raised-button routerLink="/admin/affiliates" class="tool-btn">
            <mat-icon>share</mat-icon>
            <span>{{ 'ADMIN.AFFILIATES' | translate }}</span>
          </a>
          <a mat-raised-button routerLink="/admin/coupons" class="tool-btn">
            <mat-icon>discount</mat-icon>
            <span>{{ 'ADMIN.COUPONS' | translate }}</span>
          </a>
          <a mat-raised-button color="primary" routerLink="/admin/payment-links" class="tool-btn">
            <mat-icon>add_link</mat-icon>
            <span>{{ 'ADMIN.PAYMENT_LINKS' | translate }}</span>
          </a>
          <a mat-raised-button color="warn" routerLink="/admin/flash-sales" class="tool-btn">
            <mat-icon>bolt</mat-icon>
            <span>{{ 'ADMIN.FLASH_SALES' | translate }}</span>
          </a>
        </div>
      </div>

      <!-- Events Table -->
      <mat-card class="table-card">
        <mat-card-header>
          <mat-card-title>{{ 'ADMIN.MY_EVENTS' | translate }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          @if (loading) {
            <div class="loading-overlay"><mat-progress-spinner mode="indeterminate" /></div>
          } @else if (events.length === 0) {
            <div class="empty-state">
              <mat-icon>event_note</mat-icon>
              <p>{{ 'ADMIN.NO_EVENTS' | translate }} <a routerLink="/admin/create-event">{{ 'ADMIN.CREATE_EVENT' | translate }}</a></p>
            </div>
          } @else {
            <table mat-table [dataSource]="events" class="full-width">
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef>{{ 'SCAN.EVENT' | translate }}</th>
                <td mat-cell *matCellDef="let e">
                  <strong>{{ e.title }}</strong>
                  <br><small>{{ e.city }}/{{ e.state }}</small>
                </td>
              </ng-container>

              <ng-container matColumnDef="dateTime">
                <th mat-header-cell *matHeaderCellDef>{{ 'COMMON.CREATED_AT' | translate }}</th>
                <td mat-cell *matCellDef="let e">{{ e.dateTime | date:'dd/MM/yyyy' }}</td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>{{ 'COUPONS.STATUS' | translate }}</th>
                <td mat-cell *matCellDef="let e">
                  <mat-chip [class]="getStatusClass(e.status)">{{ getStatusLabel(e.status) | translate }}</mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="tickets">
                <th mat-header-cell *matHeaderCellDef>{{ 'ADMIN.TICKETS_SOLD' | translate }}</th>
                <td mat-cell *matCellDef="let e">{{ e.totalTicketsAvailable }}</td>
              </ng-container>

              <ng-container matColumnDef="minPrice">
                <th mat-header-cell *matHeaderCellDef>{{ 'CHECKOUT.TOTAL' | translate }}</th>
                <td mat-cell *matCellDef="let e">
                  @if (e.minPrice === 0) { {{ 'EVENTS.FREE' | translate }} } @else { {{ e.minPrice | currency:'BRL' }} }
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>{{ 'COMMON.EDIT' | translate }}</th>
                <td mat-cell *matCellDef="let e">
                  <a mat-icon-button [routerLink]="['/events', e.id]" title="Ver evento">
                    <mat-icon>visibility</mat-icon>
                  </a>
                  <button mat-icon-button color="warn" (click)="cancelEvent(e)" title="Cancelar"
                          [disabled]="e.status !== EventStatus.Active">
                    <mat-icon>cancel</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container { padding: 32px 16px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px;
      @media (max-width: 600px) { grid-template-columns: 1fr; } }
    .stat-card { display: flex; align-items: center; gap: 16px; padding: 24px;
      mat-icon { font-size: 48px; width: 48px; height: 48px; }
      h3 { font-size: 2rem; font-weight: 700; margin: 0; }
      p { margin: 4px 0 0; color: var(--text-secondary); } }
    .tools-section { margin-bottom: 32px; }
    .tools-title { font-size: 1.1rem; font-weight: 600; margin: 0 0 16px; color: var(--text-primary); }
    .tools-grid { display: flex; gap: 12px; flex-wrap: wrap; }
    .tool-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 20px 32px;
      mat-icon { font-size: 28px; width: 28px; height: 28px; }
      span { font-size: 0.9rem; }
    }
    .table-card mat-card-content { overflow-x: auto; }
    .empty-state { text-align: center; padding: 32px; color: var(--text-secondary);
      mat-icon { font-size: 48px; width: 48px; height: 48px; display: block; margin: 0 auto 8px; }
      a { color: var(--primary); } }
  `]
})
export class AdminComponent implements OnInit {
  private eventService = inject(EventService);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  events: EventListResponse[] = [];
  loading = true;
  EventStatus = EventStatus;
  displayedColumns = ['title', 'dateTime', 'status', 'tickets', 'minPrice', 'actions'];

  get activeEvents(): number {
    return this.events.filter(e => e.status === EventStatus.Active).length;
  }

  get totalSold(): number {
    return this.events.reduce((sum, e) => sum + (e.totalTicketsAvailable > 0 ? 0 : 0), 0);
  }

  ngOnInit(): void {
    this.eventService.getMyEvents().subscribe({
      next: (events) => { this.events = events; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  cancelEvent(event: EventListResponse): void {
    if (!confirm(this.translate.instant('ADMIN.CONFIRM_CANCEL_EVENT', { title: event.title }))) return;
    this.eventService.updateEvent(event.id, { status: EventStatus.Cancelled } as any).subscribe({
      next: () => {
        event.status = EventStatus.Cancelled;
        this.snackBar.open(this.translate.instant('ADMIN.EVENT_CANCELLED'), 'OK', { duration: 3000 });
      },
      error: (err) => this.snackBar.open(err.error?.error || this.translate.instant('MY_EVENTS.CANCEL_ERROR'), 'Fechar', { duration: 3000 })
    });
  }

  getStatusLabel(status: EventStatus): string {
    const labels: Record<number, string> = { 0: 'EVENT_STATUS.DRAFT', 1: 'EVENT_STATUS.ACTIVE', 2: 'EVENT_STATUS.CANCELLED', 3: 'EVENT_STATUS.ENDED' };
    return labels[status] || 'EVENT_STATUS.UNKNOWN';
  }

  getStatusClass(status: EventStatus): string {
    const classes: Record<number, string> = { 1: 'status-active', 2: 'status-cancelled', 0: 'status-pending', 3: 'status-pending' };
    return classes[status] || '';
  }
}
