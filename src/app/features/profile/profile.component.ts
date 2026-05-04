import { Component, OnInit, AfterViewChecked, inject, signal, ViewChild, ElementRef } from '@angular/core';
import QRCode from 'qrcode';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../core/services/auth.service';
import { TicketService } from '../../core/services/ticket.service';
import { OrderService } from '../../core/services/order.service';
import { LoyaltyService } from '../../core/services/loyalty.service';
import { UpdateProfileRequest, ChangePasswordRequest, UserRole, TwoFactorSetupResponse } from '../../core/models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule, MatSnackBarModule, MatDividerModule, MatTooltipModule,
    TranslateModule
  ],
  template: `
    <div class="profile-page">
      <!-- Header -->
      <div class="page-hero">
        <div class="container">
          <div class="hero-row">
            <div class="avatar-circle">{{ getInitial() }}</div>
            <div class="hero-info">
              <h1 class="page-title">{{ authService.currentUser()?.name }}</h1>
              <p class="page-subtitle">{{ authService.currentUser()?.email }}</p>
              <span class="role-badge" [class]="getRoleClass()">{{ getRoleLabel() }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="container profile-content">
        <!-- Stats bar -->
        @if (statsLoaded()) {
          <div class="stats-row fade-in">
            <div class="stat-item">
              <span class="stat-value">{{ ticketCount }}</span>
              <span class="stat-label">{{ 'PROFILE.TICKETS_STAT' | translate }}</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">{{ orderCount }}</span>
              <span class="stat-label">{{ 'PROFILE.ORDERS_STAT' | translate }}</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">{{ loyaltyPoints }}</span>
              <span class="stat-label">{{ 'PROFILE.POINTS_STAT' | translate }}</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">{{ totalSpent | currency:'BRL':'symbol':'1.0-0' }}</span>
              <span class="stat-label">{{ 'PROFILE.TOTAL_SPENT' | translate }}</span>
            </div>
          </div>
        } @else {
          <div class="stats-skeleton">
            @for (n of [1,2,3,4]; track n) {
              <div class="sk-stat skeleton"></div>
            }
          </div>
        }

        <div class="sections-grid">
          <!-- Edit profile -->
          <div class="profile-section fade-in">
            <div class="section-header">
              <mat-icon>manage_accounts</mat-icon>
              <h2>{{ 'PROFILE.PERSONAL_INFO' | translate }}</h2>
            </div>
            <form [formGroup]="profileForm" (ngSubmit)="saveProfile()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'PROFILE.FULL_NAME' | translate }}</mat-label>
                <mat-icon matPrefix>person</mat-icon>
                <input matInput formControlName="name" [placeholder]="'PROFILE.NAME_PLACEHOLDER' | translate">
                @if (profileForm.get('name')?.hasError('required')) {
                  <mat-error>{{ 'PROFILE.NAME_REQUIRED' | translate }}</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'PROFILE.EMAIL' | translate }}</mat-label>
                <mat-icon matPrefix>email</mat-icon>
                <input matInput [value]="authService.currentUser()?.email" disabled>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'PROFILE.PHONE' | translate }}</mat-label>
                <mat-icon matPrefix>phone</mat-icon>
                <input matInput formControlName="phone" placeholder="(11) 99999-9999">
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'PROFILE.CPF' | translate }}</mat-label>
                <mat-icon matPrefix>badge</mat-icon>
                <input matInput formControlName="cpf" placeholder="000.000.000-00">
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit"
                      [disabled]="profileForm.invalid || savingProfile" class="full-width">
                @if (savingProfile) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                @else { <mat-icon>save</mat-icon> {{ 'PROFILE.SAVE_CHANGES' | translate }} }
              </button>
            </form>
          </div>

          <!-- Change password -->
          <div class="profile-section fade-in-delay-1">
            <div class="section-header">
              <mat-icon>lock</mat-icon>
              <h2>{{ 'PROFILE.SECURITY' | translate }}</h2>
            </div>
            <form [formGroup]="passwordForm" (ngSubmit)="changePassword()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'PROFILE.CURRENT_PASSWORD' | translate }}</mat-label>
                <mat-icon matPrefix>lock_outline</mat-icon>
                <input matInput [type]="showCurrent ? 'text' : 'password'" formControlName="currentPassword">
                <button mat-icon-button matSuffix type="button" (click)="showCurrent = !showCurrent">
                  <mat-icon>{{ showCurrent ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
                @if (passwordForm.get('currentPassword')?.hasError('required')) {
                  <mat-error>{{ 'PROFILE.PWD_REQUIRED' | translate }}</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'PROFILE.NEW_PASSWORD' | translate }}</mat-label>
                <mat-icon matPrefix>lock</mat-icon>
                <input matInput [type]="showNew ? 'text' : 'password'" formControlName="newPassword">
                <button mat-icon-button matSuffix type="button" (click)="showNew = !showNew">
                  <mat-icon>{{ showNew ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
                @if (passwordForm.get('newPassword')?.hasError('minlength')) {
                  <mat-error>{{ 'PROFILE.PWD_MIN_LENGTH' | translate }}</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'PROFILE.CONFIRM_PASSWORD' | translate }}</mat-label>
                <mat-icon matPrefix>lock</mat-icon>
                <input matInput [type]="showConfirm ? 'text' : 'password'" formControlName="confirmPassword">
                <button mat-icon-button matSuffix type="button" (click)="showConfirm = !showConfirm">
                  <mat-icon>{{ showConfirm ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
                @if (passwordForm.hasError('mismatch')) {
                  <mat-error>{{ 'PROFILE.PWD_MISMATCH' | translate }}</mat-error>
                }
              </mat-form-field>

              <button mat-raised-button color="accent" type="submit"
                      [disabled]="passwordForm.invalid || changingPassword" class="full-width">
                @if (changingPassword) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                @else { <mat-icon>key</mat-icon> {{ 'PROFILE.CHANGE_PASSWORD' | translate }} }
              </button>
            </form>

            <!-- Quick links -->
            <mat-divider style="margin: 24px 0" />
            <h3 class="quick-links-title">{{ 'PROFILE.QUICK_ACCESS' | translate }}</h3>
            <div class="quick-links">
              <a mat-stroked-button routerLink="/my-tickets" class="quick-link">
                <mat-icon>confirmation_number</mat-icon> {{ 'NAV.MY_TICKETS_FULL' | translate }}
              </a>
              <a mat-stroked-button routerLink="/my-waitlist" class="quick-link">
                <mat-icon>hourglass_top</mat-icon> {{ 'NAV.WAITLIST' | translate }}
              </a>
              <a mat-stroked-button routerLink="/loyalty" class="quick-link">
                <mat-icon>stars</mat-icon> {{ 'NAV.LOYALTY' | translate }}
              </a>
              <a mat-stroked-button routerLink="/ticket-transfers" class="quick-link">
                <mat-icon>swap_horiz</mat-icon> {{ 'PROFILE.TRANSFERS_LINK' | translate }}
              </a>
            </div>
          </div>

          <!-- 2FA Setup -->
          <div class="profile-section fade-in-delay-2">
            <div class="section-header">
              <mat-icon>security</mat-icon>
              <h2>{{ 'PROFILE.TWO_FA' | translate }}</h2>
            </div>

            @if (!twoFaSetup()) {
              <!-- Estado atual -->
              <div class="twofa-status" [class.enabled]="twoFaEnabled()">
                <mat-icon>{{ twoFaEnabled() ? 'verified_user' : 'gpp_maybe' }}</mat-icon>
                <div>
                  <strong>{{ twoFaEnabled() ? ('PROFILE.TWO_FA_ENABLED' | translate) : ('PROFILE.TWO_FA_DISABLED' | translate) }}</strong>
                  <p>{{ twoFaEnabled()
                    ? ('PROFILE.TWOFA_STATUS_ON' | translate)
                    : ('PROFILE.TWOFA_STATUS_OFF' | translate) }}
                  </p>
                </div>
              </div>

              @if (!twoFaEnabled()) {
                <button mat-raised-button color="primary" (click)="startTwoFaSetup()" [disabled]="twoFaLoading()">
                  @if (twoFaLoading()) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                  @else { <mat-icon>qr_code</mat-icon> {{ 'PROFILE.TWOFA_SETUP_BTN' | translate }} }
                </button>
              } @else {
                <form [formGroup]="twoFaDisableForm" (ngSubmit)="disableTwoFa()">
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>{{ 'PROFILE.TWOFA_CODE' | translate }}</mat-label>
                    <mat-icon matPrefix>pin</mat-icon>
                    <input matInput formControlName="code" inputmode="numeric" maxlength="6" placeholder="000000">
                  </mat-form-field>
                  <button mat-stroked-button color="warn" type="submit"
                          [disabled]="twoFaDisableForm.invalid || twoFaLoading()">
                    @if (twoFaLoading()) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                    @else { <mat-icon>remove_moderator</mat-icon> {{ 'PROFILE.DISABLE_TWO_FA' | translate }} }
                  </button>
                </form>
              }
            } @else {
              <!-- QR Code para configurar -->
              <p class="twofa-instruction">{{ 'PROFILE.TWOFA_INSTRUCTION' | translate }}</p>

              <div class="qr-container">
                <canvas #qrCanvas class="qr-canvas"></canvas>
              </div>

              <details class="secret-details">
                <summary>{{ 'PROFILE.MANUAL_ENTRY' | translate }}</summary>
                <code class="secret-code">{{ twoFaSetup()?.secret }}</code>
              </details>

              <form [formGroup]="twoFaEnableForm" (ngSubmit)="confirmTwoFa()">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>{{ 'PROFILE.TWOFA_CODE_6' | translate }}</mat-label>
                  <mat-icon matPrefix>pin</mat-icon>
                  <input matInput formControlName="code" inputmode="numeric" maxlength="6" placeholder="000000">
                  @if (twoFaEnableForm.get('code')?.hasError('pattern')) {
                    <mat-error>{{ 'PROFILE.CODE_DIGITS_ERROR' | translate }}</mat-error>
                  }
                </mat-form-field>
                <div class="twofa-actions">
                  <button mat-stroked-button type="button" (click)="cancelTwoFaSetup()">{{ 'COMMON.CANCEL' | translate }}</button>
                  <button mat-raised-button color="primary" type="submit"
                          [disabled]="twoFaEnableForm.invalid || twoFaLoading()">
                    @if (twoFaLoading()) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                    @else { <mat-icon>check_circle</mat-icon> {{ 'PROFILE.ENABLE_TWO_FA' | translate }} }
                  </button>
                </div>
              </form>
            }
          </div>

          <!-- Código de Indicação -->
          <div class="profile-section fade-in-delay-3">
            <div class="section-header">
              <mat-icon>card_giftcard</mat-icon>
              <h2>{{ 'PROFILE.REFERRAL' | translate }}</h2>
            </div>
            <p class="referral-desc">{{ 'PROFILE.REFERRAL_DESC' | translate }}</p>
            <div class="referral-code-box">
              <span class="referral-code">{{ authService.currentUser()?.referralCode ?? '—' }}</span>
              <button mat-icon-button
                      [matTooltip]="'PROFILE.COPY_CODE' | translate"
                      (click)="copyReferralCode()"
                      [disabled]="!authService.currentUser()?.referralCode">
                <mat-icon>content_copy</mat-icon>
              </button>
            </div>
            <button mat-stroked-button class="share-btn" (click)="shareReferral()"
                    [disabled]="!authService.currentUser()?.referralCode">
              <mat-icon>share</mat-icon> {{ 'PROFILE.SHARE_REFERRAL' | translate }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* ── Page hero ── */
    .profile-page { padding-top: 64px; }

    .page-hero {
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
      padding: 40px 0 32px;
    }

    .hero-row {
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .avatar-circle {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(255,255,255,.2);
      border: 3px solid rgba(255,255,255,.5);
      color: white;
      font-size: 2rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .hero-info { display: flex; flex-direction: column; gap: 4px; }

    .page-title {
      font-size: clamp(1.4rem, 3vw, 2rem);
      font-weight: 800;
      color: white;
      margin: 0;
    }

    .page-subtitle { color: rgba(255,255,255,.75); margin: 0; font-size: 0.9rem; }

    .role-badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 20px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: .5px;
      text-transform: uppercase;
      width: fit-content;

      &.role-customer   { background: rgba(255,255,255,.2); color: rgba(255,255,255,.9); }
      &.role-organizer  { background: rgba(255,165,0,.3); color: #ffd580; }
      &.role-admin      { background: rgba(255,80,80,.3); color: #ffb3b3; }
    }

    /* ── Stats bar ── */
    .profile-content { padding: 32px 16px 48px; }

    .stats-row {
      display: flex;
      align-items: center;
      background: var(--surface);
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
      padding: 20px;
      margin-bottom: 32px;
      flex-wrap: wrap;
      gap: 12px;
    }

    .stat-item {
      flex: 1 1 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .stat-value {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--primary);
    }

    .stat-label { font-size: 0.78rem; color: var(--text-secondary); font-weight: 500; }

    .stat-divider {
      width: 1px;
      height: 40px;
      background: var(--border);
      flex-shrink: 0;
      @media (max-width: 480px) { display: none; }
    }

    /* Skeleton stats */
    .stats-skeleton {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;
    }

    .sk-stat {
      flex: 1;
      height: 72px;
      border-radius: var(--radius-sm);
    }

    /* ── Sections grid ── */
    .sections-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;

      @media (max-width: 800px) { grid-template-columns: 1fr; }

      /* 2FA e referral ocupam coluna inteira abaixo */
      .profile-section:nth-child(3),
      .profile-section:nth-child(4) {
        @media (min-width: 801px) { grid-column: span 1; }
      }
    }

    .profile-section {
      background: var(--surface);
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 10px;

      mat-icon { color: var(--primary); }

      h2 {
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0;
        color: var(--text-primary);
      }
    }

    form { display: flex; flex-direction: column; gap: 12px; }

    .full-width { width: 100%; }

    /* ── Quick links ── */
    .quick-links-title {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-secondary);
      margin: 0 0 12px;
      text-transform: uppercase;
      letter-spacing: .5px;
    }

    .quick-links { display: flex; flex-direction: column; gap: 8px; }

    .quick-link {
      justify-content: flex-start !important;
      border-radius: 8px !important;
      text-align: left;
    }

    /* ── 2FA ── */
    .twofa-status {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      border-radius: 10px;
      background: rgba(255,80,80,.08);
      border: 1px solid rgba(255,80,80,.2);
      color: var(--text-secondary);
      mat-icon { color: #e53935; margin-top: 2px; flex-shrink: 0; }
      strong { color: var(--text-primary); font-size: 0.95rem; }
      p { margin: 4px 0 0; font-size: 0.82rem; }

      &.enabled {
        background: rgba(76,175,80,.08);
        border-color: rgba(76,175,80,.25);
        mat-icon { color: #43a047; }
      }
    }

    .twofa-instruction {
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin: 0;
    }

    .qr-container {
      display: flex;
      justify-content: center;
      background: #ffffff;
      border-radius: 12px;
      padding: 16px;
      border: 1px solid var(--border);
    }

    .qr-canvas { display: block; }

    .secret-details {
      font-size: 0.82rem;
      color: var(--text-secondary);
      cursor: pointer;
    }

    .secret-code {
      display: block;
      margin-top: 8px;
      font-family: monospace;
      font-size: 0.9rem;
      background: var(--bg-secondary);
      padding: 8px 12px;
      border-radius: 6px;
      word-break: break-all;
      color: var(--primary);
    }

    .twofa-actions {
      display: flex;
      gap: 12px;
      button { flex: 1; }
    }

    /* ── Referral ── */
    .referral-desc {
      font-size: 0.88rem;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.5;
    }

    .referral-code-box {
      display: flex;
      align-items: center;
      background: var(--bg-secondary);
      border-radius: 10px;
      padding: 12px 16px;
      border: 2px dashed var(--primary);
    }

    .referral-code {
      flex: 1;
      font-size: 1.5rem;
      font-weight: 800;
      letter-spacing: 4px;
      color: var(--primary);
      font-family: monospace;
    }

    .share-btn { width: 100%; justify-content: center; }
  `]
})
export class ProfileComponent implements OnInit, AfterViewChecked {
  @ViewChild('qrCanvas') qrCanvasRef?: ElementRef<HTMLCanvasElement>;
  authService = inject(AuthService);
  private ticketService = inject(TicketService);
  private orderService = inject(OrderService);
  private loyaltyService = inject(LoyaltyService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  statsLoaded = signal(false);
  ticketCount = 0;
  orderCount = 0;
  loyaltyPoints = 0;
  totalSpent = 0;

  savingProfile = false;
  changingPassword = false;
  showCurrent = false;
  showNew = false;
  showConfirm = false;

  // 2FA
  twoFaEnabled = signal(false);
  twoFaSetup = signal<TwoFactorSetupResponse | null>(null);
  twoFaLoading = signal(false);
  private qrRendered = false;

  twoFaEnableForm = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  twoFaDisableForm = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  profileForm = this.fb.group({
    name: [this.authService.currentUser()?.name ?? '', Validators.required],
    phone: [this.authService.currentUser()?.phone ?? ''],
    cpf: ['']
  });

  passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  ngOnInit(): void {
    forkJoin({
      tickets: this.ticketService.getMyTickets(),
      orders: this.orderService.getMyOrders(),
      loyalty: this.loyaltyService.getBalance()
    }).subscribe({
      next: ({ tickets, orders, loyalty }) => {
        this.ticketCount = tickets.length;
        this.orderCount = orders.length;
        this.loyaltyPoints = loyalty.points ?? 0;
        this.totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount ?? 0), 0);
        this.statsLoaded.set(true);
      },
      error: () => this.statsLoaded.set(true)
    });

