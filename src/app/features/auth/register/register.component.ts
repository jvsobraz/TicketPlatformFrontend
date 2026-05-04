import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models';

function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const v = control.value ?? '';
  if (!v) return null;
  const rules = [
    v.length >= 8,
    /[A-Z]/.test(v),
    /[a-z]/.test(v),
    /[0-9]/.test(v),
    /[^A-Za-z0-9]/.test(v)
  ];
  const passed = rules.filter(Boolean).length;
  return passed < 5 ? { weakPassword: true } : null;
}

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const pw = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pw && confirm && pw !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatButtonModule, MatCardModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatSelectModule,
    MatProgressSpinnerModule, MatSnackBarModule,
    MatCheckboxModule, MatTooltipModule,
    TranslateModule
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-icon mat-card-avatar class="header-icon">person_add</mat-icon>
          <mat-card-title>{{ 'AUTH.REGISTER_TITLE' | translate }}</mat-card-title>
          <mat-card-subtitle>{{ 'AUTH.REGISTER_SUBTITLE' | translate }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ 'AUTH.FULL_NAME' | translate }}</mat-label>
              <mat-icon matPrefix>person</mat-icon>
              <input matInput formControlName="name" autocomplete="name">
              @if (form.get('name')?.hasError('required') && form.get('name')?.touched) {
                <mat-error>{{ 'AUTH.NAME_REQUIRED' | translate }}</mat-error>
              }
            </mat-form-field>

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

            <!-- Password -->
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ 'AUTH.PASSWORD' | translate }}</mat-label>
              <mat-icon matPrefix>lock</mat-icon>
              <input matInput [type]="hidePassword ? 'password' : 'text'"
                     formControlName="password" autocomplete="new-password">
              <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword"
                      [matTooltip]="(hidePassword ? 'AUTH.SHOW_PASSWORD' : 'AUTH.HIDE_PASSWORD') | translate">
                <mat-icon>{{ hidePassword ? 'visibility' : 'visibility_off' }}</mat-icon>
              </button>
              @if (form.get('password')?.hasError('required') && form.get('password')?.touched) {
                <mat-error>{{ 'AUTH.PASSWORD_REQUIRED' | translate }}</mat-error>
              }
            </mat-form-field>

            <!-- Password strength indicator -->
            @if (form.get('password')?.value) {
              <div class="strength-box">
                <div class="strength-bar">
                  @for (i of [0,1,2,3,4]; track i) {
                    <div class="strength-segment" [class]="getSegmentClass(i)"></div>
                  }
                </div>
                <span class="strength-label" [class]="'strength-' + strengthLevel">{{ strengthLabel | translate }}</span>
                <div class="strength-rules">
                  <span [class.rule-ok]="hasMinLength">{{ hasMinLength ? '✓' : '○' }} {{ 'AUTH.RULE_8CHARS' | translate }}</span>
                  <span [class.rule-ok]="hasUpper">{{ hasUpper ? '✓' : '○' }} {{ 'AUTH.RULE_UPPER' | translate }}</span>
                  <span [class.rule-ok]="hasLower">{{ hasLower ? '✓' : '○' }} {{ 'AUTH.RULE_LOWER' | translate }}</span>
                  <span [class.rule-ok]="hasNumber">{{ hasNumber ? '✓' : '○' }} {{ 'AUTH.RULE_NUMBER' | translate }}</span>
                  <span [class.rule-ok]="hasSpecial">{{ hasSpecial ? '✓' : '○' }} {{ 'AUTH.RULE_SPECIAL' | translate }}</span>
                </div>
              </div>
            }

            <!-- Confirm password -->
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ 'AUTH.CONFIRM_PASSWORD' | translate }}</mat-label>
              <mat-icon matPrefix>lock_outline</mat-icon>
              <input matInput [type]="hideConfirm ? 'password' : 'text'"
                     formControlName="confirmPassword" autocomplete="new-password">
              <button mat-icon-button matSuffix type="button" (click)="hideConfirm = !hideConfirm">
                <mat-icon>{{ hideConfirm ? 'visibility' : 'visibility_off' }}</mat-icon>
              </button>
              @if (form.hasError('passwordMismatch') && form.get('confirmPassword')?.touched) {
                <mat-error>{{ 'AUTH.PASSWORDS_MISMATCH' | translate }}</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ 'AUTH.PHONE' | translate }}</mat-label>
              <mat-icon matPrefix>phone</mat-icon>
              <input matInput formControlName="phone" placeholder="(11) 99999-9999"
                     autocomplete="tel">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ 'AUTH.ACCOUNT_TYPE' | translate }}</mat-label>
              <mat-select formControlName="role">
                <mat-option [value]="UserRole.Customer">{{ 'AUTH.BUYER' | translate }}</mat-option>
                <mat-option [value]="UserRole.Organizer">{{ 'AUTH.ORGANIZER' | translate }}</mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Terms -->
            <div class="terms-box">
              <mat-checkbox formControlName="acceptedTerms" color="primary">
                {{ 'AUTH.TERMS' | translate }} <a href="/terms" target="_blank">{{ 'AUTH.TERMS_LINK' | translate }}</a>
                {{ 'AUTH.AND' | translate }} <a href="/privacy" target="_blank">{{ 'AUTH.PRIVACY_LINK' | translate }}</a> (LGPD)
              </mat-checkbox>
              @if (form.get('acceptedTerms')?.hasError('required') && form.get('acceptedTerms')?.touched) {
                <p class="terms-error">{{ 'AUTH.TERMS_REQUIRED' | translate }}</p>
              }
            </div>

            <button mat-raised-button color="primary" type="submit"
                    class="full-width submit-btn" [disabled]="loading || form.invalid">
              @if (loading) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
              @else { {{ 'AUTH.REGISTER_BTN' | translate }} }
            </button>

          </form>
        </mat-card-content>

        <mat-card-actions>
          <p class="auth-link">{{ 'AUTH.HAS_ACCOUNT' | translate }} <a routerLink="/login">{{ 'AUTH.LOGIN_BTN' | translate }}</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex; justify-content: center; align-items: flex-start;
      min-height: calc(100vh - 128px); padding: 32px 16px;
    }
    .auth-card { width: 100%; max-width: 500px; padding: 16px; }
    .header-icon { font-size: 40px; width: 40px; height: 40px; color: #6200ea; }
    mat-form-field { margin-bottom: 4px; }
    .submit-btn { height: 48px; font-size: 1rem; margin-top: 8px; }
    .auth-link { text-align: center; color: #757575; a { color: #6200ea; } }

    .strength-box {
      margin: -4px 0 12px;
      padding: 10px 12px;
      background: #f9f6ff;
      border-radius: 8px;
      border: 1px solid #e0d7f9;
    }
    .strength-bar {
      display: flex; gap: 4px; margin-bottom: 6px;
    }
    .strength-segment {
      flex: 1; height: 4px; border-radius: 2px; background: #e0e0e0;
      transition: background 0.2s;
      &.seg-weak { background: #f44336; }
      &.seg-fair { background: #ff9800; }
      &.seg-good { background: #ffc107; }
      &.seg-strong { background: #4caf50; }
    }
    .strength-label {
      font-size: 0.75rem; font-weight: 600;
      &.strength-0, &.strength-1 { color: #f44336; }
      &.strength-2 { color: #ff9800; }
      &.strength-3 { color: #ffc107; }
      &.strength-4, &.strength-5 { color: #4caf50; }
    }
    .strength-rules {
      display: flex; flex-wrap: wrap; gap: 4px 12px; margin-top: 6px;
      span { font-size: 0.72rem; color: #9e9e9e; transition: color 0.2s; }
      .rule-ok { color: #4caf50; font-weight: 500; }
    }

    .terms-box {
      margin: 8px 0 12px;
      a { color: #6200ea; text-decoration: none; &:hover { text-decoration: underline; } }
    }
    .terms-error { font-size: 0.75rem; color: #f44336; margin: 2px 0 0 32px; }
  `]
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);

  loading = false;
  hidePassword = true;
  hideConfirm = true;
  UserRole = UserRole;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordStrengthValidator]],
    confirmPassword: ['', Validators.required],
    phone: [''],
    role: [UserRole.Customer],
    acceptedTerms: [false, Validators.requiredTrue]
  }, { validators: passwordMatchValidator });

  // Password strength helpers
  get pw(): string { return this.form.get('password')?.value ?? ''; }
  get hasMinLength(): boolean { return this.pw.length >= 8; }
  get hasUpper(): boolean { return /[A-Z]/.test(this.pw); }
  get hasLower(): boolean { return /[a-z]/.test(this.pw); }
  get hasNumber(): boolean { return /[0-9]/.test(this.pw); }
  get hasSpecial(): boolean { return /[^A-Za-z0-9]/.test(this.pw); }

  get strengthLevel(): number {
    return [this.hasMinLength, this.hasUpper, this.hasLower, this.hasNumber, this.hasSpecial]
      .filter(Boolean).length;
  }

  get strengthLabel(): string {
    const labels = ['', 'AUTH.STRENGTH_VERY_WEAK', 'AUTH.STRENGTH_WEAK', 'AUTH.STRENGTH_FAIR', 'AUTH.STRENGTH_GOOD', 'AUTH.STRENGTH_STRONG'];
    return labels[this.strengthLevel] ?? '';
  }

  getSegmentClass(index: number): string {
    if (index >= this.strengthLevel) return '';
    if (this.strengthLevel <= 1) return 'seg-weak';
    if (this.strengthLevel === 2) return 'seg-fair';
    if (this.strengthLevel === 3) return 'seg-good';
    return 'seg-strong';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;

    const { name, email, password, phone, role } = this.form.value;
    this.authService.register({ name: name!, email: email!, password: password!, phone: phone || undefined, role: role! }).subscribe({
      next: () => {
        this.snackBar.open(
          this.translate.instant('AUTH.REGISTER_SUCCESS'),
          'OK',
          { duration: 6000, panelClass: 'success-snackbar' }
        );
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.error || this.translate.instant('AUTH.REGISTER_ERROR'), 'Fechar',
          { duration: 5000, panelClass: 'error-snackbar' });
      }
    });
  }
}
