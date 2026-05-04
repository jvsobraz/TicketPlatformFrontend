import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EventService } from '../../../core/services/event.service';
import { EventListResponse } from '../../../core/models';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule, FormsModule,
    MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule,
    MatSelectModule, MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule,
    TranslateModule
  ],
  template: `
    <div class="my-events-page">
      <!-- Header -->
      <div class="page-hero">
        <div class="container">
          <div class="hero-row">
            <a mat-icon-button routerLink="/admin" class="back-btn">
              <mat-icon>arrow_back</mat-icon>
            </a>
            <div class="hero-text">
              <h1 class="page-title">{{ 'MY_EVENTS.PAGE_TITLE' | translate }}</h1>
              <p class="page-subtitle">{{ 'MY_EVENTS.SUBTITLE' | translate }}</p>
            </div>
            <a mat-raised-button routerLink="/admin/create-event" class="new-btn">
              <mat-icon>add</mat-icon> {{ 'MY_EVENTS.NEW_EVENT' | translate }}
            </a>
          </div>
        </div>
      </div>

      <div class="container events-content">
        @if (loading()) {
          <div class="skeleton-list">
            @for (n of [1,2,3]; track n) {
              <div class="skeleton-card skeleton"></div>
            }
          </div>
        } @else if (events().length === 0) {
          <div class="empty-state fade-in">
            <mat-icon class="empty-icon">event_busy</mat-icon>
            <h2>{{ 'MY_EVENTS.NO_EVENTS_TITLE' | translate }}</h2>
            <p>{{ 'MY_EVENTS.CREATE_FIRST_DESC' | translate }}</p>
            <a mat-raised-button color="primary" routerLink="/admin/create-event">
              <mat-icon>add</mat-icon> {{ 'MY_EVENTS.CREATE' | translate }}
            </a>
          </div>
        } @else {
          <div class="events-list fade-in">
            @for (event of events(); track event.id) {
              <div class="event-row" [class.cancelled]="event.status === 3">
                <!-- Imagem + info -->
                <div class="event-img"
                     [style.background-image]="'url(' + (event.imageUrl || getDefaultImg(event.category)) + ')'">
                  <span class="status-badge" [class]="getStatusClass(event.status)">
                    {{ getStatusLabel(event.status) }}
                  </span>
                </div>

                <div class="event-info">
                  <h3 class="event-title">{{ event.title }}</h3>
                  <div class="event-meta-row">
                    <span><mat-icon>calendar_today</mat-icon>{{ event.dateTime | date:'dd/MM/yyyy HH:mm' }}</span>
                    <span><mat-icon>location_on</mat-icon>{{ event.venue }}, {{ event.city }}/{{ event.state }}</span>
                    @if (event.category) { <span><mat-icon>label</mat-icon>{{ event.category }}</span> }
                  </div>
                  <div class="tickets-info">
                    <span class="tickets-sold">{{ event.totalTicketsAvailable }} {{ 'MY_EVENTS.SLOTS_AVAILABLE' | translate }}</span>
                    @if (event.minPrice === 0) {
                      <span class="price-badge free">{{ 'MY_EVENTS.FREE' | translate }}</span>
                    } @else {
                      <span class="price-badge">{{ 'MY_EVENTS.FROM_PRICE' | translate }} {{ event.minPrice | currency:'BRL' }}</span>
                    }
                  </div>
                </div>

                <!-- Actions -->
                <div class="event-actions">
                  <a mat-icon-button [routerLink]="['/events', event.id]" [title]="'MY_EVENTS.VIEW_EVENT' | translate">
                    <mat-icon>visibility</mat-icon>
                  </a>
                  <a mat-icon-button [routerLink]="['/admin/analytics']" [title]="'MY_EVENTS.ANALYTICS' | translate">
                    <mat-icon>bar_chart</mat-icon>
                  </a>
                  <button mat-icon-button [title]="'MY_EVENTS.EXPORT_ATTENDEES' | translate" (click)="exportAttendees(event)">
                    <mat-icon>download</mat-icon>
                  </button>
                  <button mat-icon-button (click)="openEdit(event)" [title]="'MY_EVENTS.EDIT_EVENT' | translate">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="confirmDelete(event)" [title]="'MY_EVENTS.CANCEL_EVENT' | translate"
                          [disabled]="event.status === 3">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>

    <!-- Edit modal overlay -->
    @if (editingEvent()) {
      <div class="modal-backdrop" (click)="closeEdit()">
        <div class="modal-box" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ 'MY_EVENTS.EDIT_EVENT_MODAL' | translate }}</h2>
            <button mat-icon-button (click)="closeEdit()"><mat-icon>close</mat-icon></button>
          </div>
          <form [formGroup]="editForm" (ngSubmit)="saveEdit()" class="edit-form">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ 'MY_EVENTS.TITLE_FIELD' | translate }}</mat-label>
              <input matInput formControlName="title">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ 'MY_EVENTS.DESC_FIELD' | translate }}</mat-label>
              <textarea matInput formControlName="description" rows="3"></textarea>
            </mat-form-field>

            <div class="form-row-2">
              <mat-form-field appearance="outline">
                <mat-label>{{ 'MY_EVENTS.VENUE_FIELD' | translate }}</mat-label>
                <input matInput formControlName="venue">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>{{ 'MY_EVENTS.CITY_FIELD' | translate }}</mat-label>
                <input matInput formControlName="city">
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ 'MY_EVENTS.IMAGE_URL' | translate }}</mat-label>
              <input matInput formControlName="imageUrl">
            </mat-form-field>

            <div class="modal-actions">
              <button mat-button type="button" (click)="closeEdit()">{{ 'COMMON.CANCEL' | translate }}</button>
              <button mat-raised-button color="primary" type="submit"
                      [disabled]="editForm.invalid || saving()">
                @if (saving()) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                @else { <mat-icon>save</mat-icon> {{ 'COMMON.SAVE' | translate }} }
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    .my-events-page { padding-top: 64px; }

    .page-hero {
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
      padding: 32px 0 24px;
    }

    .hero-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .back-btn { color: white !important; flex-shrink: 0; }
    .hero-text { flex: 1; }
    .page-title { font-size: clamp(1.3rem, 3vw, 1.8rem); font-weight: 800; color: white; margin: 0 0 4px; }
    .page-subtitle { color: rgba(255,255,255,.75); margin: 0; }

    .new-btn {
      background: rgba(255,255,255,.15) !important;
      color: white !important;
      border-radius: 8px !important;
      flex-shrink: 0;
    }

    .events-content { padding: 28px 16px 64px; }

    /* Event row */
    .events-list { display: flex; flex-direction: column; gap: 16px; }

    .event-row {
      display: flex;
      background: var(--surface);
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
      transition: box-shadow var(--transition);
      gap: 0;

      &:hover { box-shadow: var(--shadow-md); }
      &.cancelled { opacity: 0.6; }

      @media (max-width: 640px) { flex-direction: column; }
    }

    .event-img {
      width: 140px;
      flex-shrink: 0;
      background-size: cover;
      background-position: center;
      background-color: var(--surface-2);
      position: relative;

      @media (max-width: 640px) { width: 100%; height: 120px; }
    }

    .status-badge {
      position: absolute;
      top: 8px;
      left: 8px;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: .5px;

      &.active    { background: var(--success-bg); color: var(--success-text); }
      &.published { background: var(--info-bg);    color: var(--info-text); }
      &.draft     { background: var(--warning-bg); color: var(--warning-text); }
      &.cancelled { background: var(--error-bg);   color: var(--error-text); }
    }

    .event-info {
      flex: 1;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .event-title {
      font-size: 1rem;
      font-weight: 700;
      margin: 0;
      color: var(--text-primary);
    }

    .event-meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      span {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.78rem;
        color: var(--text-secondary);
        mat-icon { font-size: 13px; width: 13px; height: 13px; }
      }
    }

    .tickets-info { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 4px; }

    .tickets-sold { font-size: 0.8rem; color: var(--text-hint); }

    .price-badge {
      background: var(--primary);
      color: white;
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 700;
      &.free { background: #43a047; }
    }

    .event-actions {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 8px;
      gap: 0;
      border-left: 1px solid var(--border);
      @media (max-width: 640px) { flex-direction: row; border-left: none; border-top: 1px solid var(--border); }
    }

    /* Skeleton */
    .skeleton-list { display: flex; flex-direction: column; gap: 16px; }
    .skeleton-card { height: 100px; border-radius: var(--radius-md); }

    /* Modal */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.5);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .modal-box {
      background: var(--surface);
      border-radius: var(--radius-lg);
      width: 100%;
      max-width: 560px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: var(--shadow-xl);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px 0;
      h2 { font-size: 1.1rem; font-weight: 700; margin: 0; }
    }

    .edit-form { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 12px; }
    .full-width { width: 100%; }
    .form-row-2 { display: flex; gap: 12px; mat-form-field { flex: 1; } }
    .modal-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; }
  `]
})
export class MyEventsComponent implements OnInit {
  private eventService = inject(EventService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);

