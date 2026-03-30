import {
  MatStepperModule
} from "./chunk-MABPV5FY.js";
import {
  OrderService
} from "./chunk-H334S5XS.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-B3VC7F6K.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-2MT4FJQU.js";
import {
  OrderStatus,
  PaymentMethod
} from "./chunk-ETZDFFQU.js";
import "./chunk-4CH56522.js";
import "./chunk-NP2OLDGZ.js";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle,
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-5GAUGJ64.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-7C6TSSWH.js";
import {
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule
} from "./chunk-NW3FCLJU.js";
import "./chunk-6UWFS5XU.js";
import {
  CommonModule,
  CurrencyPipe,
  __async,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-L24MRG7B.js";

// src/app/features/checkout/checkout.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function CheckoutComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "mat-progress-spinner", 3);
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "mat-icon", 5);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Pagamento Confirmado!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Seus ingressos foram gerados. Acesse ");
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8, "Meus Ingressos");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " para visualiz\xE1-los.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 6)(11, "mat-icon");
    \u0275\u0275text(12, "qr_code_2");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Ver Meus Ingressos ");
    \u0275\u0275elementEnd()();
  }
}
function CheckoutComponent_Conditional_4_Conditional_1_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(9, "mat-divider");
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", item_r2.quantity, "x ", item_r2.ticketTypeName, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.eventTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 4, item_r2.subtotal, "BRL"));
  }
}
function CheckoutComponent_Conditional_4_Conditional_1_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "pix");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Pagamento via PIX ");
  }
}
function CheckoutComponent_Conditional_4_Conditional_1_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "credit_card");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Pagamento com Cart\xE3o ");
  }
}
function CheckoutComponent_Conditional_4_Conditional_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "p");
    \u0275\u0275text(2, "Ap\xF3s confirmar, voc\xEA receber\xE1 o QR Code PIX para pagamento.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p")(4, "strong");
    \u0275\u0275text(5, "Validade:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " 1 hora");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p")(8, "strong");
    \u0275\u0275text(9, "Valor:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(11, 1, ctx_r2.order.totalAmount, "BRL"), "");
  }
}
function CheckoutComponent_Conditional_4_Conditional_1_Conditional_21_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.stripeError);
  }
}
function CheckoutComponent_Conditional_4_Conditional_1_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 17);
    \u0275\u0275template(1, CheckoutComponent_Conditional_4_Conditional_1_Conditional_21_Conditional_1_Template, 2, 1, "p", 18);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r2.stripeError ? 1 : -1);
  }
}
function CheckoutComponent_Conditional_4_Conditional_1_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 14);
  }
}
function CheckoutComponent_Conditional_4_Conditional_1_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "currency");
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Pagar ", \u0275\u0275pipeBind2(3, 1, ctx_r2.order.totalAmount, "BRL"), " ");
  }
}
function CheckoutComponent_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "mat-card", 8)(2, "mat-card-header")(3, "mat-card-title");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-card-content");
    \u0275\u0275repeaterCreate(6, CheckoutComponent_Conditional_4_Conditional_1_For_7_Template, 10, 7, null, null, _forTrack0);
    \u0275\u0275elementStart(8, "div", 9)(9, "strong");
    \u0275\u0275text(10, "Total a pagar:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "strong", 10);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "currency");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(14, "mat-card", 11)(15, "mat-card-header")(16, "mat-card-title");
    \u0275\u0275template(17, CheckoutComponent_Conditional_4_Conditional_1_Conditional_17_Template, 3, 0)(18, CheckoutComponent_Conditional_4_Conditional_1_Conditional_18_Template, 3, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "mat-card-content");
    \u0275\u0275template(20, CheckoutComponent_Conditional_4_Conditional_1_Conditional_20_Template, 12, 4, "div", 12)(21, CheckoutComponent_Conditional_4_Conditional_1_Conditional_21_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-card-actions")(23, "button", 13);
    \u0275\u0275listener("click", function CheckoutComponent_Conditional_4_Conditional_1_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.confirmPayment());
    });
    \u0275\u0275template(24, CheckoutComponent_Conditional_4_Conditional_1_Conditional_24_Template, 1, 0, "mat-progress-spinner", 14)(25, CheckoutComponent_Conditional_4_Conditional_1_Conditional_25_Template, 4, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 15);
    \u0275\u0275text(27, "Cancelar");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Resumo do Pedido #", ctx_r2.order.id, "");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.order.items);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 7, ctx_r2.order.totalAmount, "BRL"));
    \u0275\u0275advance(5);
    \u0275\u0275conditional(17, ctx_r2.order.paymentMethod === ctx_r2.PaymentMethod.Pix ? 17 : 18);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(20, ctx_r2.order.paymentMethod === ctx_r2.PaymentMethod.Pix ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(21, ctx_r2.order.paymentMethod === ctx_r2.PaymentMethod.Card ? 21 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.processingPayment || !ctx_r2.stripeReady);
    \u0275\u0275advance();
    \u0275\u0275conditional(24, ctx_r2.processingPayment ? 24 : 25);
  }
}
function CheckoutComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CheckoutComponent_Conditional_4_Conditional_0_Template, 14, 0, "div", 4)(1, CheckoutComponent_Conditional_4_Conditional_1_Template, 28, 10);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, ctx_r2.order.status === ctx_r2.OrderStatus.Paid ? 0 : 1);
  }
}
var CheckoutComponent = class _CheckoutComponent {
  constructor() {
    this.orderService = inject(OrderService);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.snackBar = inject(MatSnackBar);
    this.order = null;
    this.loadingOrder = true;
    this.processingPayment = false;
    this.stripeReady = false;
    this.stripeError = "";
    this.OrderStatus = OrderStatus;
    this.PaymentMethod = PaymentMethod;
    this.STRIPE_PK = "pk_test_SUA_CHAVE_PUBLICA_STRIPE_AQUI";
  }
  ngOnInit() {
    const orderId = Number(this.route.snapshot.params["orderId"]);
    this.orderService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.loadingOrder = false;
        if (order.status === OrderStatus.Pending && order.stripeClientSecret) {
          this.initStripe(order.stripeClientSecret, order.paymentMethod);
        }
      },
      error: () => {
        this.loadingOrder = false;
        this.router.navigate(["/"]);
      }
    });
  }
  initStripe(clientSecret, paymentMethod) {
    return __async(this, null, function* () {
      try {
        if (typeof Stripe === "undefined") {
          yield this.loadStripeScript();
        }
        this.stripe = Stripe(this.STRIPE_PK);
        this.elements = this.stripe.elements({
          clientSecret,
          locale: "pt-BR"
        });
        if (paymentMethod === PaymentMethod.Card) {
          this.paymentElement = this.elements.create("payment");
          setTimeout(() => {
            this.paymentElement.mount("#payment-element");
            this.stripeReady = true;
          }, 100);
        } else {
          this.stripeReady = true;
        }
      } catch (err) {
        console.error("Stripe init error:", err);
      }
    });
  }
  loadStripeScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/";
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }
  confirmPayment() {
    return __async(this, null, function* () {
      if (!this.stripe || !this.order)
        return;
      this.processingPayment = true;
      this.stripeError = "";
      try {
        let result;
        if (this.order.paymentMethod === PaymentMethod.Pix) {
          result = yield this.stripe.confirmPixPayment(this.order.stripeClientSecret, {
            payment_method: { pix: {} }
          });
        } else {
          result = yield this.stripe.confirmPayment({
            elements: this.elements,
            confirmParams: {
              return_url: `${window.location.origin}/checkout/${this.order.id}`
            },
            redirect: "if_required"
          });
        }
        if (result.error) {
          this.stripeError = result.error.message || "Erro no pagamento.";
          this.processingPayment = false;
        } else if (result.paymentIntent?.status === "succeeded") {
          this.snackBar.open("Pagamento realizado com sucesso!", "OK", { duration: 3e3, panelClass: "success-snackbar" });
          this.order.status = OrderStatus.Paid;
          this.processingPayment = false;
        }
      } catch (err) {
        this.stripeError = "Erro inesperado no pagamento.";
        this.processingPayment = false;
      }
    });
  }
  static {
    this.\u0275fac = function CheckoutComponent_Factory(t) {
      return new (t || _CheckoutComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CheckoutComponent, selectors: [["app-checkout"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 5, vars: 1, consts: [[1, "container", "checkout-container"], [1, "section-title"], [1, "loading-overlay"], ["mode", "indeterminate"], [1, "success-state"], [1, "success-icon"], ["mat-raised-button", "", "color", "primary", "routerLink", "/my-tickets"], [1, "checkout-layout"], [1, "order-summary-card"], [1, "order-total"], [1, "price"], [1, "payment-card"], [1, "pix-info"], ["mat-raised-button", "", "color", "primary", 1, "full-width", "pay-btn", 3, "click", "disabled"], ["diameter", "20", "mode", "indeterminate"], ["mat-button", "", "routerLink", "/", 1, "full-width", 2, "margin-top", "8px"], [1, "order-item"], ["id", "payment-element", 1, "stripe-element"], [1, "stripe-error"]], template: function CheckoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
        \u0275\u0275text(2, "Finalizar Compra");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, CheckoutComponent_Conditional_3_Template, 2, 0, "div", 2)(4, CheckoutComponent_Conditional_4_Template, 2, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(3, ctx.loadingOrder ? 3 : ctx.order ? 4 : -1);
      }
    }, dependencies: [
      CommonModule,
      CurrencyPipe,
      RouterLink,
      MatButtonModule,
      MatButton,
      MatCardModule,
      MatCard,
      MatCardActions,
      MatCardContent,
      MatCardHeader,
      MatCardTitle,
      MatIconModule,
      MatIcon,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatSnackBarModule,
      MatDividerModule,
      MatDivider,
      MatStepperModule
    ], styles: ["\n\n.checkout-container[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n  max-width: 900px;\n}\n.checkout-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n@media (max-width: 768px) {\n  .checkout-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.order-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 12px 0;\n}\n.order-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #757575;\n  font-size: 0.9rem;\n  margin: 4px 0;\n}\n.order-total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 16px 0;\n  font-size: 1.1rem;\n}\n.stripe-element[_ngcontent-%COMP%] {\n  padding: 16px;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n  min-height: 100px;\n}\n.stripe-error[_ngcontent-%COMP%] {\n  color: #e53935;\n  font-size: 0.9rem;\n  margin-top: 8px;\n}\n.pay-btn[_ngcontent-%COMP%] {\n  height: 52px;\n  font-size: 1rem;\n}\n.success-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 64px;\n}\n.success-icon[_ngcontent-%COMP%] {\n  font-size: 80px;\n  width: 80px;\n  height: 80px;\n  color: #43a047;\n  display: block;\n  margin: 0 auto 24px;\n}\n.pix-info[_ngcontent-%COMP%] {\n  background: #f3e5f5;\n  padding: 16px;\n  border-radius: 8px;\n}\n/*# sourceMappingURL=checkout.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CheckoutComponent, { className: "CheckoutComponent", filePath: "src\\app\\features\\checkout\\checkout.component.ts", lineNumber: 131 });
})();
export {
  CheckoutComponent
};
//# sourceMappingURL=chunk-DCVCUG2D.js.map
