import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-56M5PYDB.js";
import {
  EventService
} from "./chunk-VFNTAZYT.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-GKWELAUI.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-R3FRS4NQ.js";
import {
  DefaultValueAccessor,
  FormArrayName,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix,
  MatSuffix,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-6E6SU7EL.js";
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperModule,
  MatStepperNext,
  MatStepperPrevious
} from "./chunk-COIGGKBO.js";
import {
  MatDividerModule
} from "./chunk-SM6YJ4BC.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-WFDIMCN2.js";
import "./chunk-S33CHFYN.js";
import "./chunk-UMZOVFGQ.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle,
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-REL6T6N6.js";
import {
  Router,
  RouterLink
} from "./chunk-7BHVX7AP.js";
import {
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconAnchor,
  MatIconButton,
  MatIconModule,
  MatNativeDateModule,
  MatOption
} from "./chunk-FV6QPV75.js";
import "./chunk-GYYVMIU3.js";
import {
  CommonModule,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-PY3RLCY5.js";

// src/app/features/admin/create-event/create-event.component.ts
function CreateEventComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, "Informa\xE7\xF5es do Evento");
  }
}
function CreateEventComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Obrigat\xF3rio");
    \u0275\u0275elementEnd();
  }
}
function CreateEventComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Obrigat\xF3ria");
    \u0275\u0275elementEnd();
  }
}
function CreateEventComponent_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    \u0275\u0275property("value", cat_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r2);
  }
}
function CreateEventComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Obrigat\xF3ria");
    \u0275\u0275elementEnd();
  }
}
function CreateEventComponent_For_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r3 = ctx.$implicit;
    \u0275\u0275property("value", s_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r3);
  }
}
function CreateEventComponent_ng_template_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, "Tipos de Ingresso");
  }
}
function CreateEventComponent_For_77_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function CreateEventComponent_For_77_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const i_r5 = \u0275\u0275nextContext().$index;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.removeTicketType(i_r5));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd()();
  }
}
function CreateEventComponent_For_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 30)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, CreateEventComponent_For_77_Conditional_4_Template, 3, 0, "button", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-card-content", 36)(6, "div", 10)(7, "mat-form-field", 14)(8, "mat-label");
    \u0275\u0275text(9, "Nome");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-form-field", 38)(12, "mat-label");
    \u0275\u0275text(13, "Pre\xE7o (R$)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "input", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-form-field", 38)(16, "mat-label");
    \u0275\u0275text(17, "Quantidade");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "input", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "mat-form-field", 11)(20, "mat-label");
    \u0275\u0275text(21, "Descri\xE7\xE3o (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "input", 41);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const i_r5 = ctx.$index;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Ingresso ", i_r5 + 1, "");
    \u0275\u0275advance();
    \u0275\u0275conditional(4, ctx_r5.ticketsArray.length > 1 ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroupName", i_r5);
  }
}
function CreateEventComponent_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 34);
  }
}
function CreateEventComponent_Conditional_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Criar Evento ");
  }
}
var CreateEventComponent = class _CreateEventComponent {
  constructor() {
    this.eventService = inject(EventService);
    this.fb = inject(FormBuilder);
    this.router = inject(Router);
    this.snackBar = inject(MatSnackBar);
    this.loading = false;
    this.eventForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      venue: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      dateTime: [null, Validators.required],
      imageUrl: [""],
      category: [""]
    });
    this.fullForm = this.fb.group({
      ticketTypes: this.fb.array([this.createTicketTypeForm()])
    });
  }
  get ticketsArray() {
    return this.fullForm.get("ticketTypes");
  }
  createTicketTypeForm() {
    return this.fb.group({
      name: ["", Validators.required],
      description: [""],
      price: [0, [Validators.required, Validators.min(0)]],
      quantityTotal: [100, [Validators.required, Validators.min(1)]]
    });
  }
  addTicketType() {
    this.ticketsArray.push(this.createTicketTypeForm());
  }
  removeTicketType(index) {
    this.ticketsArray.removeAt(index);
  }
  createEvent() {
    if (this.eventForm.invalid || this.ticketsArray.invalid)
      return;
    const eventData = this.eventForm.value;
    const ticketTypes = this.ticketsArray.value;
    const request = {
      title: eventData.title,
      description: eventData.description,
      venue: eventData.venue,
      address: eventData.address,
      city: eventData.city,
      state: eventData.state,
      dateTime: new Date(eventData.dateTime).toISOString(),
      imageUrl: eventData.imageUrl || void 0,
      category: eventData.category || void 0,
      ticketTypes
    };
    this.loading = true;
    this.eventService.createEvent(request).subscribe({
      next: (event) => {
        this.snackBar.open("Evento criado com sucesso!", "OK", { duration: 3e3, panelClass: "success-snackbar" });
        this.router.navigate(["/events", event.id]);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.error || "Erro ao criar evento", "Fechar", { duration: 4e3, panelClass: "error-snackbar" });
      }
    });
  }
  static {
    this.\u0275fac = function CreateEventComponent_Factory(t) {
      return new (t || _CreateEventComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateEventComponent, selectors: [["app-create-event"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 88, vars: 13, consts: [["stepper", ""], ["picker", ""], [1, "container", "page-container"], [1, "page-header"], ["mat-icon-button", "", "routerLink", "/admin"], [1, "section-title"], [3, "linear"], [3, "stepControl"], ["matStepLabel", ""], [1, "step-form", 3, "formGroup"], [1, "form-row"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "title", "placeholder", "Ex: Show do Artista X"], ["matInput", "", "formControlName", "description", "rows", "4", "placeholder", "Descreva seu evento..."], ["appearance", "outline", 1, "flex-1"], ["formControlName", "category"], [3, "value"], ["matInput", "", "formControlName", "dateTime", 3, "matDatepicker"], ["matIconSuffix", "", 3, "for"], ["matPrefix", ""], ["matInput", "", "formControlName", "imageUrl", "placeholder", "https://..."], ["matInput", "", "formControlName", "venue", "placeholder", "Ex: Allianz Parque"], ["matInput", "", "formControlName", "address"], ["matInput", "", "formControlName", "city"], ["appearance", "outline", 2, "width", "100px"], ["formControlName", "state"], [1, "step-actions"], ["mat-raised-button", "", "color", "primary", "matStepperNext", "", 3, "disabled"], [1, "step-form"], ["formArrayName", "ticketTypes", 3, "formGroup"], [1, "ticket-type-card"], ["mat-stroked-button", "", 3, "click"], ["mat-button", "", "matStepperPrevious", ""], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "20", "mode", "indeterminate"], ["mat-icon-button", "", "color", "warn"], [3, "formGroupName"], ["matInput", "", "formControlName", "name", "placeholder", "Ex: Inteira, Meia-entrada..."], ["appearance", "outline", 2, "width", "150px"], ["matInput", "", "type", "number", "formControlName", "price", "min", "0"], ["matInput", "", "type", "number", "formControlName", "quantityTotal", "min", "1"], ["matInput", "", "formControlName", "description"], ["mat-icon-button", "", "color", "warn", 3, "click"]], template: function CreateEventComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "a", 4)(3, "mat-icon");
        \u0275\u0275text(4, "arrow_back");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(5, "h1", 5);
        \u0275\u0275text(6, "Criar Novo Evento");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "mat-stepper", 6, 0)(9, "mat-step", 7);
        \u0275\u0275template(10, CreateEventComponent_ng_template_10_Template, 1, 0, "ng-template", 8);
        \u0275\u0275elementStart(11, "form", 9)(12, "div", 10)(13, "mat-form-field", 11)(14, "mat-label");
        \u0275\u0275text(15, "T\xEDtulo do Evento");
        \u0275\u0275elementEnd();
        \u0275\u0275element(16, "input", 12);
        \u0275\u0275template(17, CreateEventComponent_Conditional_17_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "mat-form-field", 11)(19, "mat-label");
        \u0275\u0275text(20, "Descri\xE7\xE3o");
        \u0275\u0275elementEnd();
        \u0275\u0275element(21, "textarea", 13);
        \u0275\u0275template(22, CreateEventComponent_Conditional_22_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "div", 10)(24, "mat-form-field", 14)(25, "mat-label");
        \u0275\u0275text(26, "Categoria");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "mat-select", 15);
        \u0275\u0275repeaterCreate(28, CreateEventComponent_For_29_Template, 2, 2, "mat-option", 16, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "mat-form-field", 14)(31, "mat-label");
        \u0275\u0275text(32, "Data e Hora");
        \u0275\u0275elementEnd();
        \u0275\u0275element(33, "input", 17)(34, "mat-datepicker-toggle", 18)(35, "mat-datepicker", null, 1);
        \u0275\u0275template(37, CreateEventComponent_Conditional_37_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "mat-form-field", 11)(39, "mat-label");
        \u0275\u0275text(40, "URL da Imagem (opcional)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "mat-icon", 19);
        \u0275\u0275text(42, "image");
        \u0275\u0275elementEnd();
        \u0275\u0275element(43, "input", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "h3");
        \u0275\u0275text(45, "Local do Evento");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "mat-form-field", 11)(47, "mat-label");
        \u0275\u0275text(48, "Nome do Local");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "mat-icon", 19);
        \u0275\u0275text(50, "location_on");
        \u0275\u0275elementEnd();
        \u0275\u0275element(51, "input", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "mat-form-field", 11)(53, "mat-label");
        \u0275\u0275text(54, "Endere\xE7o Completo");
        \u0275\u0275elementEnd();
        \u0275\u0275element(55, "input", 22);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "div", 10)(57, "mat-form-field", 14)(58, "mat-label");
        \u0275\u0275text(59, "Cidade");
        \u0275\u0275elementEnd();
        \u0275\u0275element(60, "input", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "mat-form-field", 24)(62, "mat-label");
        \u0275\u0275text(63, "Estado");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "mat-select", 25);
        \u0275\u0275repeaterCreate(65, CreateEventComponent_For_66_Template, 2, 2, "mat-option", 16, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(67, "div", 26)(68, "button", 27);
        \u0275\u0275text(69, " Pr\xF3ximo ");
        \u0275\u0275elementStart(70, "mat-icon");
        \u0275\u0275text(71, "arrow_forward");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(72, "mat-step", 7);
        \u0275\u0275template(73, CreateEventComponent_ng_template_73_Template, 1, 0, "ng-template", 8);
        \u0275\u0275elementStart(74, "div", 28)(75, "div", 29);
        \u0275\u0275repeaterCreate(76, CreateEventComponent_For_77_Template, 23, 3, "mat-card", 30, \u0275\u0275repeaterTrackByIndex);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(78, "button", 31);
        \u0275\u0275listener("click", function CreateEventComponent_Template_button_click_78_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.addTicketType());
        });
        \u0275\u0275elementStart(79, "mat-icon");
        \u0275\u0275text(80, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(81, " Adicionar Tipo de Ingresso ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(82, "div", 26)(83, "button", 32);
        \u0275\u0275text(84, "Voltar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(85, "button", 33);
        \u0275\u0275listener("click", function CreateEventComponent_Template_button_click_85_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.createEvent());
        });
        \u0275\u0275template(86, CreateEventComponent_Conditional_86_Template, 1, 0, "mat-progress-spinner", 34)(87, CreateEventComponent_Conditional_87_Template, 3, 0);
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        let tmp_5_0;
        let tmp_6_0;
        let tmp_10_0;
        const picker_r7 = \u0275\u0275reference(36);
        \u0275\u0275advance(7);
        \u0275\u0275property("linear", true);
        \u0275\u0275advance(2);
        \u0275\u0275property("stepControl", ctx.eventForm);
        \u0275\u0275advance(2);
        \u0275\u0275property("formGroup", ctx.eventForm);
        \u0275\u0275advance(6);
        \u0275\u0275conditional(17, ((tmp_5_0 = ctx.eventForm.get("title")) == null ? null : tmp_5_0.hasError("required")) ? 17 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(22, ((tmp_6_0 = ctx.eventForm.get("description")) == null ? null : tmp_6_0.hasError("required")) ? 22 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275repeater(ctx.eventService.categories);
        \u0275\u0275advance(5);
        \u0275\u0275property("matDatepicker", picker_r7);
        \u0275\u0275advance();
        \u0275\u0275property("for", picker_r7);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(37, ((tmp_10_0 = ctx.eventForm.get("dateTime")) == null ? null : tmp_10_0.hasError("required")) ? 37 : -1);
        \u0275\u0275advance(28);
        \u0275\u0275repeater(ctx.eventService.brazilianStates);
        \u0275\u0275advance(3);
        \u0275\u0275property("disabled", ctx.eventForm.invalid);
        \u0275\u0275advance(4);
        \u0275\u0275property("stepControl", ctx.ticketsArray);
        \u0275\u0275advance(3);
        \u0275\u0275property("formGroup", ctx.fullForm);
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.ticketsArray.controls);
        \u0275\u0275advance(9);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275conditional(86, ctx.loading ? 86 : 87);
      }
    }, dependencies: [
      CommonModule,
      RouterLink,
      ReactiveFormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NumberValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      MinValidator,
      FormGroupDirective,
      FormControlName,
      FormGroupName,
      FormArrayName,
      MatButtonModule,
      MatButton,
      MatIconAnchor,
      MatIconButton,
      MatCardModule,
      MatCard,
      MatCardContent,
      MatCardHeader,
      MatCardTitle,
      MatIconModule,
      MatIcon,
      MatInputModule,
      MatInput,
      MatFormField,
      MatLabel,
      MatError,
      MatPrefix,
      MatSuffix,
      MatFormFieldModule,
      MatSelectModule,
      MatSelect,
      MatOption,
      MatDatepickerModule,
      MatDatepicker,
      MatDatepickerInput,
      MatDatepickerToggle,
      MatNativeDateModule,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatSnackBarModule,
      MatDividerModule,
      MatStepperModule,
      MatStep,
      MatStepLabel,
      MatStepper,
      MatStepperNext,
      MatStepperPrevious
    ], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n  max-width: 800px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 24px;\n}\n.step-form[_ngcontent-%COMP%] {\n  padding: 24px 0;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n@media (max-width: 600px) {\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n.flex-1[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.ticket-type-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.ticket-type-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.step-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 24px;\n}\n/*# sourceMappingURL=create-event.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateEventComponent, { className: "CreateEventComponent", filePath: "src\\app\\features\\admin\\create-event\\create-event.component.ts", lineNumber: 183 });
})();
export {
  CreateEventComponent
};
//# sourceMappingURL=chunk-NBYKX2K7.js.map
