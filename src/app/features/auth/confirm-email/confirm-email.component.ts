import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatButtonModule, MatCardModule, MatIconModule,
    MatProgressSpinnerModule,
    TranslateModule
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-content>
          @if (loading) {
            <div class="center">
              <mat-progress-spinner mode="indeterminate" diameter="56" />
              <p>{{ 'AUTH.CONFIRMING_EMAIL' | translate }}</p>
            </div>
          } @else if (success) {
            <div class="center success">
              <mat-icon class="big-icon success-icon">verified</mat-icon>
              <h2>{{ 'AUTH.EMAIL_CONFIRMED' | translate }}</h2>
              <p>{{ 'AUTH.ACCOUNT_ACTIVE' | translate }}</p>
              <a mat-raised-button color="primary" routerLink="/login">{{ 'AUTH.LOGIN_LINK' | translate }}</a>
            </div>
          } @else {
            <div class="center error">
              <mat-icon class="big-icon error-icon">cancel</mat-icon>
              <h2>{{ 'AUTH.LINK_INVALID' | translate }}</h2>
              <p>{{ errorMessage }}</p>
              <a mat-raised-button color="primary" routerLink="/login">{{ 'AUTH.GO_TO_LOGIN' | translate }}</a>
            </div>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container { display: flex; justify-content: center; align-items: center; min-height: calc(100vh - 128px); padding: 32px 16px; }
    .auth-card { width: 100%; max-width: 440px; padding: 24px; }
    .center { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px; }
    .big-icon { font-size: 72px; width: 72px; height: 72px; }
    .success-icon { color: #43a047; }
    .error-icon { color: #f44336; }
    h2 { margin: 0; color: #333; }
    p { color: #666; line-height: 1.6; margin: 0; }
  `]
})
export class ConfirmEmailComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private translate = inject(TranslateService);

  loading = true;
  success = false;
  errorMessage = '';

  ngOnInit(): void {
    this.errorMessage = this.translate.instant('AUTH.EMAIL_CONFIRM_EXPIRED');
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.loading = false;
      return;
    }
    this.authService.confirmEmail(token).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.error ?? this.translate.instant('AUTH.EMAIL_CONFIRM_EXPIRED');
      }
    });
  }
}
