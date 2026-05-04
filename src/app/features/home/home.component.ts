import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { EventService } from '../../core/services/event.service';
import { EventListResponse } from '../../core/models';

const CATEGORIES = [
  { labelKey: 'HOME.CAT_SHOWS',    icon: 'music_note',     value: 'Show / Concerto' },
  { labelKey: 'HOME.CAT_FESTIVAL', icon: 'festival',        value: 'Festival' },
  { labelKey: 'HOME.CAT_TEATRO',   icon: 'theater_comedy',  value: 'Teatro' },
  { labelKey: 'HOME.CAT_STANDUP',  icon: 'mic',             value: 'Stand-up Comedy' },
  { labelKey: 'HOME.CAT_ESPORTES', icon: 'sports_soccer',   value: 'Esportes' },
  { labelKey: 'HOME.CAT_CULTURA',  icon: 'palette',         value: 'Cultura' },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatChipsModule, MatProgressSpinnerModule, MatCardModule,
    TranslateModule
  ],
  template: `
    <!-- Hero ──────────────────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content container">
        <div class="hero-text fade-in">
          <span class="hero-eyebrow">{{ 'HOME.EYEBROW' | translate }}</span>
          <h1>{{ 'HOME.HERO_TITLE' | translate }} <span class="gradient-text">{{ 'HOME.HERO_TITLE_HIGHLIGHT' | translate }}</span> {{ 'HOME.HERO_TITLE_SUFFIX' | translate }}</h1>
          <p>{{ 'HOME.HERO_DESC' | translate }}</p>
        </div>

        <div class="search-card fade-in-delay-1">
          <div class="search-row">
            <div class="search-field">
              <mat-icon>search</mat-icon>
              <input [(ngModel)]="searchQuery" (keyup.enter)="goSearch()"
                     [placeholder]="'HOME.SEARCH_PLACEHOLDER' | translate" class="search-input">
            </div>
            <button mat-raised-button color="accent" (click)="goSearch()" class="search-btn">
              {{ 'HOME.SEARCH_BTN' | translate }}
            </button>
          </div>

          <div class="quick-cats">
            @for (cat of categories; track cat.value) {
              <button class="cat-pill" (click)="goCategory(cat.value)">
                <mat-icon>{{ cat.icon }}</mat-icon>
                {{ cat.labelKey | translate }}
              </button>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Stats bar ──────────────────────────────────────────────────────────── -->
    <section class="stats-bar">
      <div class="container stats-inner">
        @for (stat of stats; track stat.labelKey) {
          <div class="stat-item">
            <strong class="stat-num">{{ stat.value }}</strong>
            <span class="stat-lbl">{{ stat.labelKey | translate }}</span>
          </div>
        }
      </div>
    </section>

    <!-- Featured events ─────────────────────────────────────────────────────── -->
    <section class="container events-section">
      <div class="section-header">
        <div>
          <h2 class="section-title">{{ 'HOME.UPCOMING_EVENTS' | translate }}</h2>
          <p class="section-subtitle">{{ 'HOME.UPCOMING_SUBTITLE' | translate }}</p>
        </div>
        <a mat-stroked-button color="primary" routerLink="/events">
          {{ 'HOME.VIEW_ALL' | translate }} <mat-icon>arrow_forward</mat-icon>
        </a>
      </div>

      @if (loading) {
        <div class="skeleton-grid">
          @for (n of [1,2,3,4,5,6]; track n) {
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
        <div class="empty-state">
          <mat-icon class="empty-icon">event_busy</mat-icon>
          <h2>{{ 'HOME.NO_EVENTS' | translate }}</h2>
          <p>{{ 'HOME.NO_EVENTS_SUB' | translate }}</p>
        </div>
      } @else {
        <div class="events-grid">
          @for (event of events; track event.id) {
            <div class="event-card-wrap fade-in" [routerLink]="['/events', event.id]">
              <div class="ec-image" [style.background-image]="'url(' + (event.imageUrl || getDefaultImg(event.category)) + ')'">
                @if (event.category) {
                  <span class="ec-badge">{{ event.category }}</span>
                }
                <div class="ec-overlay"></div>
                <div class="ec-price-tag">
                  @if (event.minPrice === 0) {
                    <span class="tag-free">{{ 'HOME.FREE' | translate }}</span>
                  } @else {
                    <span class="tag-price">{{ 'HOME.FROM_PRICE' | translate }} {{ event.minPrice | currency:'BRL':'symbol':'1.0-0' }}</span>
                  }
                </div>
              </div>
              <div class="ec-body">
                <h3 class="ec-title">{{ event.title }}</h3>
                <div class="ec-meta">
                  <span><mat-icon>calendar_today</mat-icon>{{ event.dateTime | date:'dd MMM yyyy':'':'pt' }}</span>
                  <span><mat-icon>location_on</mat-icon>{{ event.city }}/{{ event.state }}</span>
                </div>
                <button mat-raised-button color="primary" class="ec-btn">
                  <mat-icon>confirmation_number</mat-icon> {{ 'HOME.BUY' | translate }}
                </button>
              </div>
            </div>
          }
        </div>
      }
    </section>

    <!-- Category showcase ──────────────────────────────────────────────────── -->
    <section class="cat-section">
      <div class="container">
        <h2 class="section-title text-center">{{ 'HOME.EXPLORE_CATS' | translate }}</h2>
        <p class="section-subtitle text-center">{{ 'HOME.EXPLORE_SUBTITLE' | translate }}</p>
        <div class="cat-grid">
          @for (cat of categories; track cat.value) {
            <div class="cat-card" (click)="goCategory(cat.value)">
              <div class="cat-icon-wrap">
                <mat-icon>{{ cat.icon }}</mat-icon>
              </div>
              <span>{{ cat.labelKey | translate }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- How it works ───────────────────────────────────────────────────────── -->
    <section class="how-section">
      <div class="container">
        <h2 class="section-title text-center">{{ 'HOME.HOW_TITLE' | translate }}</h2>
        <p class="section-subtitle text-center">{{ 'HOME.HOW_SUBTITLE' | translate }}</p>
        <div class="steps-grid">
          @for (step of steps; track step.num) {
            <div class="step-card">
              <div class="step-num">{{ step.num }}</div>
              <div class="step-icon"><mat-icon>{{ step.icon }}</mat-icon></div>
              <h3>{{ step.titleKey | translate }}</h3>
              <p>{{ step.descKey | translate }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Why us ─────────────────────────────────────────────────────────────── -->
    <section class="why-section container">
      <div class="why-grid">
        @for (item of whyUs; track item.titleKey) {
          <div class="why-card">
            <div class="why-icon"><mat-icon>{{ item.icon }}</mat-icon></div>
            <h3>{{ item.titleKey | translate }}</h3>
            <p>{{ item.descKey | translate }}</p>
          </div>
        }
      </div>
    </section>

    <!-- CTA ────────────────────────────────────────────────────────────────── -->
    <section class="cta-section">
      <div class="container cta-inner">
        <div class="cta-text">
          <h2>{{ 'HOME.CTA_TITLE' | translate }}</h2>
          <p>{{ 'HOME.CTA_DESC' | translate }}</p>
        </div>
        <a mat-raised-button routerLink="/register" class="cta-btn">
          {{ 'HOME.CTA_BTN' | translate }} <mat-icon>arrow_forward</mat-icon>
        </a>
      </div>
    </section>
  `,
  styles: [`
    /* ── Hero ── */
    .hero {
      position: relative;
      min-height: 560px;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding-top: 64px; /* navbar height */
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #200080 0%, #6200ea 45%, #9c27b0 100%);
      z-index: 0;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }
    }

    .hero-content {
      position: relative;
      z-index: 1;
      color: white;
      padding: 48px 20px;
      max-width: 760px;
    }

    .hero-eyebrow {
      display: inline-block;
      background: rgba(255,255,255,.12);
      border: 1px solid rgba(255,255,255,.2);
      border-radius: 20px;
      padding: 4px 14px;
      font-size: 0.85rem;
      font-weight: 500;
      margin-bottom: 20px;
    }

    h1 {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      line-height: 1.15;
      margin: 0 0 16px;
      letter-spacing: -1px;
    }

    .hero-content > p {
      font-size: 1.1rem;
      opacity: .85;
      margin-bottom: 32px;
      max-width: 560px;
    }

    .gradient-text {
      background: linear-gradient(135deg, #e040fb 0%, #ff6d00 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ── Search card ── */
    .search-card {
      background: rgba(255,255,255,.12);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,.2);
      border-radius: 16px;
      padding: 20px;
      max-width: 680px;
    }

    .search-row {
      display: flex;
      gap: 10px;
      margin-bottom: 14px;

      @media (max-width: 480px) { flex-direction: column; }
    }

    .search-field {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      background: white;
      border-radius: 10px;
      padding: 0 14px;

      mat-icon { color: #9e9e9e; flex-shrink: 0; }
    }

    .search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 0.95rem;
      height: 46px;
      background: transparent;
      font-family: 'Inter', sans-serif;
      color: #1a1a2e;

      &::placeholder { color: #9e9e9e; }
    }

    .search-btn {
      height: 46px;
      padding: 0 24px;
      border-radius: 10px !important;
      font-weight: 600;
      white-space: nowrap;
    }

    .quick-cats {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .cat-pill {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(255,255,255,.15);
      border: 1px solid rgba(255,255,255,.25);
      color: white;
      border-radius: 20px;
      padding: 4px 12px;
      font-size: 0.8rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
      font-family: 'Inter', sans-serif;

      mat-icon { font-size: 14px; width: 14px; height: 14px; }

      &:hover { background: rgba(255,255,255,.25); }
    }

    /* ── Stats bar ── */
    .stats-bar {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 20px 0;
      box-shadow: var(--shadow-sm);
    }

    .stats-inner {
      display: flex;
      justify-content: center;
      gap: 48px;
      flex-wrap: wrap;

      @media (max-width: 480px) { gap: 24px; }
    }

    .stat-item { text-align: center; }
    .stat-num {
      display: block;
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--primary);
    }
    .stat-lbl { font-size: 0.8rem; color: var(--text-secondary); font-weight: 500; }

    /* ── Events section ── */
    .events-section {
      padding: 56px 20px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 32px;
      gap: 16px;
      flex-wrap: wrap;
    }

    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;

      @media (max-width: 600px) { grid-template-columns: 1fr; }
    }

    /* ── Event card (new design) ── */
    .event-card-wrap {
      background: var(--surface);
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      border: 1px solid var(--border);
      transition: transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1);
      display: flex;
      flex-direction: column;

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 40px rgba(98,0,234,.15) !important;

        .ec-btn { opacity: 1; transform: translateY(0); }
      }
    }

    .ec-image {
      position: relative;
      height: 210px;
      background-size: cover;
      background-position: center;
    }

    .ec-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 60%);
    }

    .ec-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(255,255,255,.95);
      color: var(--primary);
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .5px;
      padding: 3px 10px;
      border-radius: 20px;
    }

    .ec-price-tag {
      position: absolute;
      bottom: 12px;
      right: 12px;
    }

    .tag-price, .tag-free {
      background: var(--primary);
      color: white;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 20px;
    }

    .tag-free { background: var(--success); }

    .ec-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }

    .ec-title {
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

    .ec-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;
      color: var(--text-secondary);
      font-size: 0.82rem;
      flex: 1;

      span {
        display: flex;
        align-items: center;
        gap: 4px;
        mat-icon { font-size: 14px; width: 14px; height: 14px; flex-shrink: 0; }
      }
    }

    .ec-btn {
      width: 100%;
      height: 40px;
      border-radius: 8px !important;
      font-weight: 600;
      margin-top: 8px;
      opacity: 0.9;
      transform: translateY(2px);
      transition: opacity 0.2s, transform 0.2s;
    }

    /* ── Category section ── */
    .cat-section {
      background: var(--surface-2);
      padding: 56px 0;
    }

    .cat-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 16px;
      margin-top: 32px;

      @media (max-width: 900px) { grid-template-columns: repeat(3, 1fr); }
      @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
    }

    .cat-card {
      background: var(--surface);
      border-radius: var(--radius-md);
      padding: 24px 12px;
      text-align: center;
      cursor: pointer;
      border: 1px solid var(--border);
      transition: all 0.2s;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--text-primary);

      &:hover {
        border-color: var(--primary);
        color: var(--primary);
        transform: translateY(-3px);
        box-shadow: var(--shadow-md);
        .cat-icon-wrap { background: var(--primary); mat-icon { color: white; } }
      }
    }

    .cat-icon-wrap {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(98, 0, 234, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      mat-icon { color: var(--primary); font-size: 24px; width: 24px; height: 24px; transition: color 0.2s; }
    }

    /* ── How it works ── */
    .how-section {
      padding: 64px 0;
      background: var(--surface);
    }

    .steps-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      margin-top: 40px;

      @media (max-width: 768px) { grid-template-columns: 1fr; gap: 24px; }
    }

    .step-card {
      text-align: center;
      padding: 32px 24px;
      border-radius: var(--radius-lg);
      background: var(--background);
      border: 1px solid var(--border);
      position: relative;

      h3 { font-size: 1.1rem; font-weight: 700; margin: 12px 0 8px; }
      p  { color: var(--text-secondary); font-size: 0.9rem; margin: 0; line-height: 1.5; }
    }

    .step-num {
      position: absolute;
      top: -14px;
      left: 50%;
      transform: translateX(-50%);
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--primary);
      color: white;
      font-size: 0.8rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .step-icon {
      mat-icon { font-size: 42px; width: 42px; height: 42px; color: var(--primary); }
    }

    /* ── Why us ── */
    .why-section {
      padding: 56px 20px;
    }

    .why-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;

      @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 480px) { grid-template-columns: 1fr; }
    }

    .why-card {
      padding: 24px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      background: var(--surface);
      transition: box-shadow 0.2s;

      &:hover { box-shadow: var(--shadow-md); }

      h3 { font-size: 0.95rem; font-weight: 700; margin: 12px 0 6px; }
      p  { color: var(--text-secondary); font-size: 0.85rem; margin: 0; line-height: 1.5; }
    }

    .why-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(98, 0, 234, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      mat-icon { color: var(--primary); font-size: 22px; width: 22px; height: 22px; }
    }

    /* ── CTA ── */
    .cta-section {
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 60%, #e040fb 100%);
      padding: 56px 0;
      margin-top: 48px;
    }

    .cta-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      flex-wrap: wrap;
    }

    .cta-text {
      color: white;
      h2 { font-size: 1.6rem; font-weight: 800; margin: 0 0 8px; }
      p  { opacity: .85; margin: 0; font-size: 1rem; }
    }

    .cta-btn {
      background: white !important;
      color: var(--primary) !important;
      font-weight: 700 !important;
      padding: 0 28px !important;
      height: 48px !important;
      border-radius: 12px !important;
      font-size: 1rem !important;
      white-space: nowrap;
    }
  `]
})
export class HomeComponent implements OnInit {
  private eventService = inject(EventService);
  private router = inject(Router);