    // Carrega perfil para obter status 2FA e referralCode
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.twoFaEnabled.set(profile.twoFactorEnabled ?? false);
      }
    });
  }

  ngAfterViewChecked(): void {
    const setup = this.twoFaSetup();
    if (setup && this.qrCanvasRef && !this.qrRendered) {
      this.qrRendered = true;
      QRCode.toCanvas(this.qrCanvasRef.nativeElement, setup.qrCodeUri, { width: 200, margin: 1 });
    }
    if (!setup) this.qrRendered = false;
  }

  // ── 2FA methods ──────────────────────────────────────────────────────────

  startTwoFaSetup(): void {
    this.twoFaLoading.set(true);
    this.authService.twoFactorSetup().subscribe({
      next: (setup) => {
        this.twoFaSetup.set(setup);
        this.twoFaLoading.set(false);
      },
      error: (err) => {
        this.twoFaLoading.set(false);
        this.snackBar.open(err.error?.error || this.translate.instant('PROFILE.TWOFA_SETUP_ERROR'), 'OK', { duration: 3000, panelClass: 'error-snackbar' });
      }
    });
  }

  cancelTwoFaSetup(): void {
    this.twoFaSetup.set(null);
    this.twoFaEnableForm.reset();
  }

  confirmTwoFa(): void {
    if (this.twoFaEnableForm.invalid) return;
    this.twoFaLoading.set(true);
    this.authService.twoFactorEnable({ code: this.twoFaEnableForm.value.code! }).subscribe({
      next: () => {
        this.twoFaEnabled.set(true);
        this.twoFaSetup.set(null);
        this.twoFaEnableForm.reset();
        this.twoFaLoading.set(false);
        this.snackBar.open(this.translate.instant('PROFILE.TWOFA_ENABLED_MSG'), 'OK', { duration: 3000, panelClass: 'success-snackbar' });
      },
      error: (err) => {
        this.twoFaLoading.set(false);
        this.snackBar.open(err.error?.error || this.translate.instant('PROFILE.TWOFA_CODE_INVALID'), 'OK', { duration: 3000, panelClass: 'error-snackbar' });
      }
    });
  }

  disableTwoFa(): void {
    if (this.twoFaDisableForm.invalid) return;
    this.twoFaLoading.set(true);
    this.authService.twoFactorDisable({ code: this.twoFaDisableForm.value.code! }).subscribe({
      next: () => {
        this.twoFaEnabled.set(false);
        this.twoFaDisableForm.reset();
        this.twoFaLoading.set(false);
        this.snackBar.open(this.translate.instant('PROFILE.TWOFA_DISABLED_MSG'), 'OK', { duration: 3000, panelClass: 'success-snackbar' });
      },
      error: (err) => {
        this.twoFaLoading.set(false);
        this.snackBar.open(err.error?.error || this.translate.instant('PROFILE.TWOFA_CODE_INVALID'), 'OK', { duration: 3000, panelClass: 'error-snackbar' });
      }
    });
  }

  // ── Referral methods ─────────────────────────────────────────────────────

  copyReferralCode(): void {
    const code = this.authService.currentUser()?.referralCode;
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      this.snackBar.open(this.translate.instant('PROFILE.CODE_COPIED'), 'OK', { duration: 2000, panelClass: 'success-snackbar' });
    });
  }

  shareReferral(): void {
    const code = this.authService.currentUser()?.referralCode;
    if (!code) return;
    const url = `${window.location.origin}/register?ref=${code}`;
    if (navigator.share) {
      navigator.share({ title: this.translate.instant('PROFILE.SHARE_TITLE'), text: this.translate.instant('PROFILE.SHARE_TEXT'), url });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        this.snackBar.open(this.translate.instant('PROFILE.LINK_COPIED'), 'OK', { duration: 2000, panelClass: 'success-snackbar' });
      });
    }
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;
    this.savingProfile = true;
    const req: UpdateProfileRequest = {
      name: this.profileForm.value.name ?? undefined,
      phone: this.profileForm.value.phone ?? undefined,
      cpf: this.profileForm.value.cpf ?? undefined
    };
    this.authService.updateProfile(req).subscribe({
      next: () => {
        this.savingProfile = false;
        this.authService.getProfile().subscribe();
        this.snackBar.open(this.translate.instant('PROFILE.SAVED'), 'OK', { duration: 3000, panelClass: 'success-snackbar' });
      },
      error: () => {
        this.savingProfile = false;
        this.snackBar.open(this.translate.instant('PROFILE.SAVE_ERROR'), 'OK', { duration: 3000, panelClass: 'error-snackbar' });
      }
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return;
    this.changingPassword = true;
    const req: ChangePasswordRequest = {
      currentPassword: this.passwordForm.value.currentPassword!,
      newPassword: this.passwordForm.value.newPassword!
    };
    this.authService.changePassword(req).subscribe({
      next: () => {
        this.changingPassword = false;
        this.passwordForm.reset();
        this.snackBar.open(this.translate.instant('PROFILE.PWD_CHANGED'), 'OK', { duration: 3000, panelClass: 'success-snackbar' });
      },
      error: () => {
        this.changingPassword = false;
        this.snackBar.open(this.translate.instant('PROFILE.PWD_WRONG'), 'OK', { duration: 3000, panelClass: 'error-snackbar' });
      }
    });
  }

  getInitial(): string {
    return (this.authService.currentUser()?.name ?? 'U').charAt(0).toUpperCase();
  }

  getRoleLabel(): string {
    const role = this.authService.currentUser()?.role;
    if (role === UserRole.Admin) return this.translate.instant('PROFILE.ROLE_ADMIN');
    if (role === UserRole.Organizer) return this.translate.instant('PROFILE.ROLE_ORGANIZER');
    return this.translate.instant('PROFILE.ROLE_CUSTOMER');
  }

  getRoleClass(): string {
    const role = this.authService.currentUser()?.role;
    return role === UserRole.Admin ? 'role-admin' : role === UserRole.Organizer ? 'role-organizer' : 'role-customer';
  }

  private passwordMatchValidator(control: AbstractControl) {
    const p = control.get('newPassword')?.value;
    const c = control.get('confirmPassword')?.value;
    return p && c && p !== c ? { mismatch: true } : null;
  }
}
