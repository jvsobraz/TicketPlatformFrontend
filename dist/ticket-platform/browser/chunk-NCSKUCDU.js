import {
  MatChipsModule
} from "./chunk-Z5A633E3.js";
import "./chunk-XPY4B3TJ.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-2MT4FJQU.js";
import "./chunk-4CH56522.js";
import "./chunk-NP2OLDGZ.js";
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
} from "./chunk-5GAUGJ64.js";
import "./chunk-7C6TSSWH.js";
import {
  HttpClient,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule
} from "./chunk-NW3FCLJU.js";
import "./chunk-6UWFS5XU.js";
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
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
  ɵɵtextInterpolate1
} from "./chunk-L24MRG7B.js";

// src/app/core/services/resale.service.ts
var ResaleService = class _ResaleService {
  constructor(http) {
    this.http = http;
    this.BASE_URL = "/Resale";
  }
  listForResale(ticketId, askingPrice) {
    return this.http.post(this.BASE_URL, { ticketId, askingPrice });
  }
  getEventResales(eventId) {
    return this.http.get(`${this.BASE_URL}/events/${eventId}`);
  }
  purchaseResale(id) {
    return this.http.post(`${this.BASE_URL}/${id}/purchase`, {});
  }
  cancelResale(id) {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }
  static {
    this.\u0275fac = function ResaleService_Factory(t) {
      return new (t || _ResaleService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ResaleService, factory: _ResaleService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/resale/resale.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ResaleComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "mat-progress-spinner", 4);
    \u0275\u0275elementEnd();
  }
}
function ResaleComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "mat-icon");
    \u0275\u0275text(2, "sell");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Nenhum ingresso \xE0 venda");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "N\xE3o h\xE1 ingressos dispon\xEDveis para revenda no momento.");
    \u0275\u0275elementEnd()();
  }
}
function ResaleComponent_Conditional_7_For_2_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 17);
  }
}
function ResaleComponent_Conditional_7_For_2_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "currency");
  }
  if (rf & 2) {
    const r_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Comprar por ", \u0275\u0275pipeBind2(3, 1, r_r2.askingPrice, "BRL"), " ");
  }
}
function ResaleComponent_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 7)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-card-subtitle");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-card-content")(7, "div", 8)(8, "div", 9)(9, "mat-icon");
    \u0275\u0275text(10, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 10)(15, "div", 11)(16, "span", 12);
    \u0275\u0275text(17, "Pre\xE7o original");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 13)(22, "span", 12);
    \u0275\u0275text(23, "Pre\xE7o de venda");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 14);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 15)(28, "mat-icon");
    \u0275\u0275text(29, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(32, "mat-card-actions")(33, "button", 16);
    \u0275\u0275listener("click", function ResaleComponent_Conditional_7_For_2_Template_button_click_33_listener() {
      const r_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.purchase(r_r2));
    });
    \u0275\u0275template(34, ResaleComponent_Conditional_7_For_2_Conditional_34_Template, 1, 0, "mat-progress-spinner", 17)(35, ResaleComponent_Conditional_7_For_2_Conditional_35_Template, 4, 4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r2.eventTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r2.ticketTypeName);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 8, r_r2.eventDateTime, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(20, 11, r_r2.originalPrice, "BRL"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(26, 14, r_r2.askingPrice, "BRL"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Vendido por ", r_r2.sellerName, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.purchasing === r_r2.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(34, ctx_r2.purchasing === r_r2.id ? 34 : 35);
  }
}
function ResaleComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275repeaterCreate(1, ResaleComponent_Conditional_7_For_2_Template, 36, 17, "mat-card", 7, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.resales);
  }
}
var ResaleComponent = class _ResaleComponent {
  constructor() {
    this.resaleService = inject(ResaleService);
    this.snackBar = inject(MatSnackBar);
    this.resales = [];
    this.loading = true;
    this.purchasing = null;
  }
  ngOnInit() {
    this.loading = false;
  }
  purchase(resale) {
    this.purchasing = resale.id;
    this.resaleService.purchaseResale(resale.id).subscribe({
      next: () => {
        this.resales = this.resales.filter((r) => r.id !== resale.id);
        this.purchasing = null;
        this.snackBar.open("Compra realizada! Verifique seus ingressos.", "OK", { duration: 4e3 });
      },
      error: (err) => {
        this.purchasing = null;
        this.snackBar.open(err.error?.error || "Erro ao comprar", "Fechar", { duration: 3e3 });
      }
    });
  }
  static {
    this.\u0275fac = function ResaleComponent_Factory(t) {
      return new (t || _ResaleComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResaleComponent, selectors: [["app-resale"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 8, vars: 1, consts: [[1, "container", "page-container"], [1, "section-title"], [1, "subtitle"], [2, "text-align", "center", "padding", "64px"], ["mode", "indeterminate"], [1, "empty-state"], [1, "resale-grid"], [1, "resale-card"], [1, "resale-info"], [1, "info-row"], [1, "price-section"], [1, "original-price"], [1, "price-label"], [1, "asking-price"], [1, "price"], [1, "seller-info"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "18", "mode", "indeterminate"]], template: function ResaleComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
        \u0275\u0275text(2, "Ingressos para Revenda");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "p", 2);
        \u0275\u0275text(4, "Compre ingressos de outros usu\xE1rios com seguran\xE7a. Pre\xE7os limitados ao valor original.");
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, ResaleComponent_Conditional_5_Template, 2, 0, "div", 3)(6, ResaleComponent_Conditional_6_Template, 7, 0)(7, ResaleComponent_Conditional_7_Template, 3, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275conditional(5, ctx.loading ? 5 : ctx.resales.length === 0 ? 6 : 7);
      }
    }, dependencies: [CommonModule, CurrencyPipe, DatePipe, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatButtonModule, MatButton, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatSnackBarModule, MatChipsModule], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: #757575;\n  margin: -16px 0 32px;\n}\n.resale-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 24px;\n}\n.resale-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.info-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #616161;\n  font-size: 0.9rem;\n}\n.info-row[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.price-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 12px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.price-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75rem;\n  color: #757575;\n  margin-bottom: 4px;\n}\n.original-price[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  text-decoration: line-through;\n  color: #9e9e9e;\n}\n.asking-price[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%] {\n  color: #6200ea;\n  font-size: 1.2rem;\n  font-weight: 700;\n}\n.seller-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.85rem;\n  color: #757575;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 64px;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #bdbdbd;\n  display: block;\n  margin: 0 auto 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #757575;\n}\n/*# sourceMappingURL=resale.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResaleComponent, { className: "ResaleComponent", filePath: "src\\app\\features\\resale\\resale.component.ts", lineNumber: 89 });
})();
export {
  ResaleComponent
};
//# sourceMappingURL=chunk-NCSKUCDU.js.map
