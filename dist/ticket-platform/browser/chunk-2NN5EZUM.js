import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-CVSV6LR3.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-Z5A633E3.js";
import "./chunk-XPY4B3TJ.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-B3VC7F6K.js";
import "./chunk-NP2OLDGZ.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle,
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-5GAUGJ64.js";
import "./chunk-7C6TSSWH.js";
import {
  HttpClient,
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
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-L24MRG7B.js";

// src/app/core/services/loyalty.service.ts
var LoyaltyService = class _LoyaltyService {
  constructor(http) {
    this.http = http;
    this.BASE_URL = "/Loyalty";
  }
  getBalance() {
    return this.http.get(`${this.BASE_URL}/balance`);
  }
  getHistory() {
    return this.http.get(`${this.BASE_URL}/history`);
  }
  static {
    this.\u0275fac = function LoyaltyService_Factory(t) {
      return new (t || _LoyaltyService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LoyaltyService, factory: _LoyaltyService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/loyalty/loyalty.component.ts
var _c0 = () => ["date", "description", "type", "points"];
function LoyaltyComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "mat-card", 4)(2, "div", 5)(3, "mat-icon");
    \u0275\u0275text(4, "stars");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "span", 6);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 7);
    \u0275\u0275text(9, "pontos acumulados");
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(10, "mat-divider", 8);
    \u0275\u0275elementStart(11, "div", 9)(12, "mat-icon");
    \u0275\u0275text(13, "redeem");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div")(15, "span", 10);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 11);
    \u0275\u0275text(19, "dispon\xEDvel para resgate");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(20, "mat-card", 12)(21, "mat-card-header")(22, "mat-card-title");
    \u0275\u0275text(23, "Como funciona?");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "mat-card-content")(25, "div", 13)(26, "mat-icon");
    \u0275\u0275text(27, "shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29, "Ganhe ");
    \u0275\u0275elementStart(30, "strong");
    \u0275\u0275text(31, "1 ponto");
    \u0275\u0275elementEnd();
    \u0275\u0275text(32, " para cada ");
    \u0275\u0275elementStart(33, "strong");
    \u0275\u0275text(34, "R$1");
    \u0275\u0275elementEnd();
    \u0275\u0275text(35, " gasto em ingressos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 13)(37, "mat-icon");
    \u0275\u0275text(38, "redeem");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span");
    \u0275\u0275text(40, "Resgate ");
    \u0275\u0275elementStart(41, "strong");
    \u0275\u0275text(42, "100 pontos = R$5");
    \u0275\u0275elementEnd();
    \u0275\u0275text(43, " de desconto na pr\xF3xima compra");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 13)(45, "mat-icon");
    \u0275\u0275text(46, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "span");
    \u0275\u0275text(48, "M\xE1ximo de ");
    \u0275\u0275elementStart(49, "strong");
    \u0275\u0275text(50, "50%");
    \u0275\u0275elementEnd();
    \u0275\u0275text(51, " do valor do pedido pode ser pago com pontos");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.balance.points);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 2, ctx_r0.balance.redeemableValue, "BRL"));
  }
}
function LoyaltyComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "mat-progress-spinner", 14);
    \u0275\u0275elementEnd();
  }
}
function LoyaltyComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1, "Nenhuma transa\xE7\xE3o ainda. Compre ingressos para acumular pontos!");
    \u0275\u0275elementEnd();
  }
}
function LoyaltyComponent_Conditional_11_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "Data");
    \u0275\u0275elementEnd();
  }
}
function LoyaltyComponent_Conditional_11_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 27);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, t_r2.createdAt, "dd/MM/yyyy"));
  }
}
function LoyaltyComponent_Conditional_11_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "Descri\xE7\xE3o");
    \u0275\u0275elementEnd();
  }
}
function LoyaltyComponent_Conditional_11_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r3.description);
  }
}
function LoyaltyComponent_Conditional_11_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "Tipo");
    \u0275\u0275elementEnd();
  }
}
function LoyaltyComponent_Conditional_11_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 27)(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap(t_r4.points > 0 ? "status-active" : "status-cancelled");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getTypeName(t_r4.transactionType), " ");
  }
}
function LoyaltyComponent_Conditional_11_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "Pontos");
    \u0275\u0275elementEnd();
  }
}
function LoyaltyComponent_Conditional_11_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r5 = ctx.$implicit;
    \u0275\u0275classMap(t_r5.points > 0 ? "points-positive" : "points-negative");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", t_r5.points > 0 ? "+" : "", "", t_r5.points, " ");
  }
}
function LoyaltyComponent_Conditional_11_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 28);
  }
}
function LoyaltyComponent_Conditional_11_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 29);
  }
}
function LoyaltyComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 16);
    \u0275\u0275elementContainerStart(1, 17);
    \u0275\u0275template(2, LoyaltyComponent_Conditional_11_th_2_Template, 2, 0, "th", 18)(3, LoyaltyComponent_Conditional_11_td_3_Template, 3, 4, "td", 19);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 20);
    \u0275\u0275template(5, LoyaltyComponent_Conditional_11_th_5_Template, 2, 0, "th", 18)(6, LoyaltyComponent_Conditional_11_td_6_Template, 2, 1, "td", 19);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 21);
    \u0275\u0275template(8, LoyaltyComponent_Conditional_11_th_8_Template, 2, 0, "th", 18)(9, LoyaltyComponent_Conditional_11_td_9_Template, 3, 3, "td", 19);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 22);
    \u0275\u0275template(11, LoyaltyComponent_Conditional_11_th_11_Template, 2, 0, "th", 18)(12, LoyaltyComponent_Conditional_11_td_12_Template, 2, 4, "td", 23);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(13, LoyaltyComponent_Conditional_11_tr_13_Template, 1, 0, "tr", 24)(14, LoyaltyComponent_Conditional_11_tr_14_Template, 1, 0, "tr", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r0.history);
    \u0275\u0275advance(13);
    \u0275\u0275property("matHeaderRowDef", \u0275\u0275pureFunction0(3, _c0));
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", \u0275\u0275pureFunction0(4, _c0));
  }
}
var LoyaltyComponent = class _LoyaltyComponent {
  constructor() {
    this.loyaltyService = inject(LoyaltyService);
    this.balance = null;
    this.history = [];
    this.loading = true;
  }
  ngOnInit() {
    this.loyaltyService.getBalance().subscribe({ next: (b) => {
      this.balance = b;
    } });
    this.loyaltyService.getHistory().subscribe({
      next: (h) => {
        this.history = h;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  getTypeName(type) {
    const names = { 0: "Ganhos", 1: "Resgatados", 2: "Expirados", 3: "B\xF4nus" };
    return names[type];
  }
  static {
    this.\u0275fac = function LoyaltyComponent_Factory(t) {
      return new (t || _LoyaltyComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoyaltyComponent, selectors: [["app-loyalty"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 12, vars: 2, consts: [[1, "container", "page-container"], [1, "section-title"], [1, "balance-section"], [2, "text-align", "center", "padding", "32px"], [1, "balance-card"], [1, "points-display"], [1, "points-number"], [1, "points-label"], ["vertical", ""], [1, "redeem-display"], [1, "redeem-value"], [1, "redeem-label"], [1, "how-works-card"], [1, "how-item"], ["mode", "indeterminate"], [2, "color", "#757575", "padding", "24px", "text-align", "center"], ["mat-table", "", 1, "full-width", 3, "dataSource"], ["matColumnDef", "date"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "description"], ["matColumnDef", "type"], ["matColumnDef", "points"], ["mat-cell", "", 3, "class", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""]], template: function LoyaltyComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
        \u0275\u0275text(2, "Programa de Fidelidade");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, LoyaltyComponent_Conditional_3_Template, 52, 5, "div", 2);
        \u0275\u0275elementStart(4, "mat-card")(5, "mat-card-header")(6, "mat-card-title");
        \u0275\u0275text(7, "Hist\xF3rico de Pontos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "mat-card-content");
        \u0275\u0275template(9, LoyaltyComponent_Conditional_9_Template, 2, 0, "div", 3)(10, LoyaltyComponent_Conditional_10_Template, 2, 0)(11, LoyaltyComponent_Conditional_11_Template, 15, 5);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(3, ctx.balance ? 3 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275conditional(9, ctx.loading ? 9 : ctx.history.length === 0 ? 10 : 11);
      }
    }, dependencies: [CommonModule, CurrencyPipe, DatePipe, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatButtonModule, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatChipsModule, MatChip, MatDividerModule, MatDivider], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n}\n.balance-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n  margin-bottom: 24px;\n}\n@media (max-width: 768px) {\n  .balance-section[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.balance-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  padding: 32px;\n  gap: 24px;\n}\n.points-display[_ngcontent-%COMP%], .redeem-display[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.points-display[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .redeem-display[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n}\n.points-display[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #ffd600;\n}\n.redeem-display[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #43a047;\n}\n.points-number[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 2.5rem;\n  font-weight: 700;\n  line-height: 1;\n}\n.points-label[_ngcontent-%COMP%], .redeem-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.85rem;\n  color: #757575;\n}\n.redeem-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 2rem;\n  font-weight: 700;\n  color: #43a047;\n  line-height: 1;\n}\n.how-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 0;\n  border-bottom: 1px solid #f0f0f0;\n}\n.how-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #6200ea;\n}\n.points-positive[_ngcontent-%COMP%] {\n  color: #43a047;\n  font-weight: 600;\n}\n.points-negative[_ngcontent-%COMP%] {\n  color: #e53935;\n  font-weight: 600;\n}\n/*# sourceMappingURL=loyalty.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoyaltyComponent, { className: "LoyaltyComponent", filePath: "src\\app\\features\\loyalty\\loyalty.component.ts", lineNumber: 114 });
})();
export {
  LoyaltyComponent
};
//# sourceMappingURL=chunk-2NN5EZUM.js.map
