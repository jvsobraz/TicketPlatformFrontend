import {
  MatChip,
  MatChipsModule
} from "./chunk-TKNABAPT.js";
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
  MatHint,
  MatLabel,
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
  MatCardTitle,
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-REL6T6N6.js";
import {
  RouterLink
} from "./chunk-7BHVX7AP.js";
import {
  HttpClient,
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
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-PY3RLCY5.js";

// src/app/core/services/coupon.service.ts
var CouponService = class _CouponService {
  constructor(http) {
    this.http = http;
    this.BASE_URL = "/Coupons";
  }
  createCoupon(request) {
    return this.http.post(this.BASE_URL, request);
  }
  getMyCoupons() {
    return this.http.get(`${this.BASE_URL}/my-coupons`);
  }
  validateCoupon(code, eventId) {
    return this.http.post(`${this.BASE_URL}/validate`, { code, eventId });
  }
  static {
    this.\u0275fac = function CouponService_Factory(t) {
      return new (t || _CouponService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CouponService, factory: _CouponService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/admin/coupons/coupons.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function CouponsComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 14);
  }
}
function CouponsComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Criar Cupom ");
  }
}
function CouponsComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275element(1, "mat-progress-spinner", 16);
    \u0275\u0275elementEnd();
  }
}
function CouponsComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "Nenhum cupom criado ainda.");
    \u0275\u0275elementEnd();
  }
}
function CouponsComponent_Conditional_53_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const coupon_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("at\xE9 ", \u0275\u0275pipeBind2(2, 1, coupon_r1.validUntil, "dd/MM/yyyy"), "");
  }
}
function CouponsComponent_Conditional_53_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 22)(4, "span", 23);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, CouponsComponent_Conditional_53_For_2_Conditional_9_Template, 3, 4, "span");
    \u0275\u0275elementStart(10, "mat-chip");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const coupon_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("inactive", !coupon_r1.isActive);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(coupon_r1.code);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", coupon_r1.discountType === ctx_r1.DiscountType.Percentage ? coupon_r1.discountValue + "%" : \u0275\u0275pipeBind2(6, 10, coupon_r1.discountValue, "BRL"), " OFF ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", coupon_r1.usedCount, "", coupon_r1.maxUses ? "/" + coupon_r1.maxUses : "", " usos");
    \u0275\u0275advance();
    \u0275\u0275conditional(9, coupon_r1.validUntil ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275classMap(coupon_r1.isActive ? "status-active" : "status-cancelled");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", coupon_r1.isActive ? "Ativo" : "Inativo", " ");
  }
}
function CouponsComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275repeaterCreate(1, CouponsComponent_Conditional_53_For_2_Template, 12, 13, "div", 19, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.coupons);
  }
}
var CouponsComponent = class _CouponsComponent {
  constructor() {
    this.couponService = inject(CouponService);
    this.fb = inject(FormBuilder);
    this.snackBar = inject(MatSnackBar);
    this.DiscountType = DiscountType;
    this.coupons = [];
    this.loading = true;
    this.creating = false;
    this.couponForm = this.fb.group({
      code: ["", [Validators.required, Validators.minLength(3)]],
      discountType: [DiscountType.Percentage, Validators.required],
      discountValue: [10, [Validators.required, Validators.min(1)]],
      maxUses: [null],
      validUntil: [null]
    });
  }
  ngOnInit() {
    this.couponService.getMyCoupons().subscribe({
      next: (c) => {
        this.coupons = c;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  createCoupon() {
    if (this.couponForm.invalid)
      return;
    this.creating = true;
    const val = this.couponForm.value;
    this.couponService.createCoupon({
      code: val.code.toUpperCase(),
      discountType: val.discountType,
      discountValue: val.discountValue,
      maxUses: val.maxUses || void 0,
      validUntil: val.validUntil || void 0
    }).subscribe({
      next: (c) => {
        this.coupons.unshift(c);
        this.couponForm.reset({ discountType: DiscountType.Percentage, discountValue: 10 });
        this.creating = false;
        this.snackBar.open("Cupom criado!", "OK", { duration: 3e3 });
      },
      error: (err) => {
        this.creating = false;
        this.snackBar.open(err.error?.error || "Erro ao criar cupom", "Fechar", { duration: 3e3 });
      }
    });
  }
  static {
    this.\u0275fac = function CouponsComponent_Factory(t) {
      return new (t || _CouponsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CouponsComponent, selectors: [["app-coupons"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 54, vars: 7, consts: [[1, "container", "page-container"], [1, "page-header"], [1, "section-title"], ["mat-button", "", "routerLink", "/admin"], [1, "create-card"], [1, "coupon-form", 3, "formGroup"], ["appearance", "outline"], ["matInput", "", "formControlName", "code", "placeholder", "PROMO20", 2, "text-transform", "uppercase"], ["formControlName", "discountType"], [3, "value"], ["matInput", "", "type", "number", "formControlName", "discountValue", "min", "1"], ["matInput", "", "type", "number", "formControlName", "maxUses", "placeholder", "Ilimitado"], ["matInput", "", "type", "datetime-local", "formControlName", "validUntil"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "18", "mode", "indeterminate"], [2, "text-align", "center", "padding", "32px"], ["mode", "indeterminate"], [2, "color", "#757575", "padding", "24px", "text-align", "center"], [1, "coupons-list"], [1, "coupon-item", 3, "inactive"], [1, "coupon-item"], [1, "coupon-code"], [1, "coupon-details"], [1, "discount-badge"]], template: function CouponsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Cupons de Desconto");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 3)(5, "mat-icon");
        \u0275\u0275text(6, "arrow_back");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Voltar");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "mat-card", 4)(9, "mat-card-header")(10, "mat-card-title");
        \u0275\u0275text(11, "Criar Cupom");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "mat-card-content")(13, "form", 5)(14, "mat-form-field", 6)(15, "mat-label");
        \u0275\u0275text(16, "C\xF3digo");
        \u0275\u0275elementEnd();
        \u0275\u0275element(17, "input", 7);
        \u0275\u0275elementStart(18, "mat-hint");
        \u0275\u0275text(19, "C\xF3digo que o cliente usar\xE1 na compra");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "mat-form-field", 6)(21, "mat-label");
        \u0275\u0275text(22, "Tipo de Desconto");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "mat-select", 8)(24, "mat-option", 9);
        \u0275\u0275text(25, "Percentual (%)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "mat-option", 9);
        \u0275\u0275text(27, "Valor Fixo (R$)");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(28, "mat-form-field", 6)(29, "mat-label");
        \u0275\u0275text(30);
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "mat-form-field", 6)(33, "mat-label");
        \u0275\u0275text(34, "M\xE1ximo de Usos");
        \u0275\u0275elementEnd();
        \u0275\u0275element(35, "input", 11);
        \u0275\u0275elementStart(36, "mat-hint");
        \u0275\u0275text(37, "Deixe vazio para ilimitado");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "mat-form-field", 6)(39, "mat-label");
        \u0275\u0275text(40, "V\xE1lido at\xE9");
        \u0275\u0275elementEnd();
        \u0275\u0275element(41, "input", 12);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(42, "mat-card-actions")(43, "button", 13);
        \u0275\u0275listener("click", function CouponsComponent_Template_button_click_43_listener() {
          return ctx.createCoupon();
        });
        \u0275\u0275template(44, CouponsComponent_Conditional_44_Template, 1, 0, "mat-progress-spinner", 14)(45, CouponsComponent_Conditional_45_Template, 3, 0);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(46, "mat-card")(47, "mat-card-header")(48, "mat-card-title");
        \u0275\u0275text(49, "Meus Cupons");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(50, "mat-card-content");
        \u0275\u0275template(51, CouponsComponent_Conditional_51_Template, 2, 0, "div", 15)(52, CouponsComponent_Conditional_52_Template, 2, 0)(53, CouponsComponent_Conditional_53_Template, 3, 0);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275property("formGroup", ctx.couponForm);
        \u0275\u0275advance(11);
        \u0275\u0275property("value", ctx.DiscountType.Percentage);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", ctx.DiscountType.Fixed);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.couponForm.value.discountType === ctx.DiscountType.Percentage ? "Desconto (%)" : "Desconto (R$)", " ");
        \u0275\u0275advance(13);
        \u0275\u0275property("disabled", ctx.couponForm.invalid || ctx.creating);
        \u0275\u0275advance();
        \u0275\u0275conditional(44, ctx.creating ? 44 : 45);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(51, ctx.loading ? 51 : ctx.coupons.length === 0 ? 52 : 53);
      }
    }, dependencies: [CommonModule, CurrencyPipe, DatePipe, RouterLink, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatButtonModule, MatAnchor, MatButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatHint, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatProgressSpinnerModule, MatProgressSpinner, MatSnackBarModule, MatChipsModule, MatChip], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.create-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.coupon-form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n@media (max-width: 768px) {\n  .coupon-form[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.coupons-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.coupon-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 12px 16px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.coupon-item.inactive[_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n.coupon-code[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 1.1rem;\n  font-weight: 700;\n  background: #e8eaf6;\n  padding: 6px 12px;\n  border-radius: 4px;\n  min-width: 120px;\n  text-align: center;\n}\n.coupon-details[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  flex-wrap: wrap;\n  font-size: 0.9rem;\n  color: #616161;\n}\n.discount-badge[_ngcontent-%COMP%] {\n  background: #6200ea;\n  color: white;\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-weight: 600;\n  font-size: 0.85rem;\n}\n/*# sourceMappingURL=coupons.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CouponsComponent, { className: "CouponsComponent", filePath: "src\\app\\features\\admin\\coupons\\coupons.component.ts", lineNumber: 121 });
})();
export {
  CouponsComponent
};
//# sourceMappingURL=chunk-WXWCAWA7.js.map
