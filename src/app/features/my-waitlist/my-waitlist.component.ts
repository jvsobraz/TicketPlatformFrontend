import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { WaitlistService } from '../../core/services/waitlist.service';
import { WaitlistEntryResponse, WaitlistStatus } from '../../core/models';

@Component({
  selector: 'app-my-waitlist',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatChipsModule, MatSnackBarModule],
  template: `
    <div class="container page-container">
      <h1 class="section-title">Lista de Espera</h1>

      @if (loading) {
        <div style="text-align:center;padding:64px"><mat-progress-spinner mode="indeterminate" /></div>
      } @else if (entries.length === 0) {
        <div class="empty-state">
          <mat-icon>hourglass_empty</mat-icon>
          <h3>Nenhuma lista de espera</h3>
          <p>Quando um ingresso esgotado tiver vaga, você pode entrar na lista de espera.</p>
          <a mat-raised-button color="primary" routerLink="/events">Ver Eventos</a>
        </div>
      } @else {
        <div class="entries-grid">
          @for (entry of entries; track entry.id) {
            <mat-card class="entry-card">
              <mat-card-header>
                <mat-card-title>{{ entry.eventTitle }}</mat-card-title>
                <mat-card-subtitle>{{ entry.ticketTypeName }} — {{ entry.requestedQuantity }} ingresso(s)</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="entry-status">
                  <mat-chip [class]="getStatusClass(entry.status)">{{ getStatusLabel(entry.status) }}</mat-chip>
                  <span class="entry-date">Na fila desde {{ entry.createdAt | date:'dd/MM/yyyy' }}</span>
                </div>
                @if (entry.status === WaitlistStatus.Notified && entry.buyUrl) {
                  <div class="notified-banner">
                    <mat-icon>notifications_active</mat-icon>
                    <div>
                      <strong>Sua vaga está disponível!</strong>
                      @if (entry.expiresAt) {
                        <p>Expira em: {{ entry.expiresAt | date:'dd/MM HH:mm' }}</p>
                      }
                    </div>
                    <a mat-raised-button color="accent" [href]="entry.buyUrl">Comprar Agora</a>
                  </div>
                }
              </mat-card-content>
              <mat-card-actions>
                @if (entry.status === WaitlistStatus.Waiting) {
                  <button mat-button color="warn" (click)="leave(entry)">
                    <mat-icon>exit_to_app</mat-icon> Sair da Fila
                  </button>
                }
                <a mat-button [routerLink]="['/events', entry.eventId]">Ver Evento</a>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .page-container { padding:32px 16px; }
    .entries-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:24px; }
    .entry-status { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
    .entry-date { font-size:0.85rem; color:#757575; }
    .notified-banner { display:flex; align-items:center; gap:12px; background:#fff3e0; padding:12px; border-radius:8px; border-left:4px solid #ff6d00;
      mat-icon { color:#ff6d00; } p { margin:4px 0 0; font-size:0.85rem; color:#757575; }
    }
    .empty-state { text-align:center; padding:64px 16px;
      mat-icon { font-size:64px; width:64px; height:64px; color:#bdbdbd; display:block; margin:0 auto 16px; }
      h3 { margin:0 0 8px; } p { color:#757575; margin:0 0 24px; }
    }
  `]
})
export class MyWaitlistComponent implements OnInit {
  private waitlistService = inject(WaitlistService);
  private snackBar = inject(MatSnackBar);

  entries: WaitlistEntryResponse[] = [];
  loading = true;
  WaitlistStatus = WaitlistStatus;

  ngOnInit(): void {
    this.waitlistService.getMyWaitlist().subscribe({
      next: (e) => { this.entries = e; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  leave(entry: WaitlistEntryResponse): void {
    if (!confirm('Sair da lista de espera para este evento?')) return;
    this.waitlistService.leaveWaitlist(entry.id).subscribe({
      next: () => {
        this.entries = this.entries.filter(e => e.id !== entry.id);
        this.snackBar.open('Removido da fila.', 'OK', { duration: 3000 });
      },
      error: (err) => this.snackBar.open(err.error?.error || 'Erro', 'Fechar', { duration: 3000 })
    });
  }

  getStatusLabel(status: WaitlistStatus): string {
    const labels: Record<number, string> = { 0: 'Aguardando', 1: 'Notificado', 2: 'Comprado', 3: 'Expirado' };
    return labels[status];
  }

  getStatusClass(status: WaitlistStatus): string {
    const classes: Record<number, string> = { 0: 'status-pending', 1: 'status-active', 2: 'status-active', 3: 'status-cancelled' };
    return classes[status];
  }
}
