import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { OrganizerDashboardResponse } from '../../../core/models';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTableModule, MatDividerModule],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <h1 class="section-title">Analytics</h1>
        <a mat-button routerLink="/admin"><mat-icon>arrow_back</mat-icon> Voltar</a>
      </div>

      @if (loading) {
        <div style="text-align:center;padding:64px"><mat-progress-spinner mode="indeterminate" /></div>
      } @else if (dashboard) {
        <!-- KPI Cards -->
        <div class="kpi-grid">
          <mat-card class="kpi-card primary">
            <mat-icon>attach_money</mat-icon>
            <div>
              <span class="kpi-label">Receita Total</span>
              <span class="kpi-value">{{ dashboard.totalRevenue | currency:'BRL' }}</span>
            </div>
          </mat-card>
          <mat-card class="kpi-card success">
            <mat-icon>confirmation_number</mat-icon>
            <div>
              <span class="kpi-label">Ingressos Vendidos</span>
              <span class="kpi-value">{{ dashboard.totalTicketsSold }}</span>
            </div>
          </mat-card>
          <mat-card class="kpi-card accent">
            <mat-icon>event</mat-icon>
            <div>
              <span class="kpi-label">Eventos Ativos</span>
              <span class="kpi-value">{{ dashboard.activeEvents }} / {{ dashboard.totalEvents }}</span>
            </div>
          </mat-card>
        </div>

        <!-- Sales by Day -->
        <mat-card class="chart-card">
          <mat-card-header><mat-card-title>Vendas por Dia (últimos 30 dias)</mat-card-title></mat-card-header>
          <mat-card-content>
            @if (dashboard.salesByDay.length === 0) {
              <p class="empty-msg">Sem dados de vendas ainda.</p>
            } @else {
              <div class="bar-chart">
                @for (day of dashboard.salesByDay; track day.date) {
                  <div class="bar-col">
                    <div class="bar-wrap" [title]="day.date + ': ' + (day.revenue | currency:'BRL')">
                      <div class="bar" [style.height.%]="getBarHeight(day.revenue)"></div>
                    </div>
                    <span class="bar-label">{{ day.date | date:'dd/MM' }}</span>
                  </div>
                }
              </div>
            }
          </mat-card-content>
        </mat-card>

        <!-- Top Events -->
        <mat-card>
          <mat-card-header><mat-card-title>Top Eventos por Receita</mat-card-title></mat-card-header>
          <mat-card-content>
            @if (dashboard.topEvents.length === 0) {
              <p class="empty-msg">Nenhum evento com vendas ainda.</p>
            } @else {
              <table mat-table [dataSource]="dashboard.topEvents" class="full-width">
                <ng-container matColumnDef="title">
                  <th mat-header-cell *matHeaderCellDef>Evento</th>
                  <td mat-cell *matCellDef="let e">
                    <a [routerLink]="['/events', e.eventId]">{{ e.title }}</a>
                  </td>
                </ng-container>
                <ng-container matColumnDef="tickets">
                  <th mat-header-cell *matHeaderCellDef>Ingressos</th>
                  <td mat-cell *matCellDef="let e">{{ e.ticketsSold }}</td>
                </ng-container>
                <ng-container matColumnDef="revenue">
                  <th mat-header-cell *matHeaderCellDef>Receita</th>
                  <td mat-cell *matCellDef="let e">{{ e.revenue | currency:'BRL' }}</td>
                </ng-container>
                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let e">
                    <a mat-button [routerLink]="['/admin/analytics', e.eventId]">Detalhes</a>
                  </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="['title','tickets','revenue','actions']"></tr>
                <tr mat-row *matRowDef="let row; columns: ['title','tickets','revenue','actions'];"></tr>
              </table>
            }
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .page-container { padding: 32px 16px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 24px;
      @media(max-width:600px){grid-template-columns:1fr;} }
    .kpi-card { display: flex; align-items: center; gap: 16px; padding: 24px;
      mat-icon { font-size: 40px; width:40px; height:40px; }
      .kpi-label { display:block; font-size:0.85rem; color:#757575; }
      .kpi-value { display:block; font-size:1.8rem; font-weight:700; }
    }
    .kpi-card.primary mat-icon { color:#6200ea; }
    .kpi-card.success mat-icon { color:#43a047; }
    .kpi-card.accent mat-icon { color:#ff6d00; }
    .chart-card { margin-bottom: 24px; }
    .bar-chart { display:flex; align-items:flex-end; gap:4px; height:180px; overflow-x:auto; padding:8px 0; }
    .bar-col { display:flex; flex-direction:column; align-items:center; min-width:28px; }
    .bar-wrap { height:160px; display:flex; align-items:flex-end; }
    .bar { width:20px; background:#6200ea; border-radius:4px 4px 0 0; min-height:4px; transition:height 0.3s; }
    .bar-label { font-size:0.65rem; color:#757575; margin-top:4px; white-space:nowrap; }
    .empty-msg { color:#757575; padding:24px; text-align:center; }
  `]
})
export class AnalyticsComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);
  dashboard: OrganizerDashboardResponse | null = null;
  loading = true;
  maxRevenue = 1;

  ngOnInit(): void {
    this.analyticsService.getDashboard().subscribe({
      next: (data) => {
        this.dashboard = data;
        this.maxRevenue = Math.max(...data.salesByDay.map(d => d.revenue), 1);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  getBarHeight(revenue: number): number {
    return Math.max((revenue / this.maxRevenue) * 100, 2);
  }
}
