import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatButtonModule, MatCardModule, MatIconModule,
    MatInputModule, MatFormFieldModule,
    MatProgressSpinnerModule, MatSnackBarModule,
    TranslateModule
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-icon mat-card-avatar class="header-icon">lock_reset</mat-icon>
          <mat-card-title>{{ 'AUTH.FORGOT_TITLE' | translate }}</mat-card-title>
          <mat-card-subtitle>{{ 'AUTH.FORGOT_SUBTITLE' | translate }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          @if (!sent) {
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'AUTH.EMAIL' | translate }}</mat-label>
                <mat-icon matPrefix>email</mat-icon>
                <input matInput type="email" formControlName="email" autocomplete="email">
                @if (form.get('email')?.hasError('required') && form.get('email')?.touched) {
                  <mat-error>{{ 'AUTH.EMAIL_REQUIRED' | translate }}</mat-error>
                }
                @if (form.get('email')?.hasError('email') && form.get('email')?.touched) {
                  <mat-error>{{ 'AUTH.EMAIL_INVALID' | translate }}</mat-error>
                }
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit"
                      class="full-width submit-btn" [disabled]="loading || form.invalid">
                @if (loading) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                @else { {{ 'AUTH.SEND_LINK' | translate }} }
              </button>
            </form>
          } @else {
            <div class="success-box">
              <mat-icon class="success-icon">mark_email_read</mat-icon>
              <h3>{{ 'AUTH.FORGOT_SUCCESS_TITLE' | translate }}</h3>
              <p>{{ 'AUTH.FORGOT_SUCCESS_DESC' | translate }}</p>
            </div>
          }
        </mat-card-content>

        <mat-card-actions>
          <p class="auth-link"><a routerLink="/login">← {{ 'AUTH.BACK_TO_LOGIN' | translate }}</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container { display: flex; justify-content: center; align-items: center; min-height: calc(100vh - 128px); padding: 32px 16px; }
    .auth-card { width: 100%; max-width: 440px; padding: 16px; }
    .header-icon { font-size: 40px; width: 40px; height: 40px; color: #6200ea; }
    mat-form-field { margin-bottom: 8px; }
    .submit-btn { height: 48px; font-size: 1rem; margin-top: 8px; }
    .auth-link { text-align: center; a { color: #6200ea; text-decoration: none; } }
    .success-box { text-align: center; padding: 16px 0; }
    .success-icon { font-size: 64px; width: 64px; height: 64px; color: #43a047; }
    h3 { margin: 8px 0; color: #333; }
    p { color: #666; line-height: 1.6; }
  `]
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  loading = false;
  sent = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.authService.forgotPassword({ email: this.form.value.email! }).subscribe({
      next: () => {
        this.loading = false;
        this.sent = true;
      },
      error: () => {
        this.loading = false;
        // Always show success to prevent email enumeration
        this.sent = true;
      }
    });
  }
}
