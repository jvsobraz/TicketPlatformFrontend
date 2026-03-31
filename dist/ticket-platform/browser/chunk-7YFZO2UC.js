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
import "./chunk-WMQBKU7S.js";
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
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-7BHVX7AP.js";
import {
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule
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

// src/app/features/auth/login/login.component.ts
function LoginComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "E-mail \xE9 obrigat\xF3rio");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "E-mail inv\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Senha \xE9 obrigat\xF3ria");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 10);
  }
}
function LoginComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Entrar ");
  }
}
var LoginComponent = class _LoginComponent {
  constructor() {
    this.authService = inject(AuthService);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.snackBar = inject(MatSnackBar);
    this.fb = inject(FormBuilder);
    this.loading = false;
    this.hidePassword = true;
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }
  onSubmit() {
    if (this.form.invalid)
      return;
    this.loading = true;
    this.authService.login(this.form.value).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.error || "Erro ao fazer login", "Fechar", { duration: 4e3, panelClass: "error-snackbar" });
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 37, vars: 8, consts: [[1, "auth-container"], [1, "auth-card"], ["mat-card-avatar", "", 2, "font-size", "40px", "width", "40px", "height", "40px", "color", "#6200ea"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matPrefix", ""], ["matInput", "", "type", "email", "formControlName", "email", "autocomplete", "email"], ["matInput", "", "formControlName", "password", "autocomplete", "current-password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "full-width", "submit-btn", 3, "disabled"], ["diameter", "20", "mode", "indeterminate"], [1, "auth-link"], ["routerLink", "/register"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "mat-card-header")(3, "mat-icon", 2);
        \u0275\u0275text(4, "confirmation_number");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "mat-card-title");
        \u0275\u0275text(6, "Entrar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "mat-card-subtitle");
        \u0275\u0275text(8, "Acesse sua conta TicketPlatform");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "mat-card-content")(10, "form", 3);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_10_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(11, "mat-form-field", 4)(12, "mat-label");
        \u0275\u0275text(13, "E-mail");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "mat-icon", 5);
        \u0275\u0275text(15, "email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(16, "input", 6);
        \u0275\u0275template(17, LoginComponent_Conditional_17_Template, 2, 0, "mat-error")(18, LoginComponent_Conditional_18_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "mat-form-field", 4)(20, "mat-label");
        \u0275\u0275text(21, "Senha");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "mat-icon", 5);
        \u0275\u0275text(23, "lock");
        \u0275\u0275elementEnd();
        \u0275\u0275element(24, "input", 7);
        \u0275\u0275elementStart(25, "button", 8);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_25_listener() {
          return ctx.hidePassword = !ctx.hidePassword;
        });
        \u0275\u0275elementStart(26, "mat-icon");
        \u0275\u0275text(27);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(28, LoginComponent_Conditional_28_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "button", 9);
        \u0275\u0275template(30, LoginComponent_Conditional_30_Template, 1, 0, "mat-progress-spinner", 10)(31, LoginComponent_Conditional_31_Template, 1, 0);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(32, "mat-card-actions")(33, "p", 11);
        \u0275\u0275text(34, "N\xE3o tem conta? ");
        \u0275\u0275elementStart(35, "a", 12);
        \u0275\u0275text(36, "Cadastre-se gr\xE1tis");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_2_0;
        let tmp_5_0;
        \u0275\u0275advance(10);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(17, ((tmp_1_0 = ctx.form.get("email")) == null ? null : tmp_1_0.hasError("required")) ? 17 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(18, ((tmp_2_0 = ctx.form.get("email")) == null ? null : tmp_2_0.hasError("email")) ? 18 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275property("type", ctx.hidePassword ? "password" : "text");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.hidePassword ? "visibility" : "visibility_off");
        \u0275\u0275advance();
        \u0275\u0275conditional(28, ((tmp_5_0 = ctx.form.get("password")) == null ? null : tmp_5_0.hasError("required")) ? 28 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275conditional(30, ctx.loading ? 30 : 31);
      }
    }, dependencies: [CommonModule, RouterLink, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatButtonModule, MatButton, MatIconButton, MatCardModule, MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatIconModule, MatIcon, MatInputModule, MatInput, MatFormField, MatLabel, MatError, MatPrefix, MatSuffix, MatFormFieldModule, MatProgressSpinnerModule, MatProgressSpinner, MatSnackBarModule], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: calc(100vh - 128px);\n  padding: 32px 16px;\n}\n.auth-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  padding: 16px;\n}\nmat-form-field[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  height: 48px;\n  font-size: 1rem;\n  margin-top: 8px;\n}\n.auth-link[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #757575;\n}\n.auth-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #6200ea;\n}\n/*# sourceMappingURL=login.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\features\\auth\\login\\login.component.ts", lineNumber: 80 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-7YFZO2UC.js.map
