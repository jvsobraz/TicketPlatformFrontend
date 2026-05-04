import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { EventService } from '../../../core/services/event.service';
import { EventListResponse } from '../../../core/models';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule, ReactiveFormsModule,
    MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatSelectModule,
    MatProgressSpinnerModule, MatPaginatorModule,
    TranslateModule
  ],
  template: `
    <div class="events-page">
      <!-- Page header -->
      <div class="page-hero">
        <div class="container">
          <h1 class="page-title">{{ 'EVENTS.PAGE_TITLE' | translate }}</h1>
          <p class="page-subtitle">{{ 'EVENTS.PAGE_SUBTITLE' | translate }}</p>
        </div>
      </div>

      <div class="container">
        <!-- Filters -->
        <form [formGroup]="filterForm" class="filters-bar" (ngSubmit)="applyFilters()">
          <mat-form-field appearance="outline" class="filter-search">
            <mat-label>{{ 'EVENTS.SEARCH_LABEL' | translate }}</mat-label>
            <mat-icon matPrefix>search</mat-icon>
            <input matInput formControlName="search" [placeholder]="'EVENTS.SEARCH_PLACEHOLDER' | translate">
          </mat-form-field>

          <mat-form-field appearance="outline" class="filter-city">
            <mat-label>{{ 'EVENTS.CITY_LABEL' | translate }}</mat-label>
            <mat-icon matPrefix>location_on</mat-icon>
            <input matInput formControlName="city" [placeholder]="'EVENTS.CITY_PLACEHOLDER' | translate">
          </mat-form-field>

          <mat-form-field appearance="outline" class="filter-category">
            <mat-label>{{ 'EVENTS.CATEGORY_LABEL' | translate }}</mat-label>
            <mat-select formControlName="category">
              <mat-option value="">{{ 'EVENTS.ALL_CATEGORIES' | translate }}</mat-option>
              @for (cat of eventService.categories; track cat) {
                <mat-option [value]="cat">{{ cat }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <div class="filter-actions">
            <button mat-raised-button color="primary" type="submit" class="btn-filter">
              <mat-icon>tune</mat-icon> {{ 'EVENTS.FILTER_BTN' | translate }}
            </button>
            <button mat-stroked-button type="button" (click)="clearFilters()" class="btn-clear">
              <mat-icon>clear</mat-icon>
            </button>
          </div>
        </form>

        <!-- Results -->
        @if (loading) {
          <div class="skeleton-grid">
            @for (n of [1,2,3,4,5,6,7,8]; track n) {
              <div class="skeleton-card">
                <div class="skeleton-img"></div>
                <div class="skeleton-body">
                  <div class="skeleton-badge"></div>
                  <div class="skeleton-title"></div>
                  <div class="skeleton-text"></div>
                  <div class="skeleton-text-sm"></div>
                  <div class="skeleton-price"></div>
                </div>
              </div>
            }
          </div>
        } @else if (events.length === 0) {
          <div class="empty-state fade-in">
            <mat-icon class="empty-icon">search_off</mat-icon>
            <h2>{{ 'EVENTS.NONE_FOUND' | translate }}</h2>
            <p>{{ 'EVENTS.NONE_FOUND_SUB' | translate }}</p>
            <button mat-raised-button color="primary" (click)="clearFilters()">
              <mat-icon>refresh</mat-icon> {{ 'EVENTS.VIEW_ALL_BTN' | translate }}
            </button>
          </div>
        } @else {
          <div class="results-header">
            <span class="results-count">
              <strong>{{ total }}</strong> {{ total === 1 ? ('EVENTS.RESULTS_SINGULAR' | translate) : ('EVENTS.RESULTS_PLURAL' | translate) }}
            </span>
          </div>

          <div class="events-grid fade-in">
            @for (event of events; track event.id) {
              <a class="event-card-wrap" [routerLink]="['/events', event.id]">
                <div class="card-img"
                     [style.background-image]="'url(' + (event.imageUrl || getDefaultImg(event.category)) + ')'">
                  <div class="card-overlay"></div>
                  @if (event.category) {
                    <span class="card-badge">{{ event.category }}</span>
                  }
                  <div class="card-price-tag">
                    @if (event.minPrice === 0) {
                      <span class="free-tag">{{ 'EVENTS.FREE' | translate }}</span>
                    } @else {
                      <span>{{ event.minPrice | currency:'BRL':'symbol':'1.0-0' }}</span>
                    }
                  </div>
                </div>
                <div class="card-body">
                  <h3 class="card-title">{{ event.title }}</h3>
                  <div class="card-meta">
                    <span><mat-icon>calendar_today</mat-icon>{{ event.dateTime | date:'dd MMM yyyy' }}</span>
                    <span><mat-icon>location_on</mat-icon>{{ event.city }}/{{ event.state }}</span>
                  </div>
                  <p class="card-desc">{{ (event.description || '') | slice:0:90 }}{{ (event.description || '').length > 90 ? '…' : '' }}</p>
                  <div class="card-footer">
                    <span class="tickets-left">
                      <mat-icon>confirmation_number</mat-icon>
                      {{ event.totalTicketsAvailable }} {{ 'EVENTS.SPOTS' | translate }}
                    </span>
                    <span class="card-cta">{{ 'EVENTS.VIEW_DETAILS' | translate }} <mat-icon>arrow_forward</mat-icon></span>
                  </div>
                </div>
              </a>
            }
          </div>

          <mat-paginator
            [length]="total"
            [pageSize]="pageSize"
            [pageIndex]="page - 1"
            [pageSizeOptions]="[8, 12, 24]"
            (page)="onPageChange($event)"
            showFirstLastButtons
            class="paginator" />
        }
      </div>
    </div>
  `,
  styles: [`
    /* ── Page hero ── */
    .events-page { padding-top: 64px; }

    .page-hero {
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
      padding: 48px 0 40px;
      margin-bottom: 0;
    }

    .page-title {
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      font-weight: 800;
      color: white;
      margin: 0 0 8px;
      letter-spacing: -0.5px;
    }

    .page-subtitle { color: rgba(255,255,255,.75); margin: 0; font-size: 1rem; }

    /* ── Filters ── */
    .filters-bar {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      flex-wrap: wrap;
      padding: 28px 0 8px;
    }

    .filter-search { flex: 2 1 240px; }
    .filter-city   { flex: 1 1 160px; }
    .filter-category { flex: 1 1 160px; }

    .filter-actions {
      display: flex;
      gap: 8px;
      padding-top: 4px;
      align-self: center;
    }

    .btn-filter { height: 56px; padding: 0 20px; border-radius: 8px !important; }
    .btn-clear  { height: 56px; min-width: 48px; padding: 0 12px; border-radius: 8px !important; }

    /* ── Results header ── */
    .results-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      padding-top: 4px;
    }

    .results-count { color: var(--text-secondary); font-size: 0.9rem; }

    /* ── Card grid ── */
    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;

      @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 580px) { grid-template-columns: 1fr; }
    }

    /* ── Card ── */
    .event-card-wrap {
      display: flex;
      flex-direction: column;
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border);
      background: var(--surface);
      text-decoration: none;
      color: inherit;
      transition: transform var(--transition), box-shadow var(--transition);

      &:hover {
        transform: translateY(-6px);
        box-shadow: var(--shadow-xl);

        .card-overlay { opacity: 0.55; }
        .card-cta mat-icon { transform: translateX(4px); }
      }
    }

    .card-img {
      position: relative;
      height: 200px;
      background-size: cover;
      background-position: center;
      background-color: var(--surface-2);
    }

    .card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.7) 100%);
      opacity: 0.45;
      transition: opacity var(--transition);
    }

    .card-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(255,255,255,.9);
      color: var(--primary);
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .5px;
      backdrop-filter: blur(4px);
    }

    .card-price-tag {
      position: absolute;
      bottom: 12px;
      right: 12px;
      background: var(--primary);
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.82rem;
      font-weight: 700;

      .free-tag { color: #a5f3c3; }
    }

    /* ── Card body ── */
    .card-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }

    .card-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      span {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.8rem;
        color: var(--text-secondary);

        mat-icon { font-size: 14px; width: 14px; height: 14px; }
      }
    }

    .card-desc {
      font-size: 0.83rem;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.5;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding-top: 8px;
      border-top: 1px solid var(--border);
    }

    .tickets-left {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.78rem;
      color: var(--text-hint);
      mat-icon { font-size: 14px; width: 14px; height: 14px; }
    }

    .card-cta {
      display: flex;
      align-items: center;
      gap: 2px;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--primary);
      mat-icon {
        font-size: 16px; width: 16px; height: 16px;
        transition: transform var(--transition);
      }
    }

    /* ── Skeleton ── */
    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
      padding-top: 28px;

      @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 580px) { grid-template-columns: 1fr; }
    }

    /* ── Paginator ── */
    .paginator { margin-top: 32px; }
  `]
})
export class EventListComponent implements OnInit {
  eventService = inject(EventService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  events: EventListResponse[] = [];
  loading = true;
  total = 0;
  page = 1;
  pageSize = 12;

  filterForm: FormGroup = this.fb.group({
    search: [''],
    city: [''],
    category: ['']
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['search']) this.filterForm.patchValue({ search: params['search'] });
      if (params['category']) this.filterForm.patchValue({ category: params['category'] });
      this.loadEvents();
    });
  }

  loadEvents(): void {
    this.loading = true;
    const { search, city, category } = this.filterForm.value;
    this.eventService.getEvents({ search, city, category, page: this.page, pageSize: this.pageSize }).subscribe({
      next: (result) => {
        this.events = result.items;
        this.total = result.total;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  applyFilters(): void {
    this.page = 1;
    this.loadEvents();
  }

  clearFilters(): void {
    this.filterForm.reset({ search: '', city: '', category: '' });
    this.page = 1;
    this.loadEvents();
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadEvents();
  }

  getDefaultImg(category?: string): string {
    const map: Record<string, string> = {
      'Música':    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80',
      'Esportes':  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
      'Teatro':    'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&q=80',
      'Tecnologia':'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
      'Gastronomia':'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
      'Arte':      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80',
    };
    return map[category ?? ''] ?? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80';
  }
}
