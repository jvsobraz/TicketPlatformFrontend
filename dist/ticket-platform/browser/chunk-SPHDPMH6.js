import {
  PaymentLinkService
} from "./chunk-GJWFEK5N.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-TKNABAPT.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-T6ZCVX5F.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-R3FRS4NQ.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
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
  MatCardSubtitle,
  MatCardTitle,
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-REL6T6N6.js";
import {
  RouterLink
} from "./chunk-7BHVX7AP.js";
import {
  MatAnchor,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule
} from "./chunk-FV6QPV75.js";
import "./chunk-GYYVMIU3.js";
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-PY3RLCY5.js";

// src/app/features/admin/payment-links/payment-links.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PaymentLinksComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 14);
  }
}
function PaymentLinksComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "add_link");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Gerar Link ");
  }
}
function PaymentLinksComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "mat-progress-spinner", 17);
    \u0275\u0275elementEnd();
  }
}
function PaymentLinksComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 18)(1, "mat-icon");
    \u0275\u0275text(2, "link_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Nenhum link criado ainda. Crie seu primeiro link de pagamento!");
    \u0275\u0275elementEnd()();
  }
}
function PaymentLinksComponent_Conditional_47_For_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const link_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" \u{1F4C5} ", link_r1.eventTitle, " ");
  }
}
function PaymentLinksComponent_Conditional_47_For_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const link_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" \u{1F3AB} ", link_r1.ticketTypeName, " ");
  }
}
function PaymentLinksComponent_Conditional_47_For_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F517} Link Geral ");
  }
}
function PaymentLinksComponent_Conditional_47_For_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function PaymentLinksComponent_Conditional_47_For_1_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const link_r1 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.copyLink(link_r1.url));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "content_copy");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "button", 29);
    \u0275\u0275listener("click", function PaymentLinksComponent_Conditional_47_For_1_Conditional_11_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const link_r1 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deactivate(link_r1.id));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "link_off");
    \u0275\u0275elementEnd()();
  }
}
function PaymentLinksComponent_Conditional_47_For_1_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 30);
    \u0275\u0275text(1, "Inativo");
    \u0275\u0275elementEnd();
  }
}
function PaymentLinksComponent_Conditional_47_For_1_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const link_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1('"', link_r1.customMessage, '"');
  }
}
function PaymentLinksComponent_Conditional_47_For_1_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const link_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Expira: ", \u0275\u0275pipeBind2(2, 1, link_r1.expiresAt, "dd/MM/yyyy"), "");
  }
}
function PaymentLinksComponent_Conditional_47_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 20)(1, "div", 21)(2, "div")(3, "span", 22);
    \u0275\u0275template(4, PaymentLinksComponent_Conditional_47_For_1_Conditional_4_Template, 1, 1)(5, PaymentLinksComponent_Conditional_47_For_1_Conditional_5_Template, 1, 1)(6, PaymentLinksComponent_Conditional_47_For_1_Conditional_6_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 23);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 24);
    \u0275\u0275template(11, PaymentLinksComponent_Conditional_47_For_1_Conditional_11_Template, 6, 0)(12, PaymentLinksComponent_Conditional_47_For_1_Conditional_12_Template, 2, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 25)(14, "code");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(16, PaymentLinksComponent_Conditional_47_For_1_Conditional_16_Template, 2, 1, "p", 26);
    \u0275\u0275elementStart(17, "div", 27)(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, PaymentLinksComponent_Conditional_47_For_1_Conditional_21_Template, 3, 4, "span");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r1 = ctx.$implicit;
    \u0275\u0275classProp("inactive", !link_r1.isActive);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(4, link_r1.eventTitle ? 4 : link_r1.ticketTypeName ? 5 : 6);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3(" ", link_r1.usedCount, "", link_r1.maxUses ? "/" + link_r1.maxUses : "", " usos \u2022 ", \u0275\u0275pipeBind2(9, 11, link_r1.totalRevenue, "BRL"), " gerado ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(11, link_r1.isActive ? 11 : 12);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(link_r1.url);
    \u0275\u0275advance();
    \u0275\u0275conditional(16, link_r1.customMessage ? 16 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Criado: ", \u0275\u0275pipeBind2(20, 14, link_r1.createdAt, "dd/MM/yyyy HH:mm"), "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(21, link_r1.expiresAt ? 21 : -1);
  }
}
function PaymentLinksComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, PaymentLinksComponent_Conditional_47_For_1_Template, 22, 17, "mat-card", 19, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.links);
  }
}
var PaymentLinksComponent = class _PaymentLinksComponent {
  constructor() {
    this.service = inject(PaymentLinkService);
    this.snackBar = inject(MatSnackBar);
    this.fb = inject(FormBuilder);
    this.links = [];
    this.loading = true;
    this.creating = false;
    this.form = this.fb.group({
      eventId: [null],
      ticketTypeId: [null],
      maxUses: [null],
      customMessage: ["", Validators.maxLength(500)]
    });
  }
  ngOnInit() {
    this.loadLinks();
  }
  loadLinks() {
    this.loading = true;
    this.service.getMyLinks().subscribe({
      next: (data) => {
        this.links = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  create() {
    if (this.form.invalid)
      return;
    const val = this.form.value;
    this.creating = true;
    this.service.create({
      eventId: val.eventId ?? void 0,
      ticketTypeId: val.ticketTypeId ?? void 0,
      maxUses: val.maxUses ?? void 0,
      customMessage: val.customMessage ?? void 0
    }).subscribe({
      next: (link) => {
        this.links.unshift(link);
        this.form.reset();
        this.creating = false;
        this.snackBar.open("Link criado!", "OK", { duration: 3e3 });
        this.copyLink(link.url);
      },
      error: () => {
        this.creating = false;
      }
    });
  }
  copyLink(url) {
    navigator.clipboard.writeText(url).then(() => {
      this.snackBar.open("Link copiado!", "", { duration: 2e3 });
    });
  }
  deactivate(id) {
    this.service.deactivate(id).subscribe({
      next: () => {
        const link = this.links.find((l) => l.id === id);
        if (link)
          link.isActive = false;
        this.snackBar.open("Link desativado.", "OK", { duration: 2e3 });
      }
    });
  }
  static {
    this.\u0275fac = function PaymentLinksComponent_Factory(t) {
      return new (t || _PaymentLinksComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentLinksComponent, selectors: [["app-payment-links"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 48, vars: 4, consts: [[1, "container", "page-container"], [1, "page-header"], [1, "section-title"], ["mat-button", "", "routerLink", "/admin"], [1, "content-grid"], [1, "create-card"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "type", "number", "formControlName", "eventId", "placeholder", "Deixe vazio para qualquer evento"], ["matSuffix", ""], ["matInput", "", "type", "number", "formControlName", "ticketTypeId", "placeholder", "Pr\xE9-seleciona um ingresso"], ["matInput", "", "type", "number", "formControlName", "maxUses", "min", "1", "placeholder", "Ilimitado se vazio"], ["matInput", "", "formControlName", "customMessage", "rows", "2", "placeholder", "Texto exibido na p\xE1gina de checkout para o comprador"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "full-width", 3, "disabled"], ["diameter", "20", "mode", "indeterminate"], [1, "links-list"], [2, "text-align", "center", "padding", "32px"], ["mode", "indeterminate"], [1, "empty-card"], [1, "link-card", 3, "inactive"], [1, "link-card"], [1, "link-header"], [1, "link-target"], [1, "link-stats"], [1, "link-actions"], [1, "link-url"], [1, "link-msg"], [1, "link-meta"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Copiar link", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Desativar", 3, "click"], ["color", "warn"]], template: function PaymentLinksComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Links de Pagamento");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 3)(5, "mat-icon");
        \u0275\u0275text(6, "arrow_back");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Voltar");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 4)(9, "mat-card", 5)(10, "mat-card-header")(11, "mat-card-title")(12, "mat-icon");
        \u0275\u0275text(13, "add_link");
        \u0275\u0275elementEnd();
        \u0275\u0275text(14, " Criar Link");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "mat-card-subtitle");
        \u0275\u0275text(16, "Gere um link compartilh\xE1vel para venda direta");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "mat-card-content")(18, "form", 6);
        \u0275\u0275listener("ngSubmit", function PaymentLinksComponent_Template_form_ngSubmit_18_listener() {
          return ctx.create();
        });
        \u0275\u0275elementStart(19, "mat-form-field", 7)(20, "mat-label");
        \u0275\u0275text(21, "ID do Evento (opcional)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(22, "input", 8);
        \u0275\u0275elementStart(23, "mat-icon", 9);
        \u0275\u0275text(24, "event");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "mat-form-field", 7)(26, "mat-label");
        \u0275\u0275text(27, "ID do Tipo de Ingresso (opcional)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(28, "input", 10);
        \u0275\u0275elementStart(29, "mat-icon", 9);
        \u0275\u0275text(30, "confirmation_number");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(31, "mat-form-field", 7)(32, "mat-label");
        \u0275\u0275text(33, "M\xE1ximo de Usos (opcional)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(34, "input", 11);
        \u0275\u0275elementStart(35, "mat-icon", 9);
        \u0275\u0275text(36, "toll");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "mat-form-field", 7)(38, "mat-label");
        \u0275\u0275text(39, "Mensagem Personalizada");
        \u0275\u0275elementEnd();
        \u0275\u0275element(40, "textarea", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "button", 13);
        \u0275\u0275template(42, PaymentLinksComponent_Conditional_42_Template, 1, 0, "mat-progress-spinner", 14)(43, PaymentLinksComponent_Conditional_43_Template, 3, 0);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(44, "div", 15);
        \u0275\u0275template(45, PaymentLinksComponent_Conditional_45_Template, 2, 0, "div", 16)(46, PaymentLinksComponent_Conditional_46_Template, 5, 0)(47, PaymentLinksComponent_Conditional_47_Template, 2, 0);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(18);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(23);
        \u0275\u0275property("disabled", ctx.form.invalid || ctx.creating);
        \u0275\u0275advance();
        \u0275\u0275conditional(42, ctx.creating ? 42 : 43);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(45, ctx.loading ? 45 : ctx.links.length === 0 ? 46 : 47);
      }
    }, dependencies: [
      CommonModule,
      CurrencyPipe,
      DatePipe,
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
      MatCardModule,
      MatCard,
      MatCardContent,
      MatCardHeader,
      MatCardSubtitle,
      MatCardTitle,
      MatButtonModule,
      MatAnchor,
      MatButton,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatSuffix,
      MatInputModule,
      MatInput,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatSnackBarModule,
      MatChipsModule,
      MatChip,
      MatTooltipModule,
      MatTooltip
    ], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 380px 1fr;\n  gap: 24px;\n}\n@media (max-width: 900px) {\n  .content-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.create-card[_ngcontent-%COMP%]   mat-icon[ng-reflect-svg-icon][_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-top: 8px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.links-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.link-card[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.link-card.inactive[_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n.link-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 8px;\n}\n.link-target[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 600;\n  font-size: 0.95rem;\n}\n.link-stats[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.8rem;\n  color: #757575;\n  margin-top: 2px;\n}\n.link-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.link-url[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  border-radius: 4px;\n  padding: 8px 12px;\n  margin-bottom: 8px;\n  overflow: hidden;\n}\n.link-url[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  word-break: break-all;\n}\n.link-msg[_ngcontent-%COMP%] {\n  font-style: italic;\n  color: #616161;\n  font-size: 0.85rem;\n  margin: 4px 0 8px;\n}\n.link-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  font-size: 0.75rem;\n  color: #9e9e9e;\n}\n.empty-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n}\n.empty-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #bdbdbd;\n  display: block;\n  margin: 0 auto 16px;\n}\n.empty-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #757575;\n}\n/*# sourceMappingURL=payment-links.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentLinksComponent, { className: "PaymentLinksComponent", filePath: "src\\app\\features\\admin\\payment-links\\payment-links.component.ts", lineNumber: 156 });
})();
export {
  PaymentLinksComponent
};
//# sourceMappingURL=chunk-SPHDPMH6.js.map
