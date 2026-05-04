import { Component, OnInit, OnDestroy, inject, signal, output, input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { SeatMapService, SeatMap, SeatDto, SeatSection } from '../../core/services/seat-map.service';

@Component({
  selector: 'app-seat-map',
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    MatChipsModule, MatSnackBarModule
  ],
  template: `
    @if (loading()) {
      <div class="seat-map-loading">
        <mat-progress-spinner mode="indeterminate" diameter="48" />
        <p>Carregando mapa de assentos...</p>
      </div>
    } @else if (seatMap()) {
      <div class="seat-map-wrapper">
        <h2 class="seat-map-title">
          <mat-icon>event_seat</mat-icon> {{ seatMap()!.name }}
        </h2>

        <!-- Legend -->
        <div class="legend">
          @for (section of seatMap()!.sections; track section.id) {
            <div class="legend-item">
              <span class="legend-dot" [style.background]="section.color"></span>
              <span>{{ section.name }} — {{ section.price | currency:'BRL' }} ({{ section.availableCount }} disp.)</span>
            </div>
          }
          <div class="legend-item">
            <span class="legend-dot reserved"></span>
            <span>Reservado</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot sold"></span>
            <span>Vendido</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot selected"></span>
            <span>Selecionado</span>
          </div>
        </div>

        <!-- Stage indicator -->
        <div class="stage">PALCO / PALCO</div>

        <!-- Seat grid -->
        <div class="seat-grid-container">
          @for (rowData of seatMap()!.rows; track rowData.row) {
            <div class="seat-row">
              <span class="row-label">{{ rowData.row }}</span>
              <div class="seats">
                @for (seat of rowData.seats; track seat.id) {
                  <button
                    class="seat"
                    [class.available]="seat.isAvailable && !isSelected(seat.id)"
                    [class.selected]="isSelected(seat.id)"
                    [class.reserved]="seat.status === 1 && !seat.isAvailable"
                    [class.sold]="seat.status === 2"
                    [class.unavailable]="seat.status === 3"
                    [style.background]="seat.isAvailable && !isSelected(seat.id) ? seat.sectionColor + '99' : ''"
                    [style.border-color]="seat.isAvailable ? seat.sectionColor : ''"
                    [disabled]="!seat.isAvailable"
                    [title]="seat.seatCode + ' — ' + seat.sectionName + ' — ' + (seat.price | currency:'BRL')"
                    (click)="toggleSeat(seat)">
                    {{ seat.number }}
                  </button>
                }
              </div>
              <span class="row-label">{{ rowData.row }}</span>
            </div>
          }
        </div>

        <!-- Selection summary -->
        @if (selectedSeats().length > 0) {
          <div class="selection-summary">
            <div class="summary-header">
              <h3>Assentos Selecionados ({{ selectedSeats().length }})</h3>
              <button mat-button color="warn" (click)="clearSelection()">
                <mat-icon>clear</mat-icon> Limpar
              </button>
            </div>
            <div class="selected-list">
              @for (seat of selectedSeats(); track seat.id) {
                <mat-chip (removed)="toggleSeat(seat)">
                  {{ seat.seatCode }} — {{ seat.price | currency:'BRL' }}
                  <button matChipRemove><mat-icon>cancel</mat-icon></button>
                </mat-chip>
              }
            </div>
            <div class="summary-total">
              <span>Total:</span>
              <strong>{{ totalPrice() | currency:'BRL' }}</strong>
            </div>
            <button mat-raised-button color="primary" class="reserve-btn"
                    [disabled]="reserving()"
                    (click)="reserveSeats()">
              @if (reserving()) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
              @else { <mat-icon>event_seat</mat-icon> Reservar e Continuar }
            </button>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    .seat-map-loading { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 48px; color: var(--text-hint); }
    .seat-map-wrapper { padding: 16px 0; }
    .seat-map-title { display: flex; align-items: center; gap: 8px; font-size: 1.1rem; font-weight: 700; margin: 0 0 16px; }

    .legend { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; font-size: 0.82rem; }
    .legend-item { display: flex; align-items: center; gap: 6px; }
    .legend-dot {
      width: 14px; height: 14px; border-radius: 3px; border: 1px solid rgba(0,0,0,0.15);
      &.reserved { background: #bdbdbd; }
      &.sold { background: #424242; }
      &.selected { background: #1976d2; border-color: #0d47a1; }
    }

    .stage {
      background: linear-gradient(to bottom, #37474f, #263238); color: white;
      text-align: center; padding: 8px 24px; border-radius: 4px;
      font-size: 0.78rem; letter-spacing: 4px; font-weight: 700;
      margin: 0 auto 24px; max-width: 300px;
    }

    .seat-grid-container { overflow-x: auto; padding-bottom: 8px; }
    .seat-row { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; min-width: max-content; }
    .row-label { width: 22px; text-align: center; font-size: 0.75rem; font-weight: 700; color: var(--text-hint); flex-shrink: 0; }

    .seats { display: flex; gap: 4px; }

    .seat {
      width: 28px; height: 28px; border-radius: 4px 4px 0 0;
      border: 1.5px solid #ccc; background: #e0e0e0;
      font-size: 0.62rem; font-weight: 600; cursor: not-allowed;
      display: flex; align-items: center; justify-content: center;
      padding: 0; line-height: 1; transition: transform 0.1s, box-shadow 0.1s;

      &.available { cursor: pointer; opacity: 0.95;
        &:hover { transform: scale(1.15); box-shadow: 0 2px 6px rgba(0,0,0,0.2); opacity: 1; z-index: 1; position: relative; }
      }
      &.selected { background: #1976d2 !important; border-color: #0d47a1 !important; color: white; cursor: pointer; }
      &.reserved { background: #bdbdbd; border-color: #9e9e9e; color: #616161; }
      &.sold { background: #424242; border-color: #212121; color: #757575; }
      &.unavailable { background: #f5f5f5; border-color: #e0e0e0; color: #bdbdbd; }
    }

    .selection-summary {
      margin-top: 24px; background: var(--surface-2); border-radius: var(--radius-md);
      padding: 16px; border: 1px solid var(--border);
    }
    .summary-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;
      h3 { font-size: 0.95rem; font-weight: 700; margin: 0; }
    }
    .selected-list { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
    .summary-total { display: flex; justify-content: space-between; font-size: 1rem; padding: 8px 0 16px;
      strong { font-size: 1.1rem; color: var(--primary); }
    }
    .reserve-btn { width: 100%; height: 44px; }
  `]
})
export class SeatMapComponent implements OnInit, OnDestroy {
  eventId = input.required<number>();
  reserved = output<{ seatIds: number[]; totalPrice: number }>();

