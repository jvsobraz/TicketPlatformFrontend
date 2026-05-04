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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PaymentLinkService } from '../../../core/services/payment-link.service';
import { PaymentLinkResponse } from '../../../core/models';

@Component({
  selector: 'app-payment-links',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatProgressSpinnerModule, MatSnackBarModule,
    MatChipsModule, MatTooltipModule,
    TranslateModule
  ],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <h1 class="section-title">{{ 'PAYMENT_LINKS.PAGE_TITLE' | translate }}</h1>
        <a mat-button routerLink="/admin"><mat-icon>arrow_back</mat-icon> {{ 'COMMON.BACK' | translate }}</a>
      </div>

      <div class="content-grid">
        <!-- Create form -->
        <mat-card class="create-card">
          <mat-card-header>
            <mat-card-title><mat-icon>add_link</mat-icon> {{ 'PAYMENT_LINKS.CREATE_TITLE' | translate }}</mat-card-title>
            <mat-card-subtitle>{{ 'PAYMENT_LINKS.CREATE_SUBTITLE' | translate }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="form" (ngSubmit)="create()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'PAYMENT_LINKS.EVENT_ID' | translate }}</mat-label>
                <input matInput type="number" formControlName="eventId" [placeholder]="'PAYMENT_LINKS.EVENT_ID_PLACEHOLDER' | translate">
                <mat-icon matSuffix>event</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'PAYMENT_LINKS.TICKET_TYPE_ID' | translate }}</mat-label>
                <input matInput type="number" formControlName="ticketTypeId" [placeholder]="'PAYMENT_LINKS.TICKET_TYPE_PLACEHOLDER' | translate">
                <mat-icon matSuffix>confirmation_number</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'PAYMENT_LINKS.MAX_USES' | translate }}</mat-label>
                <input matInput type="number" formControlName="maxUses" min="1" [placeholder]="'PAYMENT_LINKS.MAX_USES_PLACEHOLDER' | translate">
                <mat-icon matSuffix>toll</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'PAYMENT_LINKS.CUSTOM_MSG' | translate }}</mat-label>
                <textarea matInput formControlName="customMessage" rows="2"
                  [placeholder]="'PAYMENT_LINKS.CUSTOM_MSG_PLACEHOLDER' | translate"></textarea>
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit"
                      [disabled]="form.invalid || creating" class="full-width">
                @if (creating) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                @else { <mat-icon>add_link</mat-icon> {{ 'PAYMENT_LINKS.GENERATE' | translate }} }
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
              <p>{{ 'PAYMENT_LINKS.NO_LINKS' | translate }}</p>
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
                      {{ link.usedCount }}{{ link.maxUses ? '/' + link.maxUses : '' }} {{ 'PAYMENT_LINKS.USES' | translate }} •
                      {{ link.totalRevenue | currency:'BRL' }} {{ 'PAYMENT_LINKS.GENERATED' | translate }}
                    </span>
                  </div>
                  <div class="link-actions">
                    @if (link.isActive) {
                      <button mat-icon-button color="primary" (click)="copyLink(link.url)" [matTooltip]="'PAYMENT_LINKS.COPY_LINK' | translate">
                        <mat-icon>content_copy</mat-icon>
                      </button>
                      <button mat-icon-button color="warn" (click)="deactivate(link.id)" [matTooltip]="'PAYMENT_LINKS.DEACTIVATE' | translate">
                        <mat-icon>link_off</mat-icon>
                      </button>
                    } @else {
                      <mat-chip color="warn">{{ 'PAYMENT_LINKS.INACTIVE' | translate }}</mat-chip>
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
                  <span>{{ 'PAYMENT_LINKS.CREATED_AT' | translate }} {{ link.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
                  @if (link.expiresAt) {
                    <span>{{ 'PAYMENT_LINKS.EXPIRES' | translate }} {{ link.expiresAt | date:'dd/MM/yyyy' }}</span>
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
    .link-stats { display:block; font-size:0.8rem; color:var(--text-secondary); margin-top:2px; }
    .link-actions { display:flex; gap:4px; flex-shrink:0; }
    .link-url { background:var(--surface-2); border-radius:4px; padding:8px 12px; margin-bottom:8px; overflow:hidden;
      code { font-size:0.8rem; word-break:break-all; } }
    .link-msg { font-style:italic; color:var(--text-secondary); font-size:0.85rem; margin:4px 0 8px; }
    .link-meta { display:flex; gap:16px; font-size:0.75rem; color:var(--text-hint); }
    .empty-card { text-align:center; padding:48px; mat-icon { font-size:48px; width:48px; height:48px; color:var(--text-hint); display:block; margin:0 auto 16px; } p { color:var(--text-secondary); } }
  `]
})
export class PaymentLinksComponent implements OnInit {
  private service = inject(PaymentLinkService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);

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
        this.snackBar.open(this.translate.instant('PAYMENT_LINKS.CREATED'), 'OK', { duration: 3000 });
        this.copyLink(link.url);
      },
      error: () => { this.creating = false; }
    });
  }

  copyLink(url: string): void {
    navigator.clipboard.writeText(url).then(() => {
      this.snackBar.open(this.translate.instant('PAYMENT_LINKS.COPIED'), '', { duration: 2000 });
    });
  }

  deactivate(id: number): void {
    this.service.deactivate(id).subscribe({
      next: () => {
        const link = this.links.find(l => l.id === id);
        if (link) link.isActive = false;
        this.snackBar.open(this.translate.instant('PAYMENT_LINKS.DEACTIVATED'), 'OK', { duration: 2000 });
      }
    });
  }
}