  events = signal<EventListResponse[]>([]);
  loading = signal(true);
  editingEvent = signal<EventListResponse | null>(null);
  saving = signal(false);

  editForm = this.fb.group({
    title:       ['', Validators.required],
    description: ['', Validators.required],
    venue:       ['', Validators.required],
    city:        ['', Validators.required],
    imageUrl:    ['']
  });

  ngOnInit(): void {
    this.eventService.getMyEvents().subscribe({
      next: (evts) => { this.events.set(evts); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  openEdit(event: EventListResponse): void {
    this.editingEvent.set(event);
    this.editForm.patchValue({
      title: event.title,
      description: event.description,
      venue: event.venue,
      city: event.city,
      imageUrl: event.imageUrl ?? ''
    });
  }

  closeEdit(): void { this.editingEvent.set(null); }

  saveEdit(): void {
    if (this.editForm.invalid || !this.editingEvent()) return;
    this.saving.set(true);
    const ev = this.editingEvent()!;
    this.eventService.updateEvent(ev.id, this.editForm.value as any).subscribe({
      next: () => {
        this.saving.set(false);
        this.closeEdit();
        this.snackBar.open(this.translate.instant('MY_EVENTS.UPDATED'), 'OK', { duration: 3000, panelClass: 'success-snackbar' });
        this.ngOnInit();
      },
      error: (err) => {
        this.saving.set(false);
        this.snackBar.open(err.error?.error || this.translate.instant('MY_EVENTS.UPDATE_ERROR'), 'Fechar', { duration: 3000 });
      }
    });
  }

  confirmDelete(event: EventListResponse): void {
    if (!confirm(`${this.translate.instant('MY_EVENTS.CANCEL_CONFIRM_PREFIX')} "${event.title}"${this.translate.instant('MY_EVENTS.CANCEL_CONFIRM_SUFFIX')}`)) return;
    this.eventService.deleteEvent(event.id).subscribe({
      next: () => {
        this.snackBar.open(this.translate.instant('MY_EVENTS.CANCELLED_SUCCESS'), 'OK', { duration: 3000 });
        this.ngOnInit();
      },
      error: (err) => this.snackBar.open(err.error?.error || this.translate.instant('MY_EVENTS.CANCEL_ERROR'), 'Fechar', { duration: 3000 })
    });
  }

  exportAttendees(event: EventListResponse): void {
    const url = `/Events/${event.id}/attendees?csv=true`;
    const a = document.createElement('a');
    a.href = url;
    a.download = `participantes-${event.id}.csv`;
    a.click();
  }

  getStatusLabel(status: number): string {
    const keys = ['MY_EVENTS.STATUS_DRAFT', 'MY_EVENTS.STATUS_PUBLISHED', 'MY_EVENTS.STATUS_ACTIVE', 'MY_EVENTS.STATUS_CANCELLED'];
    return this.translate.instant(keys[status] ?? 'MY_EVENTS.STATUS_UNKNOWN');
  }

  getStatusClass(status: number): string {
    return ['draft', 'published', 'active', 'cancelled'][status] ?? '';
  }

  getDefaultImg(category?: string): string {
    const map: Record<string, string> = {
      'Música': 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=70',
      'Esportes': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=70',
      'Teatro': 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&q=70',
      'Tecnologia': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=70',
    };
    return map[category ?? ''] ?? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=70';
  }
}