  private seatMapService = inject(SeatMapService);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  seatMap = signal<SeatMap | null>(null);
  loading = signal(true);
  selectedSeats = signal<SeatDto[]>([]);
  reserving = signal(false);

  ngOnInit(): void {
    this.seatMapService.getByEvent(this.eventId()).subscribe({
      next: (sm) => { this.seatMap.set(sm); this.loading.set(false); },
      error: () => { this.loading.set(false); }
    });
  }

  ngOnDestroy(): void {}

  isSelected(seatId: number): boolean {
    return this.selectedSeats().some(s => s.id === seatId);
  }

  toggleSeat(seat: SeatDto): void {
    if (!seat.isAvailable) return;
    const current = this.selectedSeats();
    if (this.isSelected(seat.id)) {
      this.selectedSeats.set(current.filter(s => s.id !== seat.id));
    } else {
      if (current.length >= 10) {
        this.snackBar.open(this.translate.instant('SEAT_MAP.MAX_SEATS'), 'OK', { duration: 3000 });
        return;
      }
      this.selectedSeats.set([...current, seat]);
    }
  }

  clearSelection(): void {
    this.selectedSeats.set([]);
  }

  totalPrice(): number {
    return this.selectedSeats().reduce((sum, s) => sum + s.price, 0);
  }

  reserveSeats(): void {
    const seats = this.selectedSeats();
    if (seats.length === 0) return;
    this.reserving.set(true);
    this.seatMapService.reserve(this.eventId(), seats.map(s => s.id)).subscribe({
      next: () => {
        this.reserving.set(false);
        this.reserved.emit({ seatIds: seats.map(s => s.id), totalPrice: this.totalPrice() });
        this.snackBar.open(`${seats.length} ${this.translate.instant('SEAT_MAP.SEATS_RESERVED')}`, 'OK',
          { duration: 4000, panelClass: 'success-snackbar' });
      },
      error: (err) => {
        this.reserving.set(false);
        this.snackBar.open(err.error?.message || this.translate.instant('SEAT_MAP.RESERVE_ERROR'), 'Fechar', { duration: 4000 });
      }
    });
  }
}
