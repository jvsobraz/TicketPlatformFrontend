import {
  MatChip,
  MatChipsModule
} from "./chunk-TKNABAPT.js";
import {
  FlashSaleService
} from "./chunk-ZI3DQQRU.js";
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
import {
  DiscountType
} from "./chunk-WMQBKU7S.js";
import "./chunk-S33CHFYN.js";
import "./chunk-UMZOVFGQ.js";
import {
  MatCard,
  MatCardActions,
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
  MatIconModule,
  MatOption
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
  ɵɵtextInterpolate2
} from "./chunk-PY3RLCY5.js";

// src/app/features/admin/flash-sales/flash-sales.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function FlashSalesComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 17);
  }
}
function FlashSalesComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "bolt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Criar Promo\xE7\xE3o Flash ");
  }
}
function FlashSalesComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "mat-progress-spinner", 20);
    \u0275\u0275elementEnd();
  }
}
function FlashSalesComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 21)(1, "mat-icon");
    \u0275\u0275text(2, "flash_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Nenhuma promo\xE7\xE3o flash criada ainda.");
    \u0275\u0275elementEnd()();
  }
}
function FlashSalesComponent_Conditional_55_For_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 29);
    \u0275\u0275text(1, "\u26A1 AO VIVO");
    \u0275\u0275elementEnd();
  }
}
function FlashSalesComponent_Conditional_55_For_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip");
    \u0275\u0275text(1, "Encerrada");
    \u0275\u0275elementEnd();
  }
}
function FlashSalesComponent_Conditional_55_For_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 35);
    \u0275\u0275text(1, "Agendada");
    \u0275\u0275elementEnd();
  }
}
function FlashSalesComponent_Conditional_55_For_1_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span")(1, "mat-icon");
    \u0275\u0275text(2, "confirmation_number");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sale_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", sale_r1.ticketsSold, "/", sale_r1.maxTickets, " vendidos");
  }
}
function FlashSalesComponent_Conditional_55_For_1_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card-actions")(1, "button", 36);
    \u0275\u0275listener("click", function FlashSalesComponent_Conditional_55_For_1_Conditional_31_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r2);
      const sale_r1 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.cancel(sale_r1.id));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Cancelar ");
    \u0275\u0275elementEnd()();
  }
}
function FlashSalesComponent_Conditional_55_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 23)(1, "div", 24)(2, "div", 25)(3, "span", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 27);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 28);
    \u0275\u0275template(8, FlashSalesComponent_Conditional_55_For_1_Conditional_8_Template, 2, 0, "mat-chip", 29)(9, FlashSalesComponent_Conditional_55_For_1_Conditional_9_Template, 2, 0)(10, FlashSalesComponent_Conditional_55_For_1_Conditional_10_Template, 2, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 30)(12, "span", 31);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-icon");
    \u0275\u0275text(16, "arrow_forward");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 32);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 33);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 34)(24, "span")(25, "mat-icon");
    \u0275\u0275text(26, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "date");
    \u0275\u0275pipe(29, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(30, FlashSalesComponent_Conditional_55_For_1_Conditional_30_Template, 4, 2, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275template(31, FlashSalesComponent_Conditional_55_For_1_Conditional_31_Template, 5, 0, "mat-card-actions");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sale_r1 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("running", sale_r1.isRunning)("ended", !sale_r1.isActive || ctx_r2.isEnded(sale_r1));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(sale_r1.ticketTypeName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sale_r1.eventTitle);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(8, sale_r1.isRunning ? 8 : !sale_r1.isActive || ctx_r2.isEnded(sale_r1) ? 9 : 10);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 14, sale_r1.originalPrice, "BRL"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(19, 17, sale_r1.flashPrice, "BRL"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" -", sale_r1.discountType === ctx_r2.DiscountType.Percentage ? sale_r1.discountValue + "%" : \u0275\u0275pipeBind2(22, 20, sale_r1.discountValue, "BRL"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(28, 23, sale_r1.startAt, "dd/MM HH:mm"), " \u2192 ", \u0275\u0275pipeBind2(29, 26, sale_r1.endAt, "dd/MM HH:mm"), "");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(30, sale_r1.maxTickets ? 30 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(31, sale_r1.isActive && !ctx_r2.isEnded(sale_r1) ? 31 : -1);
  }
}
function FlashSalesComponent_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, FlashSalesComponent_Conditional_55_For_1_Template, 32, 29, "mat-card", 22, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.sales);
  }
}
var FlashSalesComponent = class _FlashSalesComponent {
  constructor() {
    this.service = inject(FlashSaleService);
    this.snackBar = inject(MatSnackBar);
    this.fb = inject(FormBuilder);
    this.DiscountType = DiscountType;
    this.sales = [];
    this.loading = true;
    this.creating = false;
    this.form = this.fb.group({
      ticketTypeId: [null, [Validators.required, Validators.min(1)]],
      discountType: [DiscountType.Percentage, Validators.required],
      discountValue: [null, [Validators.required, Validators.min(0.01)]],
      startAt: ["", Validators.required],
      endAt: ["", Validators.required],
      maxTickets: [null]
    });
  }
  ngOnInit() {
    this.service.getMySales().subscribe({
      next: (data) => {
        this.sales = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  isEnded(sale) {
    return new Date(sale.endAt) <= /* @__PURE__ */ new Date();
  }
  create() {
    if (this.form.invalid)
      return;
    const v = this.form.value;
    this.creating = true;
    this.service.create({
      ticketTypeId: v.ticketTypeId,
      discountType: v.discountType,
      discountValue: v.discountValue,
      startAt: new Date(v.startAt).toISOString(),
      endAt: new Date(v.endAt).toISOString(),
      maxTickets: v.maxTickets ?? void 0
    }).subscribe({
      next: (sale) => {
        this.sales.unshift(sale);
        this.form.reset({ discountType: DiscountType.Percentage });
        this.creating = false;
        this.snackBar.open("Promo\xE7\xE3o flash criada!", "OK", { duration: 3e3 });
      },
      error: () => {
        this.creating = false;
      }
    });
  }
  cancel(id) {
    this.service.cancel(id).subscribe({
      next: () => {
        const sale = this.sales.find((s) => s.id === id);
        if (sale)
          sale.isActive = false;
        this.snackBar.open("Promo\xE7\xE3o cancelada.", "OK", { duration: 2e3 });
      }
    });
  }
  static {
    this.\u0275fac = function FlashSalesComponent_Factory(t) {
      return new (t || _FlashSalesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FlashSalesComponent, selectors: [["app-flash-sales"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 56, vars: 7, consts: [[1, "container", "page-container"], [1, "page-header"], [1, "section-title"], ["mat-button", "", "routerLink", "/admin"], [1, "content-grid"], [1, "create-card"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "type", "number", "formControlName", "ticketTypeId", "placeholder", "Ex: 5"], ["matSuffix", ""], ["formControlName", "discountType"], [3, "value"], ["matInput", "", "type", "number", "formControlName", "discountValue", "min", "0.01", "step", "0.01"], ["matInput", "", "type", "datetime-local", "formControlName", "startAt"], ["matInput", "", "type", "datetime-local", "formControlName", "endAt"], ["matInput", "", "type", "number", "formControlName", "maxTickets", "min", "1"], ["mat-raised-button", "", "color", "warn", "type", "submit", 1, "full-width", 3, "disabled"], ["diameter", "20", "mode", "indeterminate"], [1, "sales-list"], [2, "text-align", "center", "padding", "32px"], ["mode", "indeterminate"], [1, "empty-card"], [1, "sale-card", 3, "running", "ended"], [1, "sale-card"], [1, "sale-header"], [1, "sale-info"], [1, "sale-title"], [1, "sale-event"], [1, "sale-badge"], ["color", "warn", "highlighted", ""], [1, "sale-prices"], [1, "original-price"], [1, "flash-price"], [1, "discount-badge"], [1, "sale-meta"], ["color", "primary"], ["mat-button", "", "color", "warn", 3, "click"]], template: function FlashSalesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "\u26A1 Promo\xE7\xF5es Flash");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 3)(5, "mat-icon");
        \u0275\u0275text(6, "arrow_back");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Voltar");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 4)(9, "mat-card", 5)(10, "mat-card-header")(11, "mat-card-title");
        \u0275\u0275text(12, "Nova Promo\xE7\xE3o Flash");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "mat-card-subtitle");
        \u0275\u0275text(14, "Desconto por tempo limitado para um ingresso");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "mat-card-content")(16, "form", 6);
        \u0275\u0275listener("ngSubmit", function FlashSalesComponent_Template_form_ngSubmit_16_listener() {
          return ctx.create();
        });
        \u0275\u0275elementStart(17, "mat-form-field", 7)(18, "mat-label");
        \u0275\u0275text(19, "ID do Tipo de Ingresso");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "input", 8);
        \u0275\u0275elementStart(21, "mat-icon", 9);
        \u0275\u0275text(22, "confirmation_number");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "mat-form-field", 7)(24, "mat-label");
        \u0275\u0275text(25, "Tipo de Desconto");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "mat-select", 10)(27, "mat-option", 11);
        \u0275\u0275text(28, "Percentual (%)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "mat-option", 11);
        \u0275\u0275text(30, "Valor Fixo (R$)");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(31, "mat-form-field", 7)(32, "mat-label");
        \u0275\u0275text(33, "Valor do Desconto");
        \u0275\u0275elementEnd();
        \u0275\u0275element(34, "input", 12);
        \u0275\u0275elementStart(35, "span", 9);
        \u0275\u0275text(36);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "mat-form-field", 7)(38, "mat-label");
        \u0275\u0275text(39, "In\xEDcio");
        \u0275\u0275elementEnd();
        \u0275\u0275element(40, "input", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "mat-form-field", 7)(42, "mat-label");
        \u0275\u0275text(43, "T\xE9rmino");
        \u0275\u0275elementEnd();
        \u0275\u0275element(44, "input", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "mat-form-field", 7)(46, "mat-label");
        \u0275\u0275text(47, "M\xE1x. de Ingressos (opcional)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(48, "input", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "button", 16);
        \u0275\u0275template(50, FlashSalesComponent_Conditional_50_Template, 1, 0, "mat-progress-spinner", 17)(51, FlashSalesComponent_Conditional_51_Template, 3, 0);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(52, "div", 18);
        \u0275\u0275template(53, FlashSalesComponent_Conditional_53_Template, 2, 0, "div", 19)(54, FlashSalesComponent_Conditional_54_Template, 5, 0)(55, FlashSalesComponent_Conditional_55_Template, 2, 0);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(16);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(11);
        \u0275\u0275property("value", ctx.DiscountType.Percentage);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", ctx.DiscountType.Fixed);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.form.value.discountType === ctx.DiscountType.Percentage ? "%" : "R$");
        \u0275\u0275advance(13);
        \u0275\u0275property("disabled", ctx.form.invalid || ctx.creating);
        \u0275\u0275advance();
        \u0275\u0275conditional(50, ctx.creating ? 50 : 51);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(53, ctx.loading ? 53 : ctx.sales.length === 0 ? 54 : 55);
      }
    }, dependencies: [CommonModule, CurrencyPipe, DatePipe, RouterLink, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatButtonModule, MatAnchor, MatButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatSuffix, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatProgressSpinnerModule, MatProgressSpinner, MatSnackBarModule, MatChipsModule, MatChip], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 380px 1fr;\n  gap: 24px;\n}\n@media (max-width: 900px) {\n  .content-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-top: 8px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.sales-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.sale-card[_ngcontent-%COMP%] {\n  padding: 16px;\n  transition: box-shadow 0.2s;\n}\n.sale-card.running[_ngcontent-%COMP%] {\n  border-left: 4px solid #f44336;\n  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.2);\n}\n.sale-card.ended[_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n.sale-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 12px;\n}\n.sale-title[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 600;\n}\n.sale-event[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.82rem;\n  color: #757575;\n}\n.sale-prices[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n  flex-wrap: wrap;\n}\n.original-price[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  color: #9e9e9e;\n}\n.flash-price[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  font-weight: 700;\n  color: #e53935;\n}\n.discount-badge[_ngcontent-%COMP%] {\n  background: #e53935;\n  color: #fff;\n  border-radius: 12px;\n  padding: 2px 10px;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.sale-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  font-size: 0.8rem;\n  color: #616161;\n  flex-wrap: wrap;\n}\n.sale-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.sale-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.empty-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n}\n.empty-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #bdbdbd;\n  display: block;\n  margin: 0 auto 16px;\n}\n.empty-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #757575;\n}\n/*# sourceMappingURL=flash-sales.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FlashSalesComponent, { className: "FlashSalesComponent", filePath: "src\\app\\features\\admin\\flash-sales\\flash-sales.component.ts", lineNumber: 168 });
})();
export {
  FlashSalesComponent
};
//# sourceMappingURL=chunk-ZJYMNHP6.js.map
