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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TicketTransferService } from '../../core/services/ticket-transfer.service';
import { TicketTransferResponse, TicketTransferStatus } from '../../core/models';

@Component({
  selector: 'app-ticket-transfers',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatTabsModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatChipsModule, MatDividerModule,
    TranslateModule
  ],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <h1 class="section-title">{{ 'TRANSFERS.PAGE_TITLE_FULL' | translate }}</h1>
        <a mat-button routerLink="/my-tickets"><mat-icon>arrow_back</mat-icon> {{ 'NAV.MY_TICKETS_FULL' | translate }}</a>
      </div>

      <mat-tab-group>
        <!-- Tab: Iniciar transferência -->
        <mat-tab [label]="'TRANSFERS.TAB_SEND' | translate">
          <div class="tab-content">
            <mat-card class="form-card">
              <mat-card-header>
                <mat-card-title>{{ 'TRANSFERS.FORM_TITLE' | translate }}</mat-card-title>
                <mat-card-subtitle>{{ 'TRANSFERS.FORM_SUBTITLE' | translate }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <form [formGroup]="form" (ngSubmit)="initiate()">
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>{{ 'TRANSFERS.TICKET_ID' | translate }}</mat-label>
                    <input matInput type="number" formControlName="ticketId" [placeholder]="'TRANSFERS.TICKET_ID_PLACEHOLDER' | translate">
                    <mat-icon matSuffix>qr_code_2</mat-icon>
                    <mat-hint>{{ 'TRANSFERS.TICKET_ID_HINT' | translate }}</mat-hint>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>{{ 'TRANSFERS.RECIPIENT_EMAIL' | translate }}</mat-label>
                    <input matInput type="email" formControlName="toEmail" placeholder="email@exemplo.com">
                    <mat-icon matSuffix>email</mat-icon>
                  </mat-form-field>

                  <div class="info-box">
                    <mat-icon>info</mat-icon>
                    <p>{{ 'TRANSFERS.INFO_BOX' | translate }}</p>
                  </div>

                  <button mat-raised-button color="primary" type="submit"
                          [disabled]="form.invalid || sending" class="full-width">
                    @if (sending) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                    @else { <mat-icon>send</mat-icon> {{ 'TRANSFERS.INITIATE_BTN' | translate }} }
                  </button>
                </form>
              </mat-card-content>
            </mat-card>

            <!-- Sent transfers -->
            @if (sentLoading) {
              <div style="text-align:center;padding:32px"><mat-progress-spinner mode="indeterminate" /></div>
            } @else if (sentTransfers.length > 0) {
              <h3>{{ 'TRANSFERS.SENT' | translate }}</h3>
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
                        <button mat-icon-button color="warn" (click)="cancel(t.id)" [title]="'COMMON.CANCEL' | translate">
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
        <mat-tab [label]="pendingTransfers.length > 0 ? (('TRANSFERS.TAB_RECEIVED' | translate) + ' (' + pendingTransfers.length + ')') : ('TRANSFERS.TAB_RECEIVED' | translate)">
          <div class="tab-content">
            @if (pendingLoading) {
              <div style="text-align:center;padding:32px"><mat-progress-spinner mode="indeterminate" /></div>
            } @else if (pendingTransfers.length === 0) {
              <mat-card class="empty-card">
                <mat-icon>inbox</mat-icon>
                <p>{{ 'TRANSFERS.NO_PENDING' | translate }}</p>
              </mat-card>
            } @else {
              @for (t of pendingTransfers; track t.id) {
                <mat-card class="transfer-card pending-card">
                  <div class="transfer-row">
                    <div>
                      <strong>{{ t.ticketTypeName }}</strong> — {{ t.eventTitle }}
                      <div class="transfer-meta">
                        <mat-icon>person</mat-icon> {{ 'TRANSFERS.FROM' | translate }} {{ t.fromUserName }} •
                        {{ t.createdAt | date:'dd/MM/yyyy HH:mm' }}
                      </div>
                    </div>
                    <button mat-raised-button color="primary" (click)="accept(t.token)" [disabled]="accepting === t.id">
                      @if (accepting === t.id) { <mat-progress-spinner diameter="18" mode="indeterminate" /> }
                      @else { <mat-icon>check</mat-icon> {{ 'TRANSFERS.ACCEPT' | translate }} }
                    </button>
                  </div>
                </mat-card>
              }
            }

            <mat-divider style="margin:24px 0"></mat-divider>

            <!-- Accept by token -->
            <mat-card class="form-card">
              <mat-card-header>
                <mat-card-title>{{ 'TRANSFERS.ACCEPT_BY_TOKEN' | translate }}</mat-card-title>
                <mat-card-subtitle>{{ 'TRANSFERS.ACCEPT_BY_TOKEN_SUBTITLE' | translate }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <form [formGroup]="tokenForm" (ngSubmit)="acceptByToken()">
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>{{ 'TRANSFERS.TOKEN_LABEL' | translate }}</mat-label>
                    <input matInput formControlName="token" [placeholder]="'TRANSFERS.TOKEN_PLACEHOLDER' | translate">
                  </mat-form-field>
                  <button mat-raised-button color="accent" type="submit"
                          [disabled]="tokenForm.invalid || acceptingToken" class="full-width">
                    @if (acceptingToken) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                    @else { <mat-icon>lock_open</mat-icon> {{ 'TRANSFERS.ACCEPT_BTN' | translate }} }
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
    .info-box { display:flex; align-items:flex-start; gap:8px; background:var(--info-bg); border-radius:8px; padding:12px;
      mat-icon { color:var(--info); flex-shrink:0; font-size:18px; width:18px; height:18px; }
      p { margin:0; font-size:0.85rem; color:var(--info-text); }
    }
    .transfer-card { padding:16px; }
    .pending-card { border-left:4px solid var(--primary); }
    .transfer-row { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; }
    .transfer-meta { font-size:0.8rem; color:var(--text-secondary); display:flex; align-items:center; gap:4px; margin-top:4px;
      mat-icon { font-size:14px; width:14px; height:14px; }
    }
    .transfer-actions { display:flex; align-items:center; gap:8px; flex-shrink:0; }
    .empty-card { text-align:center; padding:48px;
      mat-icon { font-size:48px; width:48px; height:48px; color:var(--text-hint); display:block; margin:0 auto 16px; } p { color:var(--text-secondary); } }
  `]
})
export class TicketTransfersComponent implements OnInit {
  private service = inject(TicketTransferService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);

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
        this.snackBar.open(this.translate.instant('TRANSFERS.TRANSFER_INITIATED'), 'OK', { duration: 4000 });
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
        this.snackBar.open(this.translate.instant('TRANSFERS.TRANSFER_ACCEPTED'), 'OK', { duration: 3000 });
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
        this.snackBar.open(this.translate.instant('TRANSFERS.TRANSFER_ACCEPTED'), 'OK', { duration: 3000 });
      },
      error: () => { this.acceptingToken = false; }
    });
  }

  cancel(id: number): void {
    this.service.cancel(id).subscribe({
      next: () => {
        const t = this.sentTransfers.find(x => x.id === id);
        if (t) t.status = TicketTransferStatus.Cancelled;
        this.snackBar.open(this.translate.instant('TRANSFERS.TRANSFER_CANCELLED'), 'OK', { duration: 2000 });
      }
    });
  }

  getStatusLabel(status: TicketTransferStatus): string {
    const keys: Partial<Record<TicketTransferStatus, string>> = {
      [TicketTransferStatus.Pending]: 'TRANSFERS.PENDING',
      [TicketTransferStatus.Accepted]: 'TRANSFERS.ACCEPTED',
      [TicketTransferStatus.Cancelled]: 'TRANSFERS.CANCELLED'
    };
    return this.translate.instant(keys[status] ?? '');
  }

  getStatusColor(status: TicketTransferStatus): string {
    return { [TicketTransferStatus.Pending]: 'accent', [TicketTransferStatus.Accepted]: 'primary', [TicketTransferStatus.Cancelled]: 'warn' }[status] ?? '';
  }
}
