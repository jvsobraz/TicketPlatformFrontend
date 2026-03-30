import {
  MatChip,
  MatChipsModule
} from "./chunk-Z5A633E3.js";
import {
  WaitlistService
} from "./chunk-V27HT2EO.js";
import "./chunk-XPY4B3TJ.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-2MT4FJQU.js";
import {
  WaitlistStatus
} from "./chunk-ETZDFFQU.js";
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
import {
  RouterLink
} from "./chunk-7C6TSSWH.js";
import {
  MatAnchor,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule
} from "./chunk-NW3FCLJU.js";
import "./chunk-6UWFS5XU.js";
import {
  CommonModule,
  DatePipe,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-L24MRG7B.js";

// src/app/features/my-waitlist/my-waitlist.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = (a0) => ["/events", a0];
function MyWaitlistComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "mat-progress-spinner", 3);
    \u0275\u0275elementEnd();
  }
}
function MyWaitlistComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "mat-icon");
    \u0275\u0275text(2, "hourglass_empty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Nenhuma lista de espera");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Quando um ingresso esgotado tiver vaga, voc\xEA pode entrar na lista de espera.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 5);
    \u0275\u0275text(8, "Ver Eventos");
    \u0275\u0275elementEnd()();
  }
}
function MyWaitlistComponent_Conditional_5_For_2_Conditional_13_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r1 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Expira em: ", \u0275\u0275pipeBind2(2, 1, entry_r1.expiresAt, "dd/MM HH:mm"), "");
  }
}
function MyWaitlistComponent_Conditional_5_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "mat-icon");
    \u0275\u0275text(2, "notifications_active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5, "Sua vaga est\xE1 dispon\xEDvel!");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, MyWaitlistComponent_Conditional_5_For_2_Conditional_13_Conditional_6_Template, 3, 4, "p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 13);
    \u0275\u0275text(8, "Comprar Agora");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275conditional(6, entry_r1.expiresAt ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("href", entry_r1.buyUrl, \u0275\u0275sanitizeUrl);
  }
}
function MyWaitlistComponent_Conditional_5_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function MyWaitlistComponent_Conditional_5_For_2_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const entry_r1 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.leave(entry_r1));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "exit_to_app");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Sair da Fila ");
    \u0275\u0275elementEnd();
  }
}
function MyWaitlistComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 7)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-card-subtitle");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-card-content")(7, "div", 8)(8, "mat-chip");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 9);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, MyWaitlistComponent_Conditional_5_For_2_Conditional_13_Template, 9, 2, "div", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-card-actions");
    \u0275\u0275template(15, MyWaitlistComponent_Conditional_5_For_2_Conditional_15_Template, 4, 0, "button", 11);
    \u0275\u0275elementStart(16, "a", 12);
    \u0275\u0275text(17, "Ver Evento");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const entry_r1 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(entry_r1.eventTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", entry_r1.ticketTypeName, " \u2014 ", entry_r1.requestedQuantity, " ingresso(s)");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r2.getStatusClass(entry_r1.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getStatusLabel(entry_r1.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Na fila desde ", \u0275\u0275pipeBind2(12, 10, entry_r1.createdAt, "dd/MM/yyyy"), "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(13, entry_r1.status === ctx_r2.WaitlistStatus.Notified && entry_r1.buyUrl ? 13 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(15, entry_r1.status === ctx_r2.WaitlistStatus.Waiting ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(13, _c0, entry_r1.eventId));
  }
}
function MyWaitlistComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275repeaterCreate(1, MyWaitlistComponent_Conditional_5_For_2_Template, 18, 15, "mat-card", 7, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.entries);
  }
}
var MyWaitlistComponent = class _MyWaitlistComponent {
  constructor() {
    this.waitlistService = inject(WaitlistService);
    this.snackBar = inject(MatSnackBar);
    this.entries = [];
    this.loading = true;
    this.WaitlistStatus = WaitlistStatus;
  }
  ngOnInit() {
    this.waitlistService.getMyWaitlist().subscribe({
      next: (e) => {
        this.entries = e;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  leave(entry) {
    if (!confirm("Sair da lista de espera para este evento?"))
      return;
    this.waitlistService.leaveWaitlist(entry.id).subscribe({
      next: () => {
        this.entries = this.entries.filter((e) => e.id !== entry.id);
        this.snackBar.open("Removido da fila.", "OK", { duration: 3e3 });
      },
      error: (err) => this.snackBar.open(err.error?.error || "Erro", "Fechar", { duration: 3e3 })
    });
  }
  getStatusLabel(status) {
    const labels = { 0: "Aguardando", 1: "Notificado", 2: "Comprado", 3: "Expirado" };
    return labels[status];
  }
  getStatusClass(status) {
    const classes = { 0: "status-pending", 1: "status-active", 2: "status-active", 3: "status-cancelled" };
    return classes[status];
  }
  static {
    this.\u0275fac = function MyWaitlistComponent_Factory(t) {
      return new (t || _MyWaitlistComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MyWaitlistComponent, selectors: [["app-my-waitlist"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 1, consts: [[1, "container", "page-container"], [1, "section-title"], [2, "text-align", "center", "padding", "64px"], ["mode", "indeterminate"], [1, "empty-state"], ["mat-raised-button", "", "color", "primary", "routerLink", "/events"], [1, "entries-grid"], [1, "entry-card"], [1, "entry-status"], [1, "entry-date"], [1, "notified-banner"], ["mat-button", "", "color", "warn"], ["mat-button", "", 3, "routerLink"], ["mat-raised-button", "", "color", "accent", 3, "href"], ["mat-button", "", "color", "warn", 3, "click"]], template: function MyWaitlistComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
        \u0275\u0275text(2, "Lista de Espera");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, MyWaitlistComponent_Conditional_3_Template, 2, 0, "div", 2)(4, MyWaitlistComponent_Conditional_4_Template, 9, 0)(5, MyWaitlistComponent_Conditional_5_Template, 3, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(3, ctx.loading ? 3 : ctx.entries.length === 0 ? 4 : 5);
      }
    }, dependencies: [CommonModule, DatePipe, RouterLink, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatButtonModule, MatAnchor, MatButton, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatChipsModule, MatChip, MatSnackBarModule], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n}\n.entries-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n  gap: 24px;\n}\n.entry-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.entry-date[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #757575;\n}\n.notified-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: #fff3e0;\n  padding: 12px;\n  border-radius: 8px;\n  border-left: 4px solid #ff6d00;\n}\n.notified-banner[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #ff6d00;\n}\n.notified-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 0.85rem;\n  color: #757575;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 64px 16px;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #bdbdbd;\n  display: block;\n  margin: 0 auto 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #757575;\n  margin: 0 0 24px;\n}\n/*# sourceMappingURL=my-waitlist.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MyWaitlistComponent, { className: "MyWaitlistComponent", filePath: "src\\app\\features\\my-waitlist\\my-waitlist.component.ts", lineNumber: 84 });
})();
export {
  MyWaitlistComponent
};
//# sourceMappingURL=chunk-GFKFGCMQ.js.map
