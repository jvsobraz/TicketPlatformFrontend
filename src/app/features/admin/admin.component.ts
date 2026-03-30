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
import { EventService } from '../../core/services/event.service';
import { EventListResponse, EventStatus } from '../../core/models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatButtonModule, MatCardModule, MatIconModule,
    MatProgressSpinnerModule, MatTableModule, MatChipsModule, MatSnackBarModule
  ],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <h1 class="section-title">Painel do Organizador</h1>
        <a mat-raised-button color="primary" routerLink="/admin/create-event">
          <mat-icon>add</mat-icon> Novo Evento
        </a>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-icon>event</mat-icon>
          <div>
            <h3>{{ events.length }}</h3>
            <p>Total de Eventos</p>
          </div>
        </mat-card>
        <mat-card class="stat-card">
          <mat-icon color="primary">check_circle</mat-icon>
          <div>
            <h3>{{ activeEvents }}</h3>
            <p>Eventos Ativos</p>
          </div>
        </mat-card>
        <mat-card class="stat-card">
          <mat-icon style="color:#ff6d00">confirmation_number</mat-icon>
          <div>
            <h3>{{ totalSold }}</h3>
            <p>Ingressos Vendidos</p>
          </div>
        </mat-card>
      </div>

      <!-- Ferramentas -->
      <div class="tools-section">
        <h2 class="tools-title">Ferramentas</h2>
        <div class="tools-grid">
          <a mat-raised-button routerLink="/admin/analytics" class="tool-btn">
            <mat-icon>bar_chart</mat-icon>
            <span>Analytics</span>
          </a>
          <a mat-raised-button routerLink="/admin/affiliates" class="tool-btn">
            <mat-icon>share</mat-icon>
            <span>Afiliados</span>
          </a>
          <a mat-raised-button routerLink="/admin/coupons" class="tool-btn">
            <mat-icon>discount</mat-icon>
            <span>Cupons</span>
          </a>
        </div>
      </div>

      <!-- Events Table -->
      <mat-card class="table-card">
        <mat-card-header>
          <mat-card-title>Meus Eventos</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          @if (loading) {
            <div class="loading-overlay"><mat-progress-spinner mode="indeterminate" /></div>
          } @else if (events.length === 0) {
            <div class="empty-state">
              <mat-icon>event_note</mat-icon>
              <p>Nenhum evento criado. <a routerLink="/admin/create-event">Criar primeiro evento</a></p>
            </div>
          } @else {
            <table mat-table [dataSource]="events" class="full-width">
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef>Evento</th>
                <td mat-cell *matCellDef="let e">
                  <strong>{{ e.title }}</strong>
                  <br><small>{{ e.city }}/{{ e.state }}</small>
                </td>
              </ng-container>

              <ng-container matColumnDef="dateTime">
                <th mat-header-cell *matHeaderCellDef>Data</th>
                <td mat-cell *matCellDef="let e">{{ e.dateTime | date:'dd/MM/yyyy' }}</td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let e">
                  <mat-chip [class]="getStatusClass(e.status)">{{ getStatusLabel(e.status) }}</mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="tickets">
                <th mat-header-cell *matHeaderCellDef>Vendidos</th>
                <td mat-cell *matCellDef="let e">{{ e.totalTicketsAvailable }} disponíveis</td>
              </ng-container>

              <ng-container matColumnDef="minPrice">
                <th mat-header-cell *matHeaderCellDef>Preço Mín.</th>
                <td mat-cell *matCellDef="let e">
                  @if (e.minPrice === 0) { Grátis } @else { {{ e.minPrice | currency:'BRL' }} }
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Ações</th>
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
      p { margin: 4px 0 0; color: #757575; } }
    .tools-section { margin-bottom: 32px; }
    .tools-title { font-size: 1.1rem; font-weight: 600; margin: 0 0 16px; color: #424242; }
    .tools-grid { display: flex; gap: 12px; flex-wrap: wrap; }
    .tool-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 20px 32px;
      mat-icon { font-size: 28px; width: 28px; height: 28px; }
      span { font-size: 0.9rem; }
    }
    .table-card mat-card-content { overflow-x: auto; }
    .empty-state { text-align: center; padding: 32px; color: #757575;
      mat-icon { font-size: 48px; width: 48px; height: 48px; display: block; margin: 0 auto 8px; }
      a { color: #6200ea; } }
  `]
})
export class AdminComponent implements OnInit {
  private eventService = inject(EventService);
  private snackBar = inject(MatSnackBar);

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
    if (!confirm(`Cancelar o evento "${event.title}"?`)) return;
    this.eventService.updateEvent(event.id, { status: EventStatus.Cancelled } as any).subscribe({
      next: () => {
        event.status = EventStatus.Cancelled;
        this.snackBar.open('Evento cancelado.', 'OK', { duration: 3000 });
      },
      error: (err) => this.snackBar.open(err.error?.error || 'Erro ao cancelar', 'Fechar', { duration: 3000 })
    });
  }

  getStatusLabel(status: EventStatus): string {
    const labels: Record<number, string> = { 0: 'Rascunho', 1: 'Ativo', 2: 'Cancelado', 3: 'Encerrado' };
    return labels[status] || 'Desconhecido';
  }

  getStatusClass(status: EventStatus): string {
    const classes: Record<number, string> = { 1: 'status-active', 2: 'status-cancelled', 0: 'status-pending', 3: 'status-pending' };
    return classes[status] || '';
  }
}
