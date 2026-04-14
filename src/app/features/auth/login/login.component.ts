import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatButtonModule, MatCardModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatSnackBarModule
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-icon mat-card-avatar style="font-size:40px;width:40px;height:40px;color:#6200ea">confirmation_number</mat-icon>
          <mat-card-title>Entrar</mat-card-title>
          <mat-card-subtitle>Acesse sua conta Tickly</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>E-mail</mat-label>
              <mat-icon matPrefix>email</mat-icon>
              <input matInput type="email" formControlName="email" autocomplete="email">
              @if (form.get('email')?.hasError('required')) {
                <mat-error>E-mail é obrigatório</mat-error>
              }
              @if (form.get('email')?.hasError('email')) {
                <mat-error>E-mail inválido</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Senha</mat-label>
              <mat-icon matPrefix>lock</mat-icon>
              <input matInput [type]="hidePassword ? 'password' : 'text'"
                     formControlName="password" autocomplete="current-password">
              <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                <mat-icon>{{ hidePassword ? 'visibility' : 'visibility_off' }}</mat-icon>
              </button>
              @if (form.get('password')?.hasError('required')) {
                <mat-error>Senha é obrigatória</mat-error>
              }
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit"
                    class="full-width submit-btn" [disabled]="loading">
              @if (loading) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
              @else { Entrar }
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <p class="auth-link forgot"><a routerLink="/forgot-password">Esqueceu sua senha?</a></p>
          <p class="auth-link">Não tem conta? <a routerLink="/register">Cadastre-se grátis</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container { display: flex; justify-content: center; align-items: center; min-height: calc(100vh - 128px); padding: 32px 16px; }
    .auth-card { width: 100%; max-width: 420px; padding: 16px; }
    mat-form-field { margin-bottom: 8px; }
    .submit-btn { height: 48px; font-size: 1rem; margin-top: 8px; }
    .auth-link { text-align: center; color: #757575; a { color: #6200ea; text-decoration: none; } }
    .forgot { margin-bottom: 0; }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  loading = false;
  hidePassword = true;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.authService.login(this.form.value as any).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.error || 'Erro ao fazer login', 'Fechar',
          { duration: 4000, panelClass: 'error-snackbar' });
      }
    });
  }
}
