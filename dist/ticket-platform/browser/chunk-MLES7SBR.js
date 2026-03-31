import {
  MatSelect,
  MatSelectModule
} from "./chunk-GKWELAUI.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-R3FRS4NQ.js";
import {
  AuthService
} from "./chunk-UQLJXNML.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix,
  MatSuffix,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-6E6SU7EL.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-WFDIMCN2.js";
import {
  UserRole
} from "./chunk-WMQBKU7S.js";
import "./chunk-S33CHFYN.js";
import "./chunk-UMZOVFGQ.js";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
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
  MatIconButton,
  MatIconModule,
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
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-PY3RLCY5.js";

// src/app/features/auth/register/register.component.ts
function RegisterComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Nome \xE9 obrigat\xF3rio");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "E-mail \xE9 obrigat\xF3rio");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "E-mail inv\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Senha \xE9 obrigat\xF3ria");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "M\xEDnimo 6 caracteres");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 14);
  }
}
function RegisterComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Criar Conta ");
  }
}
var RegisterComponent = class _RegisterComponent {
  constructor() {
    this.authService = inject(AuthService);
    this.router = inject(Router);
    this.snackBar = inject(MatSnackBar);
    this.fb = inject(FormBuilder);
    this.loading = false;
    this.hidePassword = true;
    this.UserRole = UserRole;
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      phone: [""],
      role: [UserRole.Customer]
    });
  }
  onSubmit() {
    if (this.form.invalid)
      return;
    this.loading = true;
    this.authService.register(this.form.value).subscribe({
      next: () => this.router.navigate(["/"]),
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.error || "Erro ao criar conta", "Fechar", { duration: 4e3, panelClass: "error-snackbar" });
      }
    });
  }
  static {
    this.\u0275fac = function RegisterComponent_Factory(t) {
      return new (t || _RegisterComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 59, vars: 12, consts: [[1, "auth-container"], [1, "auth-card"], ["mat-card-avatar", "", 2, "font-size", "40px", "width", "40px", "height", "40px", "color", "#6200ea"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matPrefix", ""], ["matInput", "", "formControlName", "name"], ["matInput", "", "type", "email", "formControlName", "email", "autocomplete", "email"], ["matInput", "", "formControlName", "password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["matInput", "", "formControlName", "phone", "placeholder", "(11) 99999-9999"], ["formControlName", "role"], [3, "value"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "full-width", "submit-btn", 3, "disabled"], ["diameter", "20", "mode", "indeterminate"], [1, "auth-link"], ["routerLink", "/login"]], template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "mat-card-header")(3, "mat-icon", 2);
        \u0275\u0275text(4, "person_add");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "mat-card-title");
        \u0275\u0275text(6, "Criar Conta");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "mat-card-subtitle");
        \u0275\u0275text(8, "Junte-se ao TicketPlatform");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "mat-card-content")(10, "form", 3);
        \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_10_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(11, "mat-form-field", 4)(12, "mat-label");
        \u0275\u0275text(13, "Nome completo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "mat-icon", 5);
        \u0275\u0275text(15, "person");
        \u0275\u0275elementEnd();
        \u0275\u0275element(16, "input", 6);
        \u0275\u0275template(17, RegisterComponent_Conditional_17_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "mat-form-field", 4)(19, "mat-label");
        \u0275\u0275text(20, "E-mail");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "mat-icon", 5);
        \u0275\u0275text(22, "email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 7);
        \u0275\u0275template(24, RegisterComponent_Conditional_24_Template, 2, 0, "mat-error")(25, RegisterComponent_Conditional_25_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "mat-form-field", 4)(27, "mat-label");
        \u0275\u0275text(28, "Senha");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "mat-icon", 5);
        \u0275\u0275text(30, "lock");
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "input", 8);
        \u0275\u0275elementStart(32, "button", 9);
        \u0275\u0275listener("click", function RegisterComponent_Template_button_click_32_listener() {
          return ctx.hidePassword = !ctx.hidePassword;
        });
        \u0275\u0275elementStart(33, "mat-icon");
        \u0275\u0275text(34);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(35, RegisterComponent_Conditional_35_Template, 2, 0, "mat-error")(36, RegisterComponent_Conditional_36_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "mat-form-field", 4)(38, "mat-label");
        \u0275\u0275text(39, "Telefone (opcional)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "mat-icon", 5);
        \u0275\u0275text(41, "phone");
        \u0275\u0275elementEnd();
        \u0275\u0275element(42, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "mat-form-field", 4)(44, "mat-label");
        \u0275\u0275text(45, "Tipo de conta");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "mat-select", 11)(47, "mat-option", 12);
        \u0275\u0275text(48, "Comprador de Ingressos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "mat-option", 12);
        \u0275\u0275text(50, "Organizador de Eventos");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(51, "button", 13);
        \u0275\u0275template(52, RegisterComponent_Conditional_52_Template, 1, 0, "mat-progress-spinner", 14)(53, RegisterComponent_Conditional_53_Template, 1, 0);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(54, "mat-card-actions")(55, "p", 15);
        \u0275\u0275text(56, "J\xE1 tem conta? ");
        \u0275\u0275elementStart(57, "a", 16);
        \u0275\u0275text(58, "Entrar");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_2_0;
        let tmp_3_0;
        let tmp_6_0;
        let tmp_7_0;
        \u0275\u0275advance(10);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(17, ((tmp_1_0 = ctx.form.get("name")) == null ? null : tmp_1_0.hasError("required")) ? 17 : -1);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(24, ((tmp_2_0 = ctx.form.get("email")) == null ? null : tmp_2_0.hasError("required")) ? 24 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(25, ((tmp_3_0 = ctx.form.get("email")) == null ? null : tmp_3_0.hasError("email")) ? 25 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275property("type", ctx.hidePassword ? "password" : "text");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.hidePassword ? "visibility" : "visibility_off");
        \u0275\u0275advance();
        \u0275\u0275conditional(35, ((tmp_6_0 = ctx.form.get("password")) == null ? null : tmp_6_0.hasError("required")) ? 35 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(36, ((tmp_7_0 = ctx.form.get("password")) == null ? null : tmp_7_0.hasError("minlength")) ? 36 : -1);
        \u0275\u0275advance(11);
        \u0275\u0275property("value", ctx.UserRole.Customer);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", ctx.UserRole.Organizer);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275conditional(52, ctx.loading ? 52 : 53);
      }
    }, dependencies: [CommonModule, RouterLink, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatButtonModule, MatButton, MatIconButton, MatCardModule, MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatIconModule, MatIcon, MatInputModule, MatInput, MatFormField, MatLabel, MatError, MatPrefix, MatSuffix, MatFormFieldModule, MatSelectModule, MatSelect, MatOption, MatProgressSpinnerModule, MatProgressSpinner, MatSnackBarModule], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: calc(100vh - 128px);\n  padding: 32px 16px;\n}\n.auth-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 480px;\n  padding: 16px;\n}\nmat-form-field[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  height: 48px;\n  font-size: 1rem;\n  margin-top: 8px;\n}\n.auth-link[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #757575;\n}\n.auth-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #6200ea;\n}\n/*# sourceMappingURL=register.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src\\app\\features\\auth\\register\\register.component.ts", lineNumber: 100 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-MLES7SBR.js.map
