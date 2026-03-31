import {
  PaymentLinkService
} from "./chunk-GJWFEK5N.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-GKWELAUI.js";
import {
  AuthService
} from "./chunk-UQLJXNML.js";
import {
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  NgControlStatus,
  NgModel
} from "./chunk-6E6SU7EL.js";
import {
  OrderService
} from "./chunk-6FTVO2E6.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-WFDIMCN2.js";
import {
  PaymentMethod
} from "./chunk-WMQBKU7S.js";
import "./chunk-S33CHFYN.js";
import "./chunk-UMZOVFGQ.js";
import {
  MatCard,
  MatCardModule,
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-REL6T6N6.js";
import {
  ActivatedRoute,
  Router,
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
  DatePipe,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-PY3RLCY5.js";

// src/app/features/pay/pay.component.ts
var _c0 = () => ["/login"];
var _c1 = (a0) => ({ returnUrl: a0 });
var _c2 = () => ["/register"];
var _c3 = () => [1, 2, 3, 4, 5];
function PayComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "mat-progress-spinner", 2);
    \u0275\u0275elementEnd();
  }
}
function PayComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 3)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Link inv\xE1lido ou expirado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Este link de pagamento n\xE3o est\xE1 mais dispon\xEDvel.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 4);
    \u0275\u0275text(8, "Ver Eventos");
    \u0275\u0275elementEnd()();
  }
}
function PayComponent_Conditional_3_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "mat-icon");
    \u0275\u0275text(2, "campaign");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.link.customMessage);
  }
}
function PayComponent_Conditional_3_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "mat-icon");
    \u0275\u0275text(2, "event");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "strong");
    \u0275\u0275text(5, "Evento:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.link.eventTitle, "");
  }
}
function PayComponent_Conditional_3_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "mat-icon");
    \u0275\u0275text(2, "confirmation_number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "strong");
    \u0275\u0275text(5, "Ingresso:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.link.ticketTypeName, "");
  }
}
function PayComponent_Conditional_3_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "mat-icon");
    \u0275\u0275text(2, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "strong");
    \u0275\u0275text(5, "V\xE1lido at\xE9:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(7, 1, ctx_r0.link.expiresAt, "dd/MM/yyyy HH:mm"), "");
  }
}
function PayComponent_Conditional_3_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "mat-icon");
    \u0275\u0275text(2, "toll");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "strong");
    \u0275\u0275text(5, "Usos restantes:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.link.maxUses - ctx_r0.link.usedCount, "");
  }
}
function PayComponent_Conditional_3_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "mat-icon");
    \u0275\u0275text(2, "login");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Fa\xE7a login para continuar com a compra");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 13);
    \u0275\u0275text(6, " Fazer Login ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 14);
    \u0275\u0275text(8, "Criar Conta");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(3, _c0))("queryParams", \u0275\u0275pureFunction1(4, _c1, ctx_r0.currentUrl));
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(6, _c2));
  }
}
function PayComponent_Conditional_3_Conditional_14_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r3 = ctx.$implicit;
    \u0275\u0275property("value", n_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", n_r3, " ingresso", n_r3 > 1 ? "s" : "", "");
  }
}
function PayComponent_Conditional_3_Conditional_14_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 20);
  }
}
function PayComponent_Conditional_3_Conditional_14_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Comprar Agora ");
  }
}
function PayComponent_Conditional_3_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "mat-form-field", 16)(2, "mat-label");
    \u0275\u0275text(3, "Quantidade");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-select", 17);
    \u0275\u0275twoWayListener("ngModelChange", function PayComponent_Conditional_3_Conditional_14_Template_mat_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.quantity, $event) || (ctx_r0.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(5, PayComponent_Conditional_3_Conditional_14_For_6_Template, 2, 3, "mat-option", 18, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-form-field", 16)(8, "mat-label");
    \u0275\u0275text(9, "Forma de Pagamento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-select", 17);
    \u0275\u0275twoWayListener("ngModelChange", function PayComponent_Conditional_3_Conditional_14_Template_mat_select_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.paymentMethod, $event) || (ctx_r0.paymentMethod = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(11, "mat-option", 18);
    \u0275\u0275text(12, "\u{1F4B3} Cart\xE3o de Cr\xE9dito");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "mat-option", 18);
    \u0275\u0275text(14, "\u26A1 PIX");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "button", 19);
    \u0275\u0275listener("click", function PayComponent_Conditional_3_Conditional_14_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.proceed());
    });
    \u0275\u0275template(16, PayComponent_Conditional_3_Conditional_14_Conditional_16_Template, 1, 0, "mat-progress-spinner", 20)(17, PayComponent_Conditional_3_Conditional_14_Conditional_17_Template, 3, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.quantity);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(6, _c3));
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.paymentMethod);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r0.PaymentMethod.Card);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r0.PaymentMethod.Pix);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.proceeding);
    \u0275\u0275advance();
    \u0275\u0275conditional(16, ctx_r0.proceeding ? 16 : 17);
  }
}
function PayComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "mat-icon", 7);
    \u0275\u0275text(3, "confirmation_number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h1");
    \u0275\u0275text(5, "Link de Pagamento");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-card", 8);
    \u0275\u0275template(7, PayComponent_Conditional_3_Conditional_7_Template, 5, 1, "div", 9);
    \u0275\u0275elementStart(8, "div", 10);
    \u0275\u0275template(9, PayComponent_Conditional_3_Conditional_9_Template, 7, 1, "div", 11)(10, PayComponent_Conditional_3_Conditional_10_Template, 7, 1, "div", 11)(11, PayComponent_Conditional_3_Conditional_11_Template, 8, 4, "div", 11)(12, PayComponent_Conditional_3_Conditional_12_Template, 7, 1, "div", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, PayComponent_Conditional_3_Conditional_13_Template, 9, 7, "div", 12)(14, PayComponent_Conditional_3_Conditional_14_Template, 18, 7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275conditional(7, ctx_r0.link.customMessage ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(9, ctx_r0.link.eventTitle ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(10, ctx_r0.link.ticketTypeName ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(11, ctx_r0.link.expiresAt ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(12, ctx_r0.link.maxUses ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(13, !ctx_r0.isAuthenticated ? 13 : 14);
  }
}
var PayComponent = class _PayComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.paymentLinkService = inject(PaymentLinkService);
    this.orderService = inject(OrderService);
    this.authService = inject(AuthService);
    this.snackBar = inject(MatSnackBar);
    this.link = null;
    this.loading = true;
    this.error = false;
    this.proceeding = false;
    this.quantity = 1;
    this.paymentMethod = PaymentMethod.Card;
    this.PaymentMethod = PaymentMethod;
    this.currentUrl = "";
  }
  get isAuthenticated() {
    return !!this.authService.currentUser();
  }
  ngOnInit() {
    const token = this.route.snapshot.params["token"];
    this.currentUrl = `/pay/${token}`;
    this.paymentLinkService.getByToken(token).subscribe({
      next: (link) => {
        this.link = link;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
  proceed() {
    if (!this.link || !this.link.ticketTypeId) {
      if (this.link?.eventId) {
        this.router.navigate(["/events", this.link.eventId]);
      } else {
        this.router.navigate(["/events"]);
      }
      return;
    }
    this.proceeding = true;
    this.orderService.createOrder({
      items: [{ ticketTypeId: this.link.ticketTypeId, quantity: this.quantity }],
      paymentMethod: this.paymentMethod,
      installments: 1,
      bundles: [],
      paymentLinkToken: this.link.token
    }).subscribe({
      next: (order) => {
        this.proceeding = false;
        this.router.navigate(["/checkout", order.id]);
      },
      error: (err) => {
        this.proceeding = false;
        this.snackBar.open(err?.error?.message || "Erro ao criar pedido.", "OK", { duration: 4e3 });
      }
    });
  }
  static {
    this.\u0275fac = function PayComponent_Factory(t) {
      return new (t || _PayComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PayComponent, selectors: [["app-pay"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 1, consts: [[1, "container", "pay-container"], [1, "center-spinner"], ["mode", "indeterminate"], [1, "error-card"], ["mat-raised-button", "", "color", "primary", "routerLink", "/events"], [1, "pay-layout"], [1, "pay-header"], [1, "logo-icon"], [1, "pay-card"], [1, "custom-message"], [1, "link-info"], [1, "info-row"], [1, "auth-notice"], ["mat-raised-button", "", "color", "primary", 3, "routerLink", "queryParams"], ["mat-button", "", 3, "routerLink"], [1, "checkout-options"], ["appearance", "outline", 1, "full-width"], [3, "ngModelChange", "ngModel"], [3, "value"], ["mat-raised-button", "", "color", "primary", 1, "full-width", "buy-btn", 3, "click", "disabled"], ["diameter", "20", "mode", "indeterminate"]], template: function PayComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, PayComponent_Conditional_1_Template, 2, 0, "div", 1)(2, PayComponent_Conditional_2_Template, 9, 0)(3, PayComponent_Conditional_3_Template, 15, 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(1, ctx.loading ? 1 : ctx.error ? 2 : ctx.link ? 3 : -1);
      }
    }, dependencies: [CommonModule, DatePipe, RouterLink, FormsModule, NgControlStatus, NgModel, MatCardModule, MatCard, MatButtonModule, MatAnchor, MatButton, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatSelectModule, MatFormField, MatLabel, MatSelect, MatOption, MatFormFieldModule, MatSnackBarModule], styles: ["\n\n.pay-container[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n  max-width: 520px;\n}\n.center-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 64px;\n}\n.pay-layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.pay-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.pay-header[_ngcontent-%COMP%]   .logo-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  width: 36px;\n  height: 36px;\n  color: #6200ea;\n}\n.pay-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.5rem;\n}\n.pay-card[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.custom-message[_ngcontent-%COMP%] {\n  background: #ede7f6;\n  border-radius: 8px;\n  padding: 16px;\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.custom-message[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #6200ea;\n  flex-shrink: 0;\n}\n.custom-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-style: italic;\n  color: #4527a0;\n}\n.link-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-bottom: 24px;\n  padding: 16px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.info-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.9rem;\n}\n.info-row[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #6200ea;\n}\n.auth-notice[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n.auth-notice[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  width: 40px;\n  height: 40px;\n  color: #bdbdbd;\n}\n.auth-notice[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #757575;\n  margin: 0;\n}\n.checkout-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.buy-btn[_ngcontent-%COMP%] {\n  height: 52px;\n  font-size: 1rem;\n}\n.error-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.error-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 56px;\n  width: 56px;\n  height: 56px;\n  color: #e53935;\n}\n.error-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.error-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #757575;\n}\n/*# sourceMappingURL=pay.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PayComponent, { className: "PayComponent", filePath: "src\\app\\features\\pay\\pay.component.ts", lineNumber: 150 });
})();
export {
  PayComponent
};
//# sourceMappingURL=chunk-YLVJZCZ7.js.map
