import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { EventService } from '../../../core/services/event.service';
import { CreateEventRequest, CreateTicketTypeRequest } from '../../../core/models';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatButtonModule, MatCardModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule,
    MatProgressSpinnerModule, MatSnackBarModule,
    MatDividerModule, MatStepperModule, TranslateModule
  ],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <a mat-icon-button routerLink="/admin"><mat-icon>arrow_back</mat-icon></a>
        <h1 class="section-title">{{ 'CREATE_EVENT.PAGE_TITLE' | translate }}</h1>
      </div>

      <mat-stepper [linear]="true" #stepper>
        <!-- Step 1: Event Info -->
        <mat-step [stepControl]="eventForm">
          <ng-template matStepLabel>{{ 'CREATE_EVENT.STEP1_LABEL' | translate }}</ng-template>
          <form [formGroup]="eventForm" class="step-form">
            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ 'CREATE_EVENT.TITLE_LABEL' | translate }}</mat-label>
                <input matInput formControlName="title" [placeholder]="'CREATE_EVENT.TITLE_PLACEHOLDER' | translate">
                @if (eventForm.get('title')?.hasError('required')) { <mat-error>{{ 'COMMON.REQUIRED' | translate }}</mat-error> }
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ 'CREATE_EVENT.DESCRIPTION_LABEL' | translate }}</mat-label>
              <textarea matInput formControlName="description" rows="4"
                        [placeholder]="'CREATE_EVENT.DESCRIPTION_PLACEHOLDER' | translate"></textarea>
              @if (eventForm.get('description')?.hasError('required')) { <mat-error>{{ 'COMMON.REQUIRED' | translate }}</mat-error> }
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline" class="flex-1">
                <mat-label>{{ 'CREATE_EVENT.CATEGORY_LABEL' | translate }}</mat-label>
                <mat-select formControlName="category">
                  @for (cat of eventService.categories; track cat) {
                    <mat-option [value]="cat">{{ cat }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="flex-1">
                <mat-label>{{ 'CREATE_EVENT.DATE_TIME_LABEL' | translate }}</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="dateTime">
                <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                @if (eventForm.get('dateTime')?.hasError('required')) { <mat-error>{{ 'COMMON.REQUIRED' | translate }}</mat-error> }
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ 'CREATE_EVENT.IMAGE_URL_LABEL' | translate }}</mat-label>
              <mat-icon matPrefix>image</mat-icon>
              <input matInput formControlName="imageUrl" placeholder="https://...">
            </mat-form-field>

            <h3>{{ 'CREATE_EVENT.VENUE_SECTION' | translate }}</h3>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ 'CREATE_EVENT.VENUE_LABEL' | translate }}</mat-label>
              <mat-icon matPrefix>location_on</mat-icon>
              <input matInput formControlName="venue" [placeholder]="'CREATE_EVENT.VENUE_PLACEHOLDER' | translate">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ 'CREATE_EVENT.ADDRESS_LABEL' | translate }}</mat-label>
              <input matInput formControlName="address">
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline" class="flex-1">
                <mat-label>{{ 'CREATE_EVENT.CITY_LABEL' | translate }}</mat-label>
                <input matInput formControlName="city">
              </mat-form-field>
              <mat-form-field appearance="outline" style="width:100px">
                <mat-label>{{ 'CREATE_EVENT.STATE_LABEL' | translate }}</mat-label>
                <mat-select formControlName="state">
                  @for (s of eventService.brazilianStates; track s) {
                    <mat-option [value]="s">{{ s }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
            </div>

            <div class="step-actions">
              <button mat-raised-button color="primary" matStepperNext [disabled]="eventForm.invalid">
                {{ 'COMMON.NEXT' | translate }} <mat-icon>arrow_forward</mat-icon>
              </button>
            </div>
          </form>
        </mat-step>

        <!-- Step 2: Ticket Types -->
        <mat-step [stepControl]="ticketsArray">
          <ng-template matStepLabel>{{ 'CREATE_EVENT.STEP2_LABEL' | translate }}</ng-template>
          <div class="step-form">
            <form [formGroup]="fullForm">
              <div formArrayName="ticketTypes">
                @for (tt of ticketsArray.controls; track tt; let i = $index) {
                  <mat-card class="ticket-type-card">
                    <mat-card-header>
                      <mat-card-title>{{ 'CREATE_EVENT.TICKET_N' | translate }} {{ i + 1 }}</mat-card-title>
                      @if (ticketsArray.length > 1) {
                        <button mat-icon-button color="warn" type="button" (click)="removeTicketType(i)">
                          <mat-icon>delete</mat-icon>
                        </button>
                      }
                    </mat-card-header>
                    <mat-card-content [formGroupName]="i">
                      <div class="form-row">
                        <mat-form-field appearance="outline" class="flex-1">
                          <mat-label>{{ 'CREATE_EVENT.TT_NAME_LABEL' | translate }}</mat-label>
                          <input matInput formControlName="name" [placeholder]="'CREATE_EVENT.TT_NAME_PLACEHOLDER' | translate">
                        </mat-form-field>
                        <mat-form-field appearance="outline" style="width:150px">
                          <mat-label>{{ 'CREATE_EVENT.PRICE_LABEL' | translate }}</mat-label>
                          <input matInput type="number" formControlName="price" min="0">
                        </mat-form-field>
                        <mat-form-field appearance="outline" style="width:150px">
                          <mat-label>{{ 'CREATE_EVENT.QUANTITY_LABEL' | translate }}</mat-label>
                          <input matInput type="number" formControlName="quantityTotal" min="1">
                        </mat-form-field>
                      </div>
                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>{{ 'CREATE_EVENT.TT_DESCRIPTION_LABEL' | translate }}</mat-label>
                        <input matInput formControlName="description">
                      </mat-form-field>
                    </mat-card-content>
                  </mat-card>
                }
              </div>
            </form>

            <button mat-stroked-button type="button" (click)="addTicketType()">
              <mat-icon>add</mat-icon> {{ 'CREATE_EVENT.ADD_TICKET_TYPE' | translate }}
            </button>

            <div class="step-actions">
              <button mat-button matStepperPrevious>{{ 'COMMON.BACK' | translate }}</button>
              <button mat-raised-button color="primary" type="button" (click)="createEvent()" [disabled]="loading">
                @if (loading) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                @else { <mat-icon>check</mat-icon> {{ 'CREATE_EVENT.CREATE_BTN' | translate }} }
              </button>
            </div>
          </div>
        </mat-step>
      </mat-stepper>
    </div>
  `,
  styles: [`
    .page-container { padding: 32px 16px; max-width: 800px; }
    .page-header { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
    .step-form { padding: 24px 0; }
    .form-row { display: flex; gap: 16px; @media (max-width: 600px) { flex-direction: column; } }
    .flex-1 { flex: 1; }
    .ticket-type-card { margin-bottom: 16px; mat-card-header { display: flex; justify-content: space-between; align-items: center; } }
    .step-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 24px; }
  `]
})
export class CreateEventComponent {
  eventService = inject(EventService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  loading = false;

  eventForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    venue: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    dateTime: [null, Validators.required],
    imageUrl: [''],
    category: ['']
  });

  fullForm = this.fb.group({
    ticketTypes: this.fb.array([this.createTicketTypeForm()])
  });

  get ticketsArray(): FormArray {
    return this.fullForm.get('ticketTypes') as FormArray;
  }

  createTicketTypeForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      quantityTotal: [100, [Validators.required, Validators.min(1)]]
    });
  }

  addTicketType(): void {
    this.ticketsArray.push(this.createTicketTypeForm());
  }

  removeTicketType(index: number): void {
    this.ticketsArray.removeAt(index);
  }

  createEvent(): void {
    if (this.eventForm.invalid || this.ticketsArray.invalid) return;

    const eventData = this.eventForm.value;
    const ticketTypes: CreateTicketTypeRequest[] = this.ticketsArray.value;

    const request: CreateEventRequest = {
      title: eventData.title!,
      description: eventData.description!,
      venue: eventData.venue!,
      address: eventData.address!,
      city: eventData.city!,
      state: eventData.state!,
      dateTime: new Date(eventData.dateTime!).toISOString(),
      imageUrl: eventData.imageUrl || undefined,
      category: eventData.category || undefined,
      ticketTypes
    };

    this.loading = true;
    this.eventService.createEvent(request).subscribe({
      next: (event) => {
        this.snackBar.open(this.translate.instant('ADMIN.EVENT_CREATED'), 'OK', { duration: 3000, panelClass: 'success-snackbar' });
        this.router.navigate(['/events', event.id]);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.error || this.translate.instant('ADMIN.CREATE_EVENT_ERROR'), 'Fechar', { duration: 4000, panelClass: 'error-snackbar' });
      }
    });
  }
}
