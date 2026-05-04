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
import { TranslateService } from '@ngx-translate/core';
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
    MatDividerModule, MatStepperModule
  ],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <a mat-icon-button routerLink="/admin"><mat-icon>arrow_back</mat-icon></a>
        <h1 class="section-title">Criar Novo Evento</h1>
      </div>

      <mat-stepper [linear]="true" #stepper>
        <!-- Step 1: Event Info -->
        <mat-step [stepControl]="eventForm">
          <ng-template matStepLabel>Informações do Evento</ng-template>
          <form [formGroup]="eventForm" class="step-form">
            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Título do Evento</mat-label>
                <input matInput formControlName="title" placeholder="Ex: Show do Artista X">
                @if (eventForm.get('title')?.hasError('required')) { <mat-error>Obrigatório</mat-error> }
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Descrição</mat-label>
              <textarea matInput formControlName="description" rows="4"
                        placeholder="Descreva seu evento..."></textarea>
              @if (eventForm.get('description')?.hasError('required')) { <mat-error>Obrigatória</mat-error> }
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline" class="flex-1">
                <mat-label>Categoria</mat-label>
                <mat-select formControlName="category">
                  @for (cat of eventService.categories; track cat) {
                    <mat-option [value]="cat">{{ cat }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="flex-1">
                <mat-label>Data e Hora</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="dateTime">
                <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                @if (eventForm.get('dateTime')?.hasError('required')) { <mat-error>Obrigatória</mat-error> }
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>URL da Imagem (opcional)</mat-label>
              <mat-icon matPrefix>image</mat-icon>
              <input matInput formControlName="imageUrl" placeholder="https://...">
            </mat-form-field>

            <h3>Local do Evento</h3>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nome do Local</mat-label>
              <mat-icon matPrefix>location_on</mat-icon>
              <input matInput formControlName="venue" placeholder="Ex: Allianz Parque">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Endereço Completo</mat-label>
              <input matInput formControlName="address">
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline" class="flex-1">
                <mat-label>Cidade</mat-label>
                <input matInput formControlName="city">
              </mat-form-field>
              <mat-form-field appearance="outline" style="width:100px">
                <mat-label>Estado</mat-label>
                <mat-select formControlName="state">
                  @for (s of eventService.brazilianStates; track s) {
                    <mat-option [value]="s">{{ s }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
            </div>

            <div class="step-actions">
              <button mat-raised-button color="primary" matStepperNext [disabled]="eventForm.invalid">
                Próximo <mat-icon>arrow_forward</mat-icon>
              </button>
            </div>
          </form>
        </mat-step>

        <!-- Step 2: Ticket Types -->
        <mat-step [stepControl]="ticketsArray">
          <ng-template matStepLabel>Tipos de Ingresso</ng-template>
          <div class="step-form">
            <form [formGroup]="fullForm">
              <div formArrayName="ticketTypes">
                @for (tt of ticketsArray.controls; track tt; let i = $index) {
                  <mat-card class="ticket-type-card">
                    <mat-card-header>
                      <mat-card-title>Ingresso {{ i + 1 }}</mat-card-title>
                      @if (ticketsArray.length > 1) {
                        <button mat-icon-button color="warn" type="button" (click)="removeTicketType(i)">
                          <mat-icon>delete</mat-icon>
                        </button>
                      }
                    </mat-card-header>
                    <mat-card-content [formGroupName]="i">
                      <div class="form-row">
                        <mat-form-field appearance="outline" class="flex-1">
                          <mat-label>Nome</mat-label>
                          <input matInput formControlName="name" placeholder="Ex: Inteira, Meia-entrada...">
                        </mat-form-field>
                        <mat-form-field appearance="outline" style="width:150px">
                          <mat-label>Preço (R$)</mat-label>
                          <input matInput type="number" formControlName="price" min="0">
                        </mat-form-field>
                        <mat-form-field appearance="outline" style="width:150px">
                          <mat-label>Quantidade</mat-label>
                          <input matInput type="number" formControlName="quantityTotal" min="1">
                        </mat-form-field>
                      </div>
                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>Descrição (opcional)</mat-label>
                        <input matInput formControlName="description">
                      </mat-form-field>
                    </mat-card-content>
                  </mat-card>
                }
              </div>
            </form>

            <button mat-stroked-button type="button" (click)="addTicketType()">
              <mat-icon>add</mat-icon> Adicionar Tipo de Ingresso
            </button>

            <div class="step-actions">
              <button mat-button matStepperPrevious>Voltar</button>
              <button mat-raised-button color="primary" type="button" (click)="createEvent()" [disabled]="loading">
                @if (loading) { <mat-progress-spinner diameter="20" mode="indeterminate" /> }
                @else { <mat-icon>check</mat-icon> Criar Evento }
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