  events: EventListResponse[] = [];
  loading = true;
  searchQuery = '';

  categories = CATEGORIES;

  stats = [
    { value: '500+',   labelKey: 'HOME.STAT_EVENTS' },
    { value: '50K+',   labelKey: 'HOME.STAT_TICKETS' },
    { value: '120+',   labelKey: 'HOME.STAT_CITIES' },
    { value: '4.9 ★',  labelKey: 'HOME.STAT_RATING' },
  ];

  steps = [
    { num: '1', icon: 'search',          titleKey: 'HOME.STEP1_TITLE', descKey: 'HOME.STEP1_DESC' },
    { num: '2', icon: 'credit_card',     titleKey: 'HOME.STEP2_TITLE', descKey: 'HOME.STEP2_DESC' },
    { num: '3', icon: 'qr_code_scanner', titleKey: 'HOME.STEP3_TITLE', descKey: 'HOME.STEP3_DESC' },
  ];

  whyUs = [
    { icon: 'security',      titleKey: 'HOME.WHY1_TITLE', descKey: 'HOME.WHY1_DESC' },
    { icon: 'bolt',          titleKey: 'HOME.WHY2_TITLE', descKey: 'HOME.WHY2_DESC' },
    { icon: 'pix',           titleKey: 'HOME.WHY3_TITLE', descKey: 'HOME.WHY3_DESC' },
    { icon: 'support_agent', titleKey: 'HOME.WHY4_TITLE', descKey: 'HOME.WHY4_DESC' },
  ];

  ngOnInit(): void {
    this.eventService.getEvents({ page: 1, pageSize: 6 }).subscribe({
      next: (result) => { this.events = result.items; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  goSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/events'], { queryParams: { search: this.searchQuery } });
    } else {
      this.router.navigate(['/events']);
    }
  }

  goCategory(category: string): void {
    this.router.navigate(['/events'], { queryParams: { category } });
  }

  getDefaultImg(category?: string): string {
    const map: Record<string, string> = {
      'Show / Concerto': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
      'Festival':        'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80',
      'Teatro':          'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&q=80',
      'Stand-up Comedy': 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=600&q=80',
      'Esportes':        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
    };
    return map[category ?? ''] ?? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80';
  }
}
