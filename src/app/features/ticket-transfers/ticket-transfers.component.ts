import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { TicketTransferService } from '../../core/services/ticket-transfer.service';
import { TicketTransferResponse, TicketTransferStatus } from '../../core/models';

@Component({
  selector: 'app-ticket-transfers',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatTabsModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatChipsModule, MatDividerModule
  ],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <h1 class="section-title">Transferências de Ingresso</h1>
        <a mat-button routerLink="/my-tickets"><mat-icon>arrow_back</mat-icon> Meus Ingressos</a>
      </div>

      <mat-tab-group>
        <!-- Tab: Iniciar transferência -->
        <mat-tab label="Transferir Ingresso">
          <div class="tab-content">
            <mat-card class="form-card">
              <mat-card-header>
                <mat-card-title>Transferir para outra pessoa</mat-card-title>
                <mat-card-subtitle>O destinatário receberá um link para aceitar o ingresso</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <form [formGroup]="form" (ngSubmit)="initiate()">
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>ID do Ingresso</mat-label>
                    <input matInput type="number" formControlName="ticketId" placeholder="Veja em Meus Ingressos">
                    <mat-icon matSuffix>qr_code_2</mat-icon>
                    <mat-hint>Você pode ver o ID na página Meus Ingressos</mat-hint>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>E-mail do destinatário</mat-label>
                    <input matInput type="email" formControlName="toEmail" placeholder="email@exemplo.com">
                    <mat-icon matSuffix>email</mat-icon>
                  </mat-form-field>

                  <div class="info-box">
                    <mat-icon>info</mat-icon>
                    <p>O ingresso ficará em seu nome até que o destinatário aceite a transferência. Você pode cancelar antes da aceitação.</p>
                  </div>

                  <button mat-raised-button color="primary" type="submit"
                          [disabled]="form.invalid || sending" class="full-width">
                    @if (sending) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                    @else { <mat-icon>send</mat-icon> Iniciar Transferência }
                  </button>
                </form>
              </mat-card-content>
            </mat-card>

            <!-- Sent transfers -->
            @if (sentLoading) {
              <div style="text-align:center;padding:32px"><mat-progress-spinner mode="indeterminate" /></div>
            } @else if (sentTransfers.length > 0) {
              <h3>Transferências Enviadas</h3>
              @for (t of sentTransfers; track t.id) {
                <mat-card class="transfer-card">
                  <div class="transfer-row">
                    <div>
                      <strong>{{ t.ticketTypeName }}</strong> — {{ t.eventTitle }}
                      <div class="transfer-meta">
                        <mat-icon>email</mat-icon> {{ t.toEmail }} •
                        {{ t.createdAt | date:'dd/MM/yyyy HH:mm' }}
                      </div>
                    </div>
                    <div class="transfer-actions">
                      <mat-chip [color]="getStatusColor(t.status)" highlighted>{{ getStatusLabel(t.status) }}</mat-chip>
                      @if (t.status === TicketTransferStatus.Pending) {
                        <button mat-icon-button color="warn" (click)="cancel(t.id)" title="Cancelar">
                          <mat-icon>cancel</mat-icon>
                        </button>
                      }
                    </div>
                  </div>
                </mat-card>
              }
            }
          </div>
        </mat-tab>

        <!-- Tab: Aceitar transferência -->
        <mat-tab [label]="pendingTransfers.length > 0 ? 'Recebidas (' + pendingTransfers.length + ')' : 'Recebidas'">
          <div class="tab-content">
            @if (pendingLoading) {
              <div style="text-align:center;padding:32px"><mat-progress-spinner mode="indeterminate" /></div>
            } @else if (pendingTransfers.length === 0) {
              <mat-card class="empty-card">
                <mat-icon>inbox</mat-icon>
                <p>Nenhuma transferência pendente para você.</p>
              </mat-card>
            } @else {
              @for (t of pendingTransfers; track t.id) {
                <mat-card class="transfer-card pending-card">
                  <div class="transfer-row">
                    <div>
                      <strong>{{ t.ticketTypeName }}</strong> — {{ t.eventTitle }}
                      <div class="transfer-meta">
                        <mat-icon>person</mat-icon> De: {{ t.fromUserName }} •
                        {{ t.createdAt | date:'dd/MM/yyyy HH:mm' }}
                      </div>
                    </div>
                    <button mat-raised-button color="primary" (click)="accept(t.token)" [disabled]="accepting === t.id">
                      @if (accepting === t.id) { <mat-progress-spinner diameter="18" mode="indeterminate" /> }
                      @else { <mat-icon>check</mat-icon> Aceitar }
                    </button>
                  </div>
                </mat-card>
              }
            }

            <mat-divider style="margin:24px 0"></mat-divider>

            <!-- Accept by token -->
            <mat-card class="form-card">
              <mat-card-header>
                <mat-card-title>Aceitar por Token</mat-card-title>
                <mat-card-subtitle>Caso tenha recebido um link de transferência</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <form [formGroup]="tokenForm" (ngSubmit)="acceptByToken()">
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Token de Transferência</mat-label>
                    <input matInput formControlName="token" placeholder="Cole o token recebido">
                  </mat-form-field>
                  <button mat-raised-button color="accent" type="submit"
                          [disabled]="tokenForm.invalid || acceptingToken" class="full-width">
                    @if (acceptingToken) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                    @else { <mat-icon>lock_open</mat-icon> Aceitar Transferência }
                  </button>
                </form>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .page-container { padding:32px 16px; }
    .page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:32px; }
    .tab-content { padding:24px 0; display:flex; flex-direction:column; gap:16px; max-width:640px; }
    .form-card { padding:8px; }
    form { display:flex; flex-direction:column; gap:14px; margin-top:8px; }
    .full-width { width:100%; }
    .info-box { display:flex; align-items:flex-start; gap:8px; background:#e3f2fd; border-radius:8px; padding:12px;
      mat-icon { color:#0288d1; flex-shrink:0; font-size:18px; width:18px; height:18px; }
      p { margin:0; font-size:0.85rem; color:#01579b; }
    }
    .transfer-card { padding:16px; }
    .pending-card { border-left:4px solid #6200ea; }
    .transfer-row { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; }
    .transfer-meta { font-size:0.8rem; color:#757575; display:flex; align-items:center; gap:4px; margin-top:4px;
      mat-icon { font-size:14px; width:14px; height:14px; }
    }
    .transfer-actions { display:flex; align-items:center; gap:8px; flex-shrink:0; }
    .empty-card { text-align:center; padding:48px;
      mat-icon { font-size:48px; width:48px; height:48px; color:#bdbdbd; display:block; margin:0 auto 16px; } p { color:#757575; } }
  `]
})
export class TicketTransfersComponent implements OnInit {
  private service = inject(TicketTransferService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  TicketTransferStatus = TicketTransferStatus;
  sentTransfers: TicketTransferResponse[] = [];
  pendingTransfers: TicketTransferResponse[] = [];
  sentLoading = true;
  pendingLoading = true;
  sending = false;
  accepting: number | null = null;
  acceptingToken = false;

  form = this.fb.group({
    ticketId: [null as number | null, [Validators.required, Validators.min(1)]],
    toEmail: ['', [Validators.required, Validators.email]]
  });

  tokenForm = this.fb.group({
    token: ['', Validators.required]
  });

  ngOnInit(): void {
    this.service.getSent().subscribe({
      next: (d) => { this.sentTransfers = d; this.sentLoading = false; },
      error: () => { this.sentLoading = false; }
    });
    this.service.getPending().subscribe({
      next: (d) => { this.pendingTransfers = d; this.pendingLoading = false; },
      error: () => { this.pendingLoading = false; }
    });
  }

  initiate(): void {
    if (this.form.invalid) return;
    const v = this.form.value;
    this.sending = true;
    this.service.initiate({ ticketId: v.ticketId!, toEmail: v.toEmail! }).subscribe({
      next: (t) => {
        this.sentTransfers.unshift(t);
        this.form.reset();
        this.sending = false;
        this.snackBar.open('Transferência iniciada! O destinatário pode aceitar em "Recebidas".', 'OK', { duration: 4000 });
      },
      error: () => { this.sending = false; }
    });
  }

  accept(token: string): void {
    const t = this.pendingTransfers.find(x => x.token === token);
    if (t) this.accepting = t.id;
    this.service.accept(token).subscribe({
      next: () => {
        this.pendingTransfers = this.pendingTransfers.filter(x => x.token !== token);
        this.accepting = null;
        this.snackBar.open('Ingresso transferido com sucesso!', 'OK', { duration: 3000 });
      },
      error: () => { this.accepting = null; }
    });
  }

  acceptByToken(): void {
    if (this.tokenForm.invalid) return;
    this.acceptingToken = true;
    this.service.accept(this.tokenForm.value.token!).subscribe({
      next: () => {
        this.tokenForm.reset();
        this.acceptingToken = false;
        this.snackBar.open('Ingresso transferido com sucesso!', 'OK', { duration: 3000 });
      },
      error: () => { this.acceptingToken = false; }
    });
  }

  cancel(id: number): void {
    this.service.cancel(id).subscribe({
      next: () => {
        const t = this.sentTransfers.find(x => x.id === id);
        if (t) t.status = TicketTransferStatus.Cancelled;
        this.snackBar.open('Transferência cancelada.', 'OK', { duration: 2000 });
      }
    });
  }

  getStatusLabel(status: TicketTransferStatus): string {
    return { [TicketTransferStatus.Pending]: 'Pendente', [TicketTransferStatus.Accepted]: 'Aceita', [TicketTransferStatus.Cancelled]: 'Cancelada' }[status] ?? '';
  }

  getStatusColor(status: TicketTransferStatus): string {
    return { [TicketTransferStatus.Pending]: 'accent', [TicketTransferStatus.Accepted]: 'primary', [TicketTransferStatus.Cancelled]: 'warn' }[status] ?? '';
  }
}
