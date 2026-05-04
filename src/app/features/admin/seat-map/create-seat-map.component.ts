import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EventService } from '../../../core/services/event.service';
import { EventResponse } from '../../../core/models';

interface SectionForm {
  name: string;
  ticketTypeId: number | null;
  rowStart: string;
  rowEnd: string;
  seatsPerRow: number;
  color: string;
}

@Component({
  selector: 'app-create-seat-map',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    MatButtonModule, MatCardModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatSnackBarModule, MatProgressSpinnerModule, MatDividerModule,
    TranslateModule
  ],
  template: `
    <div class="container" style="max-width: 800px; padding: 32px 16px">
      <div class="page-header">
        <h1><mat-icon>event_seat</mat-icon> {{ 'CREATE_SEAT_MAP.PAGE_TITLE' | translate }}</h1>
        @if (event()) {
          <p class="event-name">{{ event()!.title }}</p>
        }
      </div>

      @if (loading()) {
        <div style="display:flex;justify-content:center;padding:48px">
          <mat-progress-spinner mode="indeterminate" />
        </div>
      } @else {
        <mat-card>
          <mat-card-content>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ 'CREATE_SEAT_MAP.MAP_NAME_LABEL' | translate }}</mat-label>
              <input matInput [(ngModel)]="mapName" [placeholder]="'CREATE_SEAT_MAP.MAP_NAME_PLACEHOLDER' | translate" maxlength="200" />
            </mat-form-field>

            <h3 class="sections-title">{{ 'CREATE_SEAT_MAP.SECTIONS_TITLE' | translate }}</h3>

            @for (section of sections(); track section; let idx = $index) {
              <div class="section-card">
                <div class="section-header">
                  <h4>{{ 'CREATE_SEAT_MAP.SECTION_N' | translate }} {{ idx + 1 }}</h4>
                  <button mat-icon-button color="warn" (click)="removeSection(idx)" [disabled]="sections().length === 1">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>

                <div class="section-fields">
                  <mat-form-field appearance="outline">
                    <mat-label>{{ 'CREATE_SEAT_MAP.SECTION_NAME_LABEL' | translate }}</mat-label>
                    <input matInput [(ngModel)]="section.name" [placeholder]="'CREATE_SEAT_MAP.SECTION_NAME_PLACEHOLDER' | translate" maxlength="100" />
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>{{ 'CREATE_SEAT_MAP.TICKET_TYPE_LABEL' | translate }}</mat-label>
                    <mat-select [(ngModel)]="section.ticketTypeId">
                      @for (tt of event()?.ticketTypes; track tt.id) {
                        <mat-option [value]="tt.id">{{ tt.name }} — {{ tt.price | currency:'BRL' }}</mat-option>
                      }
                    </mat-select>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>{{ 'CREATE_SEAT_MAP.ROW_START_LABEL' | translate }}</mat-label>
                    <input matInput [(ngModel)]="section.rowStart" maxlength="2" style="text-transform:uppercase" placeholder="A" />
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>{{ 'CREATE_SEAT_MAP.ROW_END_LABEL' | translate }}</mat-label>
                    <input matInput [(ngModel)]="section.rowEnd" maxlength="2" style="text-transform:uppercase" placeholder="J" />
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>{{ 'CREATE_SEAT_MAP.SEATS_PER_ROW_LABEL' | translate }}</mat-label>
                    <input matInput type="number" [(ngModel)]="section.seatsPerRow" min="1" max="50" />
                  </mat-form-field>

                  <div class="color-field">
                    <label>{{ 'CREATE_SEAT_MAP.SECTION_COLOR_LABEL' | translate }}</label>
                    <input type="color" [(ngModel)]="section.color" class="color-input" />
                    <span class="color-preview" [style.background]="section.color">{{ section.name || ('CREATE_SEAT_MAP.SECTION_DEFAULT' | translate) }}</span>
                  </div>
                </div>

                <div class="section-preview">
                  <small>{{ 'CREATE_SEAT_MAP.ROW_PREVIEW' | translate:{start: section.rowStart || 'A', end: section.rowEnd || 'A', count: section.seatsPerRow, total: estimateSeats(section)} }}</small>
                </div>
              </div>
              <mat-divider />
            }

            <button mat-stroked-button (click)="addSection()" class="add-section-btn">
              <mat-icon>add</mat-icon> {{ 'CREATE_SEAT_MAP.ADD_SECTION_BTN' | translate }}
            </button>
          </mat-card-content>

          <mat-card-actions>
            <button mat-raised-button color="primary" (click)="create()" [disabled]="saving()">
              @if (saving()) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
              @else { <mat-icon>save</mat-icon> {{ 'CREATE_SEAT_MAP.CREATE_BTN' | translate }} }
            </button>
            <button mat-button routerLink="/admin/my-events">{{ 'COMMON.CANCEL' | translate }}</button>
          </mat-card-actions>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px; h1 { display:flex; align-items:center; gap:8px; font-size:1.5rem; margin:0 0 4px; } }
    .event-name { color: var(--text-hint); margin: 0; }
    .full-width { width: 100%; }
    .sections-title { font-size: 1rem; font-weight: 700; margin: 24px 0 12px; }
    .section-card { padding: 16px 0; }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;
      h4 { font-size: 0.9rem; font-weight: 700; margin: 0; color: var(--text-hint); }
    }
    .section-fields { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
    .color-field { display: flex; flex-direction: column; gap: 6px;
      label { font-size: 0.8rem; color: var(--text-hint); }
    }
    .color-input { width: 48px; height: 36px; border: none; border-radius: 4px; cursor: pointer; padding: 0; }
    .color-preview { font-size: 0.78rem; padding: 3px 10px; border-radius: 12px; color: white; font-weight: 600; }
    .section-preview { font-size: 0.8rem; color: var(--text-hint); margin-top: 8px; }
    .add-section-btn { margin: 16px 0; width: 100%; }
    mat-card-actions { display: flex; gap: 12px; padding: 16px; }
  `]
})
export class CreateSeatMapComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private eventService = inject(EventService);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  event = signal<EventResponse | null>(null);
  loading = signal(true);
  saving = signal(false);
  mapName = 'Mapa Principal';

  sections = signal<SectionForm[]>([
    { name: 'Pista', ticketTypeId: null, rowStart: 'A', rowEnd: 'J', seatsPerRow: 20, color: '#4CAF50' }
  ]);

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.params['eventId']);
    this.eventService.getEventById(eventId).subscribe({
      next: (ev) => { this.event.set(ev); this.loading.set(false); },
      error: () => { this.loading.set(false); this.router.navigate(['/admin/my-events']); }
    });
  }

  addSection(): void {
    const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#00BCD4'];
    const idx = this.sections().length;
    this.sections.update(s => [...s, {
      name: `${this.translate.instant('CREATE_SEAT_MAP.SECTION_DEFAULT')} ${idx + 1}`,
      ticketTypeId: null,
      rowStart: 'A',
      rowEnd: 'E',
      seatsPerRow: 15,
      color: colors[idx % colors.length]
    }]);
  }

  removeSection(index: number): void {
    this.sections.update(s => s.filter((_, i) => i !== index));
  }

  estimateSeats(section: SectionForm): number {
    const start = section.rowStart?.toUpperCase().charCodeAt(0) || 65;
    const end = section.rowEnd?.toUpperCase().charCodeAt(0) || 65;
    const rows = Math.max(0, end - start + 1);
    return rows * (section.seatsPerRow || 0);
  }

  create(): void {
    const ev = this.event();
    if (!ev) return;

    const sectionsVal = this.sections();
    for (const s of sectionsVal) {
      if (!s.name || !s.ticketTypeId || !s.rowStart || !s.rowEnd) {
        this.snackBar.open(this.translate.instant('SEAT_MAP.VALIDATION_ERROR'), 'Fechar', { duration: 4000 });
        return;
      }
    }

    this.saving.set(true);
    this.http.post(`/seat-maps/events/${ev.id}`, {
      name: this.mapName,
      sections: sectionsVal.map(s => ({
        name: s.name,
        ticketTypeId: s.ticketTypeId,
        rowStart: s.rowStart.toUpperCase(),
        rowEnd: s.rowEnd.toUpperCase(),
        seatsPerRow: s.seatsPerRow,
        color: s.color
      }))
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.snackBar.open(this.translate.instant('SEAT_MAP.CREATED'), 'OK', { duration: 4000, panelClass: 'success-snackbar' });
        this.router.navigate(['/admin/my-events']);
      },
      error: (err) => {
        this.saving.set(false);
        this.snackBar.open(err.error?.message || this.translate.instant('SEAT_MAP.CREATE_ERROR'), 'Fechar', { duration: 4000 });
      }
    });
  }
}
