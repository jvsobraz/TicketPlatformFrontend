import { Component, OnInit, OnDestroy, inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { OrganizerDashboardResponse } from '../../../core/models';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTableModule, TranslateModule],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <h1 class="section-title">{{ 'ANALYTICS.PAGE_TITLE' | translate }}</h1>
        <a mat-button routerLink="/admin"><mat-icon>arrow_back</mat-icon> {{ 'COMMON.BACK' | translate }}</a>
      </div>

      @if (loading) {
        <div style="text-align:center;padding:64px"><mat-progress-spinner mode="indeterminate" /></div>
      } @else if (dashboard) {

        <!-- KPI Cards -->
        <div class="kpi-grid">
          <mat-card class="kpi-card primary">
            <div class="kpi-icon-wrap primary"><mat-icon>attach_money</mat-icon></div>
            <span class="kpi-label">{{ 'ANALYTICS.TOTAL_REVENUE' | translate }}</span>
            <span class="kpi-value">{{ dashboard.totalRevenue | currency:'BRL' }}</span>
          </mat-card>
          <mat-card class="kpi-card success">
            <div class="kpi-icon-wrap success"><mat-icon>confirmation_number</mat-icon></div>
            <span class="kpi-label">{{ 'ANALYTICS.TICKETS_SOLD' | translate }}</span>
            <span class="kpi-value">{{ dashboard.totalTicketsSold }}</span>
          </mat-card>
          <mat-card class="kpi-card accent">
            <div class="kpi-icon-wrap accent"><mat-icon>receipt_long</mat-icon></div>
            <span class="kpi-label">{{ 'ANALYTICS.AVG_ORDER' | translate }}</span>
            <span class="kpi-value">{{ dashboard.averageOrderValue | currency:'BRL' }}</span>
          </mat-card>
          <mat-card class="kpi-card warn" [class.alert]="dashboard.cartAbandonmentRate > 0.3">
            <div class="kpi-icon-wrap warn"><mat-icon>shopping_cart_checkout</mat-icon></div>
            <span class="kpi-label">{{ 'ANALYTICS.ABANDONMENT_RATE' | translate }}</span>
            <span class="kpi-value">{{ dashboard.cartAbandonmentRate | percent:'1.1-1' }}</span>
            <span class="kpi-sub">{{ dashboard.abandonedCarts }} {{ 'ANALYTICS.CARTS' | translate }}</span>
          </mat-card>
          <mat-card class="kpi-card info">
            <div class="kpi-icon-wrap info"><mat-icon>event</mat-icon></div>
            <span class="kpi-label">{{ 'ANALYTICS.ACTIVE_EVENTS_LABEL' | translate }}</span>
            <span class="kpi-value">{{ dashboard.activeEvents }} / {{ dashboard.totalEvents }}</span>
            <span class="kpi-sub">{{ 'ANALYTICS.ACTIVE_TOTAL' | translate }}</span>
          </mat-card>
          <mat-card class="kpi-card purple">
            <div class="kpi-icon-wrap purple"><mat-icon>paid</mat-icon></div>
            <span class="kpi-label">{{ 'ANALYTICS.PAID_ORDERS' | translate }}</span>
            <span class="kpi-value">{{ dashboard.totalOrders }}</span>
          </mat-card>
        </div>

        <!-- Charts row -->
        <div class="charts-grid">
          <!-- Revenue line chart -->
          <mat-card class="chart-card">
            <mat-card-header><mat-card-title>{{ 'ANALYTICS.REVENUE_30_DAYS' | translate }}</mat-card-title></mat-card-header>
            <mat-card-content>
              <canvas #revenueChart></canvas>
            </mat-card-content>
          </mat-card>

          <!-- Payment method doughnut -->
          <mat-card class="chart-card chart-card-sm">
            <mat-card-header><mat-card-title>{{ 'ANALYTICS.PAYMENT_METHODS' | translate }}</mat-card-title></mat-card-header>
            <mat-card-content class="doughnut-content">
              <canvas #paymentChart></canvas>
              <div class="legend">
                <div class="legend-item"><span class="dot pix"></span>PIX: {{ dashboard.pixRevenue | currency:'BRL' }}</div>
                <div class="legend-item"><span class="dot card"></span>{{ 'ANALYTICS.CARD' | translate }}: {{ dashboard.cardRevenue | currency:'BRL' }}</div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Top Events table -->
        <mat-card>
          <mat-card-header><mat-card-title>{{ 'ANALYTICS.TOP_EVENTS' | translate }}</mat-card-title></mat-card-header>
          <mat-card-content>
            @if (dashboard.topEvents.length === 0) {
              <p class="empty-msg">{{ 'ANALYTICS.NO_EVENTS' | translate }}</p>
            } @else {
              <table mat-table [dataSource]="dashboard.topEvents" class="full-width">
                <ng-container matColumnDef="title">
                  <th mat-header-cell *matHeaderCellDef>{{ 'ANALYTICS.EVENT_COL' | translate }}</th>
                  <td mat-cell *matCellDef="let e"><a [routerLink]="['/events', e.eventId]">{{ e.title }}</a></td>
                </ng-container>
                <ng-container matColumnDef="tickets">
                  <th mat-header-cell *matHeaderCellDef>{{ 'ANALYTICS.TICKETS_COL' | translate }}</th>
                  <td mat-cell *matCellDef="let e">{{ e.ticketsSold }}</td>
                </ng-container>
                <ng-container matColumnDef="revenue">
                  <th mat-header-cell *matHeaderCellDef>{{ 'ANALYTICS.REVENUE_COL' | translate }}</th>
                  <td mat-cell *matCellDef="let e">{{ e.revenue | currency:'BRL' }}</td>
                </ng-container>
                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let e">
                    <a mat-button [routerLink]="['/admin/analytics', e.eventId]">{{ 'ANALYTICS.DETAILS' | translate }}</a>
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
      @media(max-width:768px){grid-template-columns:repeat(2,1fr);}
      @media(max-width:480px){grid-template-columns:1fr;} }
    .kpi-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 24px 16px;
      gap: 4px;
      cursor: default;
    }
    .kpi-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      margin-bottom: 8px;
      mat-icon { font-size: 28px; width: 28px; height: 28px; }
    }
    .kpi-icon-wrap.primary  { background: rgba(98,0,234,0.1);  mat-icon { color:#6200ea; } }
    .kpi-icon-wrap.success  { background: rgba(67,160,71,0.1);  mat-icon { color:#43a047; } }
    .kpi-icon-wrap.accent   { background: rgba(255,109,0,0.1);  mat-icon { color:#ff6d00; } }
    .kpi-icon-wrap.warn     { background: rgba(245,124,0,0.1);  mat-icon { color:#f57c00; } }
    .kpi-icon-wrap.info     { background: rgba(2,136,209,0.1);  mat-icon { color:#0288d1; } }
    .kpi-icon-wrap.purple   { background: rgba(123,31,162,0.1); mat-icon { color:#7b1fa2; } }
    .kpi-card.warn.alert { border-top: 3px solid #e53935;
      .kpi-icon-wrap.warn { background: rgba(229,57,53,0.1); mat-icon { color:#e53935; } }
    }
    .kpi-label { display: block; font-size: 0.78rem; color: var(--text-secondary); letter-spacing: 0.3px; }
    .kpi-value { display: block; font-size: 1.65rem; font-weight: 700; line-height: 1.2; }
    .kpi-sub   { display: block; font-size: 0.72rem; color: var(--text-hint); }
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
    .empty-msg { color:var(--text-secondary); padding:24px; text-align:center; }
    .full-width { width:100%; }
  `]
})
export class AnalyticsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('revenueChart') revenueChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('paymentChart') paymentChartRef!: ElementRef<HTMLCanvasElement>;

  private analyticsService = inject(AnalyticsService);
  dashboard: OrganizerDashboardResponse | null = null;
  loading = true;

  private revenueChartInstance?: Chart;
  private paymentChartInstance?: Chart;

  ngOnInit(): void {
    this.analyticsService.getDashboard().subscribe({
      next: (data) => {
        this.dashboard = data;
        this.loading = false;
        // Charts will be built in ngAfterViewInit via change detection
        setTimeout(() => this.buildCharts(), 0);
      },
      error: () => { this.loading = false; }
    });
  }

  ngAfterViewInit(): void {
    if (this.dashboard) this.buildCharts();
  }

  ngOnDestroy(): void {
    this.revenueChartInstance?.destroy();
    this.paymentChartInstance?.destroy();
  }

  private buildCharts(): void {
    if (!this.dashboard) return;
    this.buildRevenueChart();
    this.buildPaymentChart();
  }

  private buildRevenueChart(): void {
    if (!this.revenueChartRef?.nativeElement || !this.dashboard) return;
    this.revenueChartInstance?.destroy();

    const labels = this.dashboard.salesByDay.map(d =>
      new Date(d.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    );
    const data = this.dashboard.salesByDay.map(d => d.revenue);

    this.revenueChartInstance = new Chart(this.revenueChartRef.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Receita (R$)',
          data,
          borderColor: '#6200ea',
          backgroundColor: 'rgba(98,0,234,0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 3
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
    if (!this.paymentChartRef?.nativeElement || !this.dashboard) return;
    this.paymentChartInstance?.destroy();

    const pix = Number(this.dashboard.pixRevenue) || 0;
    const card = Number(this.dashboard.cardRevenue) || 0;

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
