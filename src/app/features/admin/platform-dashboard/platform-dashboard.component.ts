import { Component, OnInit, OnDestroy, inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { PlatformDashboardResponse } from '../../../core/models';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-platform-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTableModule],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <div>
          <h1 class="section-title">Platform Dashboard</h1>
          <p class="subtitle">Visão geral de toda a plataforma — restrito a Super Admins</p>
        </div>
        <a mat-button routerLink="/admin"><mat-icon>arrow_back</mat-icon> Painel</a>
      </div>

      @if (loading) {
        <div style="text-align:center;padding:64px"><mat-progress-spinner mode="indeterminate" /></div>
      } @else if (data) {

        <!-- GMV / Revenue KPIs -->
        <h2 class="section-label">Receita</h2>
        <div class="kpi-grid">
          <mat-card class="kpi-card primary">
            <div class="kpi-icon-wrap primary"><mat-icon>show_chart</mat-icon></div>
            <span class="kpi-label">GMV Total</span>
            <span class="kpi-value">{{ data.totalGmv | currency:'BRL' }}</span>
          </mat-card>
          <mat-card class="kpi-card success">
            <div class="kpi-icon-wrap success"><mat-icon>percent</mat-icon></div>
            <span class="kpi-label">Fees da Plataforma ({{ data.platformFeeRate | percent }})</span>
            <span class="kpi-value">{{ data.platformFeesEarned | currency:'BRL' }}</span>
          </mat-card>
          <mat-card class="kpi-card accent">
            <div class="kpi-icon-wrap accent"><mat-icon>receipt_long</mat-icon></div>
            <span class="kpi-label">Ticket Médio</span>
            <span class="kpi-value">{{ data.averageOrderValue | currency:'BRL' }}</span>
          </mat-card>
          <mat-card class="kpi-card info">
            <div class="kpi-icon-wrap info"><mat-icon>confirmation_number</mat-icon></div>
            <span class="kpi-label">Ingressos Vendidos</span>
            <span class="kpi-value">{{ data.totalTicketsSold }}</span>
          </mat-card>
          <mat-card class="kpi-card purple">
            <div class="kpi-icon-wrap purple"><mat-icon>paid</mat-icon></div>
            <span class="kpi-label">Pedidos Pagos</span>
            <span class="kpi-value">{{ data.totalOrders }}</span>
          </mat-card>
          <mat-card class="kpi-card teal">
            <div class="kpi-icon-wrap teal"><mat-icon>event</mat-icon></div>
            <span class="kpi-label">Eventos</span>
            <span class="kpi-value">{{ data.activeEvents }} / {{ data.totalEvents }}</span>
            <span class="kpi-sub">ativos / total</span>
          </mat-card>
        </div>

        <!-- Users KPIs -->
        <h2 class="section-label">Usuários</h2>
        <div class="kpi-grid kpi-grid-3">
          <mat-card class="kpi-card primary">
            <div class="kpi-icon-wrap primary"><mat-icon>people</mat-icon></div>
            <span class="kpi-label">Total de Usuários</span>
            <span class="kpi-value">{{ data.totalUsers }}</span>
          </mat-card>
          <mat-card class="kpi-card success">
            <div class="kpi-icon-wrap success"><mat-icon>business</mat-icon></div>
            <span class="kpi-label">Organizadores</span>
            <span class="kpi-value">{{ data.totalOrganizers }}</span>
          </mat-card>
          <mat-card class="kpi-card accent">
            <div class="kpi-icon-wrap accent"><mat-icon>person</mat-icon></div>
            <span class="kpi-label">Compradores</span>
            <span class="kpi-value">{{ data.totalBuyers }}</span>
          </mat-card>
        </div>

        <!-- Charts -->
        <div class="charts-grid">
          <mat-card class="chart-card">
            <mat-card-header><mat-card-title>GMV (últimos 30 dias)</mat-card-title></mat-card-header>
            <mat-card-content>
              <canvas #revenueChart></canvas>
            </mat-card-content>
          </mat-card>

          <mat-card class="chart-card chart-card-sm">
            <mat-card-header><mat-card-title>Método de Pagamento</mat-card-title></mat-card-header>
            <mat-card-content class="doughnut-content">
              <canvas #paymentChart></canvas>
              <div class="legend">
                <div class="legend-item"><span class="dot pix"></span>PIX: {{ data.pixRevenue | currency:'BRL' }}</div>
                <div class="legend-item"><span class="dot card"></span>Cartão: {{ data.cardRevenue | currency:'BRL' }}</div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Top Organizers -->
        <mat-card>
          <mat-card-header><mat-card-title>Top 10 Organizadores por GMV</mat-card-title></mat-card-header>
          <mat-card-content>
            @if (data.topOrganizers.length === 0) {
              <p class="empty-msg">Nenhum organizador com vendas ainda.</p>
            } @else {
              <table mat-table [dataSource]="data.topOrganizers" class="full-width">
                <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef>Organizador</th>
                  <td mat-cell *matCellDef="let o">
                    <strong>{{ o.name }}</strong><br>
                    <small class="email-cell">{{ o.email }}</small>
                  </td>
                </ng-container>
                <ng-container matColumnDef="events">
                  <th mat-header-cell *matHeaderCellDef>Eventos</th>
                  <td mat-cell *matCellDef="let o">{{ o.totalEvents }}</td>
                </ng-container>
                <ng-container matColumnDef="tickets">
                  <th mat-header-cell *matHeaderCellDef>Ingressos</th>
                  <td mat-cell *matCellDef="let o">{{ o.ticketsSold }}</td>
                </ng-container>
                <ng-container matColumnDef="revenue">
                  <th mat-header-cell *matHeaderCellDef>GMV</th>
                  <td mat-cell *matCellDef="let o"><strong>{{ o.revenue | currency:'BRL' }}</strong></td>
                </ng-container>
                <ng-container matColumnDef="fee">
                  <th mat-header-cell *matHeaderCellDef>Fee (5%)</th>
                  <td mat-cell *matCellDef="let o">{{ o.revenue * 0.05 | currency:'BRL' }}</td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="orgColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: orgColumns;"></tr>
              </table>
            }
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .page-container { padding: 32px 16px; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
    .subtitle { color: #757575; font-size: 0.85rem; margin: 4px 0 0; }
    .section-label { font-size: 1rem; font-weight: 600; color: #424242; margin: 24px 0 12px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 8px;
      @media(max-width:768px){grid-template-columns:repeat(2,1fr);}
      @media(max-width:480px){grid-template-columns:1fr;} }
    .kpi-grid-3 { grid-template-columns: repeat(3,1fr); margin-bottom: 24px; }
    .kpi-card {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; padding: 24px 16px; gap: 4px; cursor: default;
    }
    .kpi-icon-wrap {
      display: flex; align-items: center; justify-content: center;
      width: 52px; height: 52px; border-radius: 50%; margin-bottom: 8px;
      mat-icon { font-size: 28px; width: 28px; height: 28px; }
    }
    .kpi-icon-wrap.primary  { background: rgba(98,0,234,0.1);   mat-icon { color:#6200ea; } }
    .kpi-icon-wrap.success  { background: rgba(67,160,71,0.1);   mat-icon { color:#43a047; } }
    .kpi-icon-wrap.accent   { background: rgba(255,109,0,0.1);   mat-icon { color:#ff6d00; } }
    .kpi-icon-wrap.info     { background: rgba(2,136,209,0.1);   mat-icon { color:#0288d1; } }
    .kpi-icon-wrap.purple   { background: rgba(123,31,162,0.1);  mat-icon { color:#7b1fa2; } }
    .kpi-icon-wrap.teal     { background: rgba(0,137,123,0.1);   mat-icon { color:#00897b; } }
    .kpi-label { display: block; font-size: 0.78rem; color: #757575; letter-spacing: 0.3px; }
    .kpi-value { display: block; font-size: 1.65rem; font-weight: 700; line-height: 1.2; }
    .kpi-sub   { display: block; font-size: 0.72rem; color: #9e9e9e; }
    .charts-grid { display:grid; grid-template-columns:2fr 1fr; gap:16px; margin-bottom:24px;
      @media(max-width:768px){grid-template-columns:1fr;} }
    .chart-card { margin-bottom:0; }
    .chart-card canvas { max-height:260px; }
    .chart-card-sm canvas { max-height:180px; }
    .doughnut-content { display:flex; flex-direction:column; align-items:center; gap:12px; }
    .legend { width:100%; }
    .legend-item { display:flex; align-items:center; gap:8px; font-size:0.85rem; margin-bottom:4px; }
    .dot { width:12px; height:12px; border-radius:50%; flex-shrink:0; }
    .dot.pix { background:#00bcd4; }
    .dot.card { background:#6200ea; }
    .email-cell { color:#9e9e9e; font-size:0.75rem; }
    .empty-msg { color:#757575; padding:24px; text-align:center; }
    .full-width { width:100%; }
  `]
})
export class PlatformDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('revenueChart') revenueChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('paymentChart') paymentChartRef!: ElementRef<HTMLCanvasElement>;

  private analyticsService = inject(AnalyticsService);
  data: PlatformDashboardResponse | null = null;
  loading = true;
  orgColumns = ['name', 'events', 'tickets', 'revenue', 'fee'];

  private revenueChartInstance?: Chart;
  private paymentChartInstance?: Chart;

  ngOnInit(): void {
    this.analyticsService.getPlatformDashboard().subscribe({
      next: (d) => {
        this.data = d;
        this.loading = false;
        setTimeout(() => this.buildCharts(), 0);
      },
      error: () => { this.loading = false; }
    });
  }

  ngAfterViewInit(): void {
    if (this.data) this.buildCharts();
  }

  ngOnDestroy(): void {
    this.revenueChartInstance?.destroy();
    this.paymentChartInstance?.destroy();
  }

  private buildCharts(): void {
    if (!this.data) return;
    this.buildRevenueChart();
    this.buildPaymentChart();
  }

  private buildRevenueChart(): void {
    if (!this.revenueChartRef?.nativeElement || !this.data) return;
    this.revenueChartInstance?.destroy();

    const labels = this.data.revenueByDay.map(d =>
      new Date(d.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    );
    const values = this.data.revenueByDay.map(d => d.revenue);

    this.revenueChartInstance = new Chart(this.revenueChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'GMV (R$)',
          data: values,
          backgroundColor: 'rgba(98,0,234,0.7)',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v) => `R$ ${Number(v).toLocaleString('pt-BR')}` } }
        }
      }
    });
  }

  private buildPaymentChart(): void {
    if (!this.paymentChartRef?.nativeElement || !this.data) return;
    this.paymentChartInstance?.destroy();

    const pix = Number(this.data.pixRevenue) || 0;
    const card = Number(this.data.cardRevenue) || 0;

    this.paymentChartInstance = new Chart(this.paymentChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['PIX', 'Cartão'],
        datasets: [{
          data: [pix, card],
          backgroundColor: ['#00bcd4', '#6200ea'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => ` R$ ${Number(ctx.raw).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` } }
        }
      }
    });
  }
}
