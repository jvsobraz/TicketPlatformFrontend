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
import {
  RouterLink
} from "./chunk-7C6TSSWH.js";
import {
  HttpClient,
  MatAnchor,
  MatButtonModule,
  MatIcon,
  MatIconModule
} from "./chunk-NW3FCLJU.js";
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
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-L24MRG7B.js";

// src/app/core/services/analytics.service.ts
var AnalyticsService = class _AnalyticsService {
  constructor(http) {
    this.http = http;
    this.BASE_URL = "/Analytics";
  }
  getDashboard() {
    return this.http.get(`${this.BASE_URL}/dashboard`);
  }
  getEventAnalytics(eventId) {
    return this.http.get(`${this.BASE_URL}/events/${eventId}`);
  }
  static {
    this.\u0275fac = function AnalyticsService_Factory(t) {
      return new (t || _AnalyticsService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AnalyticsService, factory: _AnalyticsService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/admin/analytics/analytics.component.ts
var _forTrack0 = ($index, $item) => $item.date;
var _c0 = () => ["title", "tickets", "revenue", "actions"];
var _c1 = (a0) => ["/events", a0];
var _c2 = (a0) => ["/admin/analytics", a0];
function AnalyticsComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "mat-progress-spinner", 5);
    \u0275\u0275elementEnd();
  }
}
function AnalyticsComponent_Conditional_9_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, "Sem dados de vendas ainda.");
    \u0275\u0275elementEnd();
  }
}
function AnalyticsComponent_Conditional_9_Conditional_32_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275element(3, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 18);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const day_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("title", day_r1.date + ": " + \u0275\u0275pipeBind2(2, 4, day_r1.revenue, "BRL"));
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("height", ctx_r1.getBarHeight(day_r1.revenue), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 7, day_r1.date, "dd/MM"));
  }
}
function AnalyticsComponent_Conditional_9_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275repeaterCreate(1, AnalyticsComponent_Conditional_9_Conditional_32_For_2_Template, 7, 10, "div", 15, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.dashboard.salesByDay);
  }
}
function AnalyticsComponent_Conditional_9_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, "Nenhum evento com vendas ainda.");
    \u0275\u0275elementEnd();
  }
}
function AnalyticsComponent_Conditional_9_Conditional_39_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 28);
    \u0275\u0275text(1, "Evento");
    \u0275\u0275elementEnd();
  }
}
function AnalyticsComponent_Conditional_9_Conditional_39_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 29)(1, "a", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c1, e_r3.eventId));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r3.title);
  }
}
function AnalyticsComponent_Conditional_9_Conditional_39_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 28);
    \u0275\u0275text(1, "Ingressos");
    \u0275\u0275elementEnd();
  }
}
function AnalyticsComponent_Conditional_9_Conditional_39_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r4.ticketsSold);
  }
}
function AnalyticsComponent_Conditional_9_Conditional_39_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 28);
    \u0275\u0275text(1, "Receita");
    \u0275\u0275elementEnd();
  }
}
function AnalyticsComponent_Conditional_9_Conditional_39_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 29);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, e_r5.revenue, "BRL"));
  }
}
function AnalyticsComponent_Conditional_9_Conditional_39_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 28);
  }
}
function AnalyticsComponent_Conditional_9_Conditional_39_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 29)(1, "a", 31);
    \u0275\u0275text(2, "Detalhes");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c2, e_r6.eventId));
  }
}
function AnalyticsComponent_Conditional_9_Conditional_39_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 32);
  }
}
function AnalyticsComponent_Conditional_9_Conditional_39_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 33);
  }
}
function AnalyticsComponent_Conditional_9_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 19);
    \u0275\u0275elementContainerStart(1, 20);
    \u0275\u0275template(2, AnalyticsComponent_Conditional_9_Conditional_39_th_2_Template, 2, 0, "th", 21)(3, AnalyticsComponent_Conditional_9_Conditional_39_td_3_Template, 3, 4, "td", 22);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 23);
    \u0275\u0275template(5, AnalyticsComponent_Conditional_9_Conditional_39_th_5_Template, 2, 0, "th", 21)(6, AnalyticsComponent_Conditional_9_Conditional_39_td_6_Template, 2, 1, "td", 22);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 24);
    \u0275\u0275template(8, AnalyticsComponent_Conditional_9_Conditional_39_th_8_Template, 2, 0, "th", 21)(9, AnalyticsComponent_Conditional_9_Conditional_39_td_9_Template, 3, 4, "td", 22);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 25);
    \u0275\u0275template(11, AnalyticsComponent_Conditional_9_Conditional_39_th_11_Template, 1, 0, "th", 21)(12, AnalyticsComponent_Conditional_9_Conditional_39_td_12_Template, 3, 3, "td", 22);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(13, AnalyticsComponent_Conditional_9_Conditional_39_tr_13_Template, 1, 0, "tr", 26)(14, AnalyticsComponent_Conditional_9_Conditional_39_tr_14_Template, 1, 0, "tr", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("dataSource", ctx_r1.dashboard.topEvents);
    \u0275\u0275advance(13);
    \u0275\u0275property("matHeaderRowDef", \u0275\u0275pureFunction0(3, _c0));
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", \u0275\u0275pureFunction0(4, _c0));
  }
}
function AnalyticsComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "mat-card", 7)(2, "mat-icon");
    \u0275\u0275text(3, "attach_money");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "span", 8);
    \u0275\u0275text(6, "Receita Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 9);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "mat-card", 10)(11, "mat-icon");
    \u0275\u0275text(12, "confirmation_number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "span", 8);
    \u0275\u0275text(15, "Ingressos Vendidos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 9);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "mat-card", 11)(19, "mat-icon");
    \u0275\u0275text(20, "event");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div")(22, "span", 8);
    \u0275\u0275text(23, "Eventos Ativos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 9);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(26, "mat-card", 12)(27, "mat-card-header")(28, "mat-card-title");
    \u0275\u0275text(29, "Vendas por Dia (\xFAltimos 30 dias)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "mat-card-content");
    \u0275\u0275template(31, AnalyticsComponent_Conditional_9_Conditional_31_Template, 2, 0, "p", 13)(32, AnalyticsComponent_Conditional_9_Conditional_32_Template, 3, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "mat-card")(34, "mat-card-header")(35, "mat-card-title");
    \u0275\u0275text(36, "Top Eventos por Receita");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "mat-card-content");
    \u0275\u0275template(38, AnalyticsComponent_Conditional_9_Conditional_38_Template, 2, 0, "p", 13)(39, AnalyticsComponent_Conditional_9_Conditional_39_Template, 15, 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 6, ctx_r1.dashboard.totalRevenue, "BRL"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.dashboard.totalTicketsSold);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate2("", ctx_r1.dashboard.activeEvents, " / ", ctx_r1.dashboard.totalEvents, "");
    \u0275\u0275advance(6);
    \u0275\u0275conditional(31, ctx_r1.dashboard.salesByDay.length === 0 ? 31 : 32);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(38, ctx_r1.dashboard.topEvents.length === 0 ? 38 : 39);
  }
}
var AnalyticsComponent = class _AnalyticsComponent {
  constructor() {
    this.analyticsService = inject(AnalyticsService);
    this.dashboard = null;
    this.loading = true;
    this.maxRevenue = 1;
  }
  ngOnInit() {
    this.analyticsService.getDashboard().subscribe({
      next: (data) => {
        this.dashboard = data;
        this.maxRevenue = Math.max(...data.salesByDay.map((d) => d.revenue), 1);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  getBarHeight(revenue) {
    return Math.max(revenue / this.maxRevenue * 100, 2);
  }
  static {
    this.\u0275fac = function AnalyticsComponent_Factory(t) {
      return new (t || _AnalyticsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnalyticsComponent, selectors: [["app-analytics"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 10, vars: 1, consts: [[1, "container", "page-container"], [1, "page-header"], [1, "section-title"], ["mat-button", "", "routerLink", "/admin"], [2, "text-align", "center", "padding", "64px"], ["mode", "indeterminate"], [1, "kpi-grid"], [1, "kpi-card", "primary"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-card", "success"], [1, "kpi-card", "accent"], [1, "chart-card"], [1, "empty-msg"], [1, "bar-chart"], [1, "bar-col"], [1, "bar-wrap", 3, "title"], [1, "bar"], [1, "bar-label"], ["mat-table", "", 1, "full-width", 3, "dataSource"], ["matColumnDef", "title"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "tickets"], ["matColumnDef", "revenue"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [3, "routerLink"], ["mat-button", "", 3, "routerLink"], ["mat-header-row", ""], ["mat-row", ""]], template: function AnalyticsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Analytics");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 3)(5, "mat-icon");
        \u0275\u0275text(6, "arrow_back");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Voltar");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, AnalyticsComponent_Conditional_8_Template, 2, 0, "div", 4)(9, AnalyticsComponent_Conditional_9_Template, 40, 9);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275conditional(8, ctx.loading ? 8 : ctx.dashboard ? 9 : -1);
      }
    }, dependencies: [CommonModule, CurrencyPipe, DatePipe, RouterLink, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatButtonModule, MatAnchor, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatDividerModule], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.kpi-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n  margin-bottom: 24px;\n}\n@media (max-width: 600px) {\n  .kpi-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.kpi-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 24px;\n}\n.kpi-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  width: 40px;\n  height: 40px;\n}\n.kpi-card[_ngcontent-%COMP%]   .kpi-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.85rem;\n  color: #757575;\n}\n.kpi-card[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.8rem;\n  font-weight: 700;\n}\n.kpi-card.primary[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #6200ea;\n}\n.kpi-card.success[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #43a047;\n}\n.kpi-card.accent[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #ff6d00;\n}\n.chart-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.bar-chart[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 4px;\n  height: 180px;\n  overflow-x: auto;\n  padding: 8px 0;\n}\n.bar-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-width: 28px;\n}\n.bar-wrap[_ngcontent-%COMP%] {\n  height: 160px;\n  display: flex;\n  align-items: flex-end;\n}\n.bar[_ngcontent-%COMP%] {\n  width: 20px;\n  background: #6200ea;\n  border-radius: 4px 4px 0 0;\n  min-height: 4px;\n  transition: height 0.3s;\n}\n.bar-label[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  color: #757575;\n  margin-top: 4px;\n  white-space: nowrap;\n}\n.empty-msg[_ngcontent-%COMP%] {\n  color: #757575;\n  padding: 24px;\n  text-align: center;\n}\n/*# sourceMappingURL=analytics.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnalyticsComponent, { className: "AnalyticsComponent", filePath: "src\\app\\features\\admin\\analytics\\analytics.component.ts", lineNumber: 132 });
})();
export {
  AnalyticsComponent
};
//# sourceMappingURL=chunk-WPRKG5L6.js.map
