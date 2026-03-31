import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaymentLinkService } from '../../../core/services/payment-link.service';
import { PaymentLinkResponse } from '../../../core/models';

@Component({
  selector: 'app-payment-links',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatProgressSpinnerModule, MatSnackBarModule,
    MatChipsModule, MatTooltipModule
  ],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <h1 class="section-title">Links de Pagamento</h1>
        <a mat-button routerLink="/admin"><mat-icon>arrow_back</mat-icon> Voltar</a>
      </div>

      <div class="content-grid">
        <!-- Create form -->
        <mat-card class="create-card">
          <mat-card-header>
            <mat-card-title><mat-icon>add_link</mat-icon> Criar Link</mat-card-title>
            <mat-card-subtitle>Gere um link compartilhável para venda direta</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="form" (ngSubmit)="create()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>ID do Evento (opcional)</mat-label>
                <input matInput type="number" formControlName="eventId" placeholder="Deixe vazio para qualquer evento">
                <mat-icon matSuffix>event</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>ID do Tipo de Ingresso (opcional)</mat-label>
                <input matInput type="number" formControlName="ticketTypeId" placeholder="Pré-seleciona um ingresso">
                <mat-icon matSuffix>confirmation_number</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Máximo de Usos (opcional)</mat-label>
                <input matInput type="number" formControlName="maxUses" min="1" placeholder="Ilimitado se vazio">
                <mat-icon matSuffix>toll</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Mensagem Personalizada</mat-label>
                <textarea matInput formControlName="customMessage" rows="2"
                  placeholder="Texto exibido na página de checkout para o comprador"></textarea>
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit"
                      [disabled]="form.invalid || creating" class="full-width">
                @if (creating) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                @else { <mat-icon>add_link</mat-icon> Gerar Link }
              </button>
            </form>
          </mat-card-content>
        </mat-card>

        <!-- Links list -->
        <div class="links-list">
          @if (loading) {
            <div style="text-align:center;padding:32px"><mat-progress-spinner mode="indeterminate" /></div>
          } @else if (links.length === 0) {
            <mat-card class="empty-card">
              <mat-icon>link_off</mat-icon>
              <p>Nenhum link criado ainda. Crie seu primeiro link de pagamento!</p>
            </mat-card>
          } @else {
            @for (link of links; track link.id) {
              <mat-card class="link-card" [class.inactive]="!link.isActive">
                <div class="link-header">
                  <div>
                    <span class="link-target">
                      @if (link.eventTitle) { 📅 {{ link.eventTitle }} }
                      @else if (link.ticketTypeName) { 🎫 {{ link.ticketTypeName }} }
                      @else { 🔗 Link Geral }
                    </span>
                    <span class="link-stats">
                      {{ link.usedCount }}{{ link.maxUses ? '/' + link.maxUses : '' }} usos •
                      {{ link.totalRevenue | currency:'BRL' }} gerado
                    </span>
                  </div>
                  <div class="link-actions">
                    @if (link.isActive) {
                      <button mat-icon-button color="primary" (click)="copyLink(link.url)" matTooltip="Copiar link">
                        <mat-icon>content_copy</mat-icon>
                      </button>
                      <button mat-icon-button color="warn" (click)="deactivate(link.id)" matTooltip="Desativar">
                        <mat-icon>link_off</mat-icon>
                      </button>
                    } @else {
                      <mat-chip color="warn">Inativo</mat-chip>
                    }
                  </div>
                </div>

                <div class="link-url">
                  <code>{{ link.url }}</code>
                </div>

                @if (link.customMessage) {
                  <p class="link-msg">"{{ link.customMessage }}"</p>
                }

                <div class="link-meta">
                  <span>Criado: {{ link.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
                  @if (link.expiresAt) {
                    <span>Expira: {{ link.expiresAt | date:'dd/MM/yyyy' }}</span>
                  }
                </div>
              </mat-card>
            }
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 32px 16px; }
    .page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:32px; }
    .content-grid { display:grid; grid-template-columns:380px 1fr; gap:24px;
      @media(max-width:900px){grid-template-columns:1fr;} }
    .create-card mat-icon[ng-reflect-svg-icon] { margin-right:8px; }
    form { display:flex; flex-direction:column; gap:12px; margin-top:8px; }
    .full-width { width:100%; }
    .links-list { display:flex; flex-direction:column; gap:12px; }
    .link-card { padding:16px; }
    .link-card.inactive { opacity:0.6; }
    .link-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px; }
    .link-target { display:block; font-weight:600; font-size:0.95rem; }
    .link-stats { display:block; font-size:0.8rem; color:#757575; margin-top:2px; }
    .link-actions { display:flex; gap:4px; flex-shrink:0; }
    .link-url { background:#f5f5f5; border-radius:4px; padding:8px 12px; margin-bottom:8px; overflow:hidden;
      code { font-size:0.8rem; word-break:break-all; } }
    .link-msg { font-style:italic; color:#616161; font-size:0.85rem; margin:4px 0 8px; }
    .link-meta { display:flex; gap:16px; font-size:0.75rem; color:#9e9e9e; }
    .empty-card { text-align:center; padding:48px; mat-icon { font-size:48px; width:48px; height:48px; color:#bdbdbd; display:block; margin:0 auto 16px; } p { color:#757575; } }
  `]
})
export class PaymentLinksComponent implements OnInit {
  private service = inject(PaymentLinkService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  links: PaymentLinkResponse[] = [];
  loading = true;
  creating = false;

  form = this.fb.group({
    eventId: [null as number | null],
    ticketTypeId: [null as number | null],
    maxUses: [null as number | null],
    customMessage: ['', Validators.maxLength(500)]
  });

  ngOnInit(): void {
    this.loadLinks();
  }

  private loadLinks(): void {
    this.loading = true;
    this.service.getMyLinks().subscribe({
      next: (data) => { this.links = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  create(): void {
    if (this.form.invalid) return;
    const val = this.form.value;
    this.creating = true;
    this.service.create({
      eventId: val.eventId ?? undefined,
      ticketTypeId: val.ticketTypeId ?? undefined,
      maxUses: val.maxUses ?? undefined,
      customMessage: val.customMessage ?? undefined
    }).subscribe({
      next: (link) => {
        this.links.unshift(link);
        this.form.reset();
        this.creating = false;
        this.snackBar.open('Link criado!', 'OK', { duration: 3000 });
        this.copyLink(link.url);
      },
      error: () => { this.creating = false; }
    });
  }

  copyLink(url: string): void {
    navigator.clipboard.writeText(url).then(() => {
      this.snackBar.open('Link copiado!', '', { duration: 2000 });
    });
  }

  deactivate(id: number): void {
    this.service.deactivate(id).subscribe({
      next: () => {
        const link = this.links.find(l => l.id === id);
        if (link) link.isActive = false;
        this.snackBar.open('Link desativado.', 'OK', { duration: 2000 });
      }
    });
  }
}
