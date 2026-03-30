import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { AffiliateService } from '../../../core/services/affiliate.service';
import { AffiliateLinkResponse, AffiliateEarningsResponse } from '../../../core/models';

@Component({
  selector: 'app-affiliates',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule, MatTableModule, MatChipsModule, MatDialogModule],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <h1 class="section-title">Sistema de Afiliados</h1>
        <a mat-button routerLink="/admin"><mat-icon>arrow_back</mat-icon> Voltar</a>
      </div>

      <!-- Earnings Summary -->
      @if (earnings) {
        <div class="earnings-grid">
          <mat-card class="earning-card">
            <mat-icon style="color:#43a047">payments</mat-icon>
            <div>
              <span class="earning-label">Total Ganho</span>
              <span class="earning-value">{{ earnings.totalEarned | currency:'BRL' }}</span>
            </div>
          </mat-card>
          <mat-card class="earning-card">
            <mat-icon style="color:#ff6d00">pending</mat-icon>
            <div>
              <span class="earning-label">Conversões</span>
              <span class="earning-value">{{ earnings.conversions.length }}</span>
            </div>
          </mat-card>
        </div>
      }

      <!-- Create Link -->
      <mat-card class="create-card">
        <mat-card-header><mat-card-title>Criar Link de Afiliado</mat-card-title></mat-card-header>
        <mat-card-content>
          <p>Gere links únicos para promover eventos e ganhe comissão por cada venda realizada.</p>
          <p><strong>Comissão padrão: 5%</strong> sobre cada venda gerada pelo seu link.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="createLink()" [disabled]="creating">
            @if (creating) { <mat-progress-spinner diameter="18" mode="indeterminate" /> }
            @else { <mat-icon>add_link</mat-icon> Criar Link Geral }
          </button>
        </mat-card-actions>
      </mat-card>

      <!-- My Links -->
      <mat-card>
        <mat-card-header><mat-card-title>Meus Links</mat-card-title></mat-card-header>
        <mat-card-content>
          @if (loading) {
            <div style="text-align:center;padding:32px"><mat-progress-spinner mode="indeterminate" /></div>
          } @else if (links.length === 0) {
            <p style="color:#757575;padding:24px;text-align:center">Nenhum link criado ainda.</p>
          } @else {
            <div class="links-list">
              @for (link of links; track link.id) {
                <div class="link-item">
                  <div class="link-info">
                    <strong>{{ link.eventTitle || 'Link Geral' }}</strong>
                    <div class="link-url">{{ link.shareUrl }}</div>
                    <div class="link-stats">
                      <span><mat-icon>people</mat-icon> {{ link.conversionsCount }} conversões</span>
                      <span><mat-icon>attach_money</mat-icon> {{ link.totalEarned | currency:'BRL' }} ganhos</span>
                      <span><mat-icon>percent</mat-icon> {{ (link.commissionRate * 100).toFixed(0) }}% comissão</span>
                    </div>
                  </div>
                  <button mat-icon-button (click)="copyLink(link.shareUrl)" title="Copiar link">
                    <mat-icon>content_copy</mat-icon>
                  </button>
                </div>
              }
            </div>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container { padding: 32px 16px; }
    .page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:32px; }
    .earnings-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; margin-bottom:24px; }
    .earning-card { display:flex; align-items:center; gap:16px; padding:20px;
      mat-icon { font-size:36px; width:36px; height:36px; }
      .earning-label { display:block; font-size:0.85rem; color:#757575; }
      .earning-value { display:block; font-size:1.6rem; font-weight:700; }
    }
    .create-card { margin-bottom:24px; }
    .links-list { display:flex; flex-direction:column; gap:12px; }
    .link-item { display:flex; justify-content:space-between; align-items:center; padding:16px; background:#f5f5f5; border-radius:8px; }
    .link-url { font-size:0.8rem; color:#6200ea; word-break:break-all; margin:4px 0; font-family:monospace; }
    .link-stats { display:flex; gap:16px; flex-wrap:wrap; margin-top:8px; font-size:0.85rem; color:#757575;
      span { display:flex; align-items:center; gap:4px; mat-icon { font-size:16px; width:16px; height:16px; } }
    }
  `]
})
export class AffiliatesComponent implements OnInit {
  private affiliateService = inject(AffiliateService);
  private snackBar = inject(MatSnackBar);

  links: AffiliateLinkResponse[] = [];
  earnings: AffiliateEarningsResponse | null = null;
  loading = true;
  creating = false;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.affiliateService.getMyLinks().subscribe({
      next: (links) => { this.links = links; this.loading = false; },
      error: () => { this.loading = false; }
    });
    this.affiliateService.getMyEarnings().subscribe({
      next: (e) => { this.earnings = e; }
    });
  }

  createLink(): void {
    this.creating = true;
    this.affiliateService.createLink({}).subscribe({
      next: (link) => {
        this.links.unshift(link);
        this.creating = false;
        this.snackBar.open('Link criado com sucesso!', 'OK', { duration: 3000 });
      },
      error: (err) => {
        this.creating = false;
        this.snackBar.open(err.error?.error || 'Erro ao criar link', 'Fechar', { duration: 3000 });
      }
    });
  }

  copyLink(url: string): void {
    navigator.clipboard.writeText(url).then(() => {
      this.snackBar.open('Link copiado!', 'OK', { duration: 2000 });
    });
  }
}
