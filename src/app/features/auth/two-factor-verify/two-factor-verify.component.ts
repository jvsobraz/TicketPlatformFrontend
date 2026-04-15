import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-two-factor-verify',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatButtonModule, MatCardModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatSnackBarModule
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-icon mat-card-avatar class="shield-icon">security</mat-icon>
          <mat-card-title>Verificação em 2 Etapas</mat-card-title>
          <mat-card-subtitle>Abra seu aplicativo autenticador e insira o código de 6 dígitos</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="otp-hint">
            <mat-icon>smartphone</mat-icon>
            <span>Google Authenticator · Authy · Microsoft Authenticator</span>
          </div>

          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width otp-field">
              <mat-label>Código de 6 dígitos</mat-label>
              <mat-icon matPrefix>pin</mat-icon>
              <input matInput formControlName="code"
                     inputmode="numeric" maxlength="6"
                     placeholder="000000" autocomplete="one-time-code">
              @if (form.get('code')?.hasError('required')) {
                <mat-error>Código obrigatório</mat-error>
              }
              @if (form.get('code')?.hasError('pattern')) {
                <mat-error>Apenas números (6 dígitos)</mat-error>
              }
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit"
                    class="full-width submit-btn" [disabled]="form.invalid || loading">
              @if (loading) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
              @else { <mat-icon>verified_user</mat-icon> Verificar }
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <p class="auth-link">
            <a (click)="goBack()" style="cursor:pointer">
              <mat-icon style="vertical-align:middle;font-size:16px">arrow_back</mat-icon>
              Voltar ao login
            </a>
          </p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 128px);
      padding: 32px 16px;
    }
    .auth-card { width: 100%; max-width: 420px; padding: 16px; }
    .shield-icon { font-size: 40px; width: 40px; height: 40px; color: #6200ea; }
    .otp-hint {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(98,0,234,.08);
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 20px;
      color: var(--text-secondary);
      font-size: 0.85rem;
      mat-icon { color: #6200ea; font-size: 20px; }
    }
    .otp-field input { font-size: 1.6rem; letter-spacing: 8px; font-weight: 700; }
    .submit-btn { height: 48px; font-size: 1rem; margin-top: 8px; }
    .auth-link {
      text-align: center;
      color: #757575;
      a { color: #6200ea; text-decoration: none; }
    }
  `]
})
export class TwoFactorVerifyComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  loading = false;

  form = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  ngOnInit(): void {
    // Se não há temp token, redireciona para login
    if (!this.authService.getTwoFactorTempToken()) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const tempToken = this.authService.getTwoFactorTempToken();
    if (!tempToken) { this.router.navigate(['/login']); return; }

    this.loading = true;
    this.authService.twoFactorVerify({ tempToken, code: this.form.value.code! }).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.error || 'Código inválido ou expirado', 'Fechar',
          { duration: 4000, panelClass: 'error-snackbar' });
      }
    });
  }

  goBack(): void {
    this.authService.clearTwoFactorTempToken();
    this.router.navigate(['/login']);
  }
}
