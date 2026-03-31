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
} from "./chunk-DRKPIYD7.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-TKNABAPT.js";
import {
  EventService
} from "./chunk-VFNTAZYT.js";
import "./chunk-6E6SU7EL.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-WFDIMCN2.js";
import {
  EventStatus
} from "./chunk-WMQBKU7S.js";
import "./chunk-S33CHFYN.js";
import "./chunk-UMZOVFGQ.js";
import {
  MatCard,
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
  MatAnchor,
  MatButtonModule,
  MatIcon,
  MatIconAnchor,
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
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-PY3RLCY5.js";

// src/app/features/admin/admin.component.ts
var _c0 = (a0) => ["/events", a0];
function AdminComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275element(1, "mat-progress-spinner", 18);
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "mat-icon");
    \u0275\u0275text(2, "event_note");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Nenhum evento criado. ");
    \u0275\u0275elementStart(5, "a", 20);
    \u0275\u0275text(6, "Criar primeiro evento");
    \u0275\u0275elementEnd()()();
  }
}
function AdminComponent_Conditional_69_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Evento");
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_69_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r1.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", e_r1.city, "/", e_r1.state, "");
  }
}
function AdminComponent_Conditional_69_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Data");
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_69_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, e_r2.dateTime, "dd/MM/yyyy"));
  }
}
function AdminComponent_Conditional_69_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Status");
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_69_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33)(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r3.getStatusClass(e_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.getStatusLabel(e_r3.status));
  }
}
function AdminComponent_Conditional_69_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Vendidos");
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_69_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", e_r5.totalTicketsAvailable, " dispon\xEDveis");
  }
}
function AdminComponent_Conditional_69_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Pre\xE7o M\xEDn.");
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_69_td_15_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Gr\xE1tis ");
  }
}
function AdminComponent_Conditional_69_td_15_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "currency");
  }
  if (rf & 2) {
    const e_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, e_r6.minPrice, "BRL"), " ");
  }
}
function AdminComponent_Conditional_69_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275template(1, AdminComponent_Conditional_69_td_15_Conditional_1_Template, 1, 0)(2, AdminComponent_Conditional_69_td_15_Conditional_2_Template, 2, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(1, e_r6.minPrice === 0 ? 1 : 2);
  }
}
function AdminComponent_Conditional_69_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "A\xE7\xF5es");
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_69_td_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 33)(1, "a", 34)(2, "mat-icon");
    \u0275\u0275text(3, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 35);
    \u0275\u0275listener("click", function AdminComponent_Conditional_69_td_18_Template_button_click_4_listener() {
      const e_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.cancelEvent(e_r8));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const e_r8 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c0, e_r8.id));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", e_r8.status !== ctx_r3.EventStatus.Active);
  }
}
function AdminComponent_Conditional_69_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 36);
  }
}
function AdminComponent_Conditional_69_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 37);
  }
}
function AdminComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 21);
    \u0275\u0275elementContainerStart(1, 22);
    \u0275\u0275template(2, AdminComponent_Conditional_69_th_2_Template, 2, 0, "th", 23)(3, AdminComponent_Conditional_69_td_3_Template, 6, 3, "td", 24);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 25);
    \u0275\u0275template(5, AdminComponent_Conditional_69_th_5_Template, 2, 0, "th", 23)(6, AdminComponent_Conditional_69_td_6_Template, 3, 4, "td", 24);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 26);
    \u0275\u0275template(8, AdminComponent_Conditional_69_th_8_Template, 2, 0, "th", 23)(9, AdminComponent_Conditional_69_td_9_Template, 3, 3, "td", 24);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 27);
    \u0275\u0275template(11, AdminComponent_Conditional_69_th_11_Template, 2, 0, "th", 23)(12, AdminComponent_Conditional_69_td_12_Template, 2, 1, "td", 24);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 28);
    \u0275\u0275template(14, AdminComponent_Conditional_69_th_14_Template, 2, 0, "th", 23)(15, AdminComponent_Conditional_69_td_15_Template, 3, 1, "td", 24);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 29);
    \u0275\u0275template(17, AdminComponent_Conditional_69_th_17_Template, 2, 0, "th", 23)(18, AdminComponent_Conditional_69_td_18_Template, 7, 4, "td", 24);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(19, AdminComponent_Conditional_69_tr_19_Template, 1, 0, "tr", 30)(20, AdminComponent_Conditional_69_tr_20_Template, 1, 0, "tr", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r3.events);
    \u0275\u0275advance(19);
    \u0275\u0275property("matHeaderRowDef", ctx_r3.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r3.displayedColumns);
  }
}
var AdminComponent = class _AdminComponent {
  constructor() {
    this.eventService = inject(EventService);
    this.snackBar = inject(MatSnackBar);
    this.events = [];
    this.loading = true;
    this.EventStatus = EventStatus;
    this.displayedColumns = ["title", "dateTime", "status", "tickets", "minPrice", "actions"];
  }
  get activeEvents() {
    return this.events.filter((e) => e.status === EventStatus.Active).length;
  }
  get totalSold() {
    return this.events.reduce((sum, e) => sum + (e.totalTicketsAvailable > 0 ? 0 : 0), 0);
  }
  ngOnInit() {
    this.eventService.getMyEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  cancelEvent(event) {
    if (!confirm(`Cancelar o evento "${event.title}"?`))
      return;
    this.eventService.updateEvent(event.id, { status: EventStatus.Cancelled }).subscribe({
      next: () => {
        event.status = EventStatus.Cancelled;
        this.snackBar.open("Evento cancelado.", "OK", { duration: 3e3 });
      },
      error: (err) => this.snackBar.open(err.error?.error || "Erro ao cancelar", "Fechar", { duration: 3e3 })
    });
  }
  getStatusLabel(status) {
    const labels = { 0: "Rascunho", 1: "Ativo", 2: "Cancelado", 3: "Encerrado" };
    return labels[status] || "Desconhecido";
  }
  getStatusClass(status) {
    const classes = { 1: "status-active", 2: "status-cancelled", 0: "status-pending", 3: "status-pending" };
    return classes[status] || "";
  }
  static {
    this.\u0275fac = function AdminComponent_Factory(t) {
      return new (t || _AdminComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminComponent, selectors: [["app-admin"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 70, vars: 4, consts: [[1, "container", "page-container"], [1, "page-header"], [1, "section-title"], ["mat-raised-button", "", "color", "primary", "routerLink", "/admin/create-event"], [1, "stats-grid"], [1, "stat-card"], ["color", "primary"], [2, "color", "#ff6d00"], [1, "tools-section"], [1, "tools-title"], [1, "tools-grid"], ["mat-raised-button", "", "routerLink", "/admin/analytics", 1, "tool-btn"], ["mat-raised-button", "", "routerLink", "/admin/affiliates", 1, "tool-btn"], ["mat-raised-button", "", "routerLink", "/admin/coupons", 1, "tool-btn"], ["mat-raised-button", "", "color", "primary", "routerLink", "/admin/payment-links", 1, "tool-btn"], ["mat-raised-button", "", "color", "warn", "routerLink", "/admin/flash-sales", 1, "tool-btn"], [1, "table-card"], [1, "loading-overlay"], ["mode", "indeterminate"], [1, "empty-state"], ["routerLink", "/admin/create-event"], ["mat-table", "", 1, "full-width", 3, "dataSource"], ["matColumnDef", "title"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "dateTime"], ["matColumnDef", "status"], ["matColumnDef", "tickets"], ["matColumnDef", "minPrice"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-icon-button", "", "title", "Ver evento", 3, "routerLink"], ["mat-icon-button", "", "color", "warn", "title", "Cancelar", 3, "click", "disabled"], ["mat-header-row", ""], ["mat-row", ""]], template: function AdminComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Painel do Organizador");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 3)(5, "mat-icon");
        \u0275\u0275text(6, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Novo Evento ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 4)(9, "mat-card", 5)(10, "mat-icon");
        \u0275\u0275text(11, "event");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div")(13, "h3");
        \u0275\u0275text(14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "p");
        \u0275\u0275text(16, "Total de Eventos");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(17, "mat-card", 5)(18, "mat-icon", 6);
        \u0275\u0275text(19, "check_circle");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div")(21, "h3");
        \u0275\u0275text(22);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "p");
        \u0275\u0275text(24, "Eventos Ativos");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(25, "mat-card", 5)(26, "mat-icon", 7);
        \u0275\u0275text(27, "confirmation_number");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div")(29, "h3");
        \u0275\u0275text(30);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "p");
        \u0275\u0275text(32, "Ingressos Vendidos");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(33, "div", 8)(34, "h2", 9);
        \u0275\u0275text(35, "Ferramentas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "div", 10)(37, "a", 11)(38, "mat-icon");
        \u0275\u0275text(39, "bar_chart");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "span");
        \u0275\u0275text(41, "Analytics");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "a", 12)(43, "mat-icon");
        \u0275\u0275text(44, "share");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "span");
        \u0275\u0275text(46, "Afiliados");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(47, "a", 13)(48, "mat-icon");
        \u0275\u0275text(49, "discount");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "span");
        \u0275\u0275text(51, "Cupons");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "a", 14)(53, "mat-icon");
        \u0275\u0275text(54, "add_link");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "span");
        \u0275\u0275text(56, "Links de Pagamento");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(57, "a", 15)(58, "mat-icon");
        \u0275\u0275text(59, "bolt");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "span");
        \u0275\u0275text(61, "Promo\xE7\xF5es Flash");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(62, "mat-card", 16)(63, "mat-card-header")(64, "mat-card-title");
        \u0275\u0275text(65, "Meus Eventos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(66, "mat-card-content");
        \u0275\u0275template(67, AdminComponent_Conditional_67_Template, 2, 0, "div", 17)(68, AdminComponent_Conditional_68_Template, 7, 0)(69, AdminComponent_Conditional_69_Template, 21, 3);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(14);
        \u0275\u0275textInterpolate(ctx.events.length);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.activeEvents);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.totalSold);
        \u0275\u0275advance(37);
        \u0275\u0275conditional(67, ctx.loading ? 67 : ctx.events.length === 0 ? 68 : 69);
      }
    }, dependencies: [
      CommonModule,
      CurrencyPipe,
      DatePipe,
      RouterLink,
      MatButtonModule,
      MatAnchor,
      MatIconAnchor,
      MatIconButton,
      MatCardModule,
      MatCard,
      MatCardContent,
      MatCardHeader,
      MatCardTitle,
      MatIconModule,
      MatIcon,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatTableModule,
      MatTable,
      MatHeaderCellDef,
      MatHeaderRowDef,
      MatColumnDef,
      MatCellDef,
      MatRowDef,
      MatHeaderCell,
      MatCell,
      MatHeaderRow,
      MatRow,
      MatChipsModule,
      MatChip,
      MatSnackBarModule
    ], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n  margin-bottom: 32px;\n}\n@media (max-width: 600px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.stat-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 24px;\n}\n.stat-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n}\n.stat-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  margin: 0;\n}\n.stat-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #757575;\n}\n.tools-section[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.tools-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin: 0 0 16px;\n  color: #424242;\n}\n.tools-grid[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.tool-btn[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  padding: 20px 32px;\n}\n.tool-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  width: 28px;\n  height: 28px;\n}\n.tool-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n.table-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 32px;\n  color: #757575;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  display: block;\n  margin: 0 auto 8px;\n}\n.empty-state[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #6200ea;\n}\n/*# sourceMappingURL=admin.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminComponent, { className: "AdminComponent", filePath: "src\\app\\features\\admin\\admin.component.ts", lineNumber: 173 });
})();
export {
  AdminComponent
};
//# sourceMappingURL=chunk-ZRVS2545.js.map
