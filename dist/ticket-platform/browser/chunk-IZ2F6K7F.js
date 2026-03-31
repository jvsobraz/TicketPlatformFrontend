import {
  MatDialogModule
} from "./chunk-2LN3YTXV.js";
import {
  MatChip,
  MatChipSet,
  MatChipsModule
} from "./chunk-TKNABAPT.js";
import "./chunk-6E6SU7EL.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-SM6YJ4BC.js";
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
  HttpClient,
  MatAnchor,
  MatButton,
  MatButtonModule,
  MatIcon,
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
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-PY3RLCY5.js";

// src/app/core/services/ticket.service.ts
var TicketService = class _TicketService {
  constructor(http) {
    this.http = http;
    this.BASE_URL = "/Tickets";
  }
  getMyTickets() {
    return this.http.get(`${this.BASE_URL}/my-tickets`);
  }
  getTicketById(id) {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }
  validateTicket(request) {
    return this.http.post(`${this.BASE_URL}/validate`, request);
  }
  static {
    this.\u0275fac = function TicketService_Factory(t) {
      return new (t || _TicketService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TicketService, factory: _TicketService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/my-tickets/my-tickets.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function MyTicketsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "mat-progress-spinner", 3);
    \u0275\u0275elementEnd();
  }
}
function MyTicketsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "mat-icon");
    \u0275\u0275text(2, "confirmation_number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Nenhum ingresso encontrado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Voc\xEA ainda n\xE3o comprou ingressos. Que tal explorar os eventos dispon\xEDveis?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 5);
    \u0275\u0275text(8, "Ver Eventos");
    \u0275\u0275elementEnd()();
  }
}
function MyTicketsComponent_Conditional_5_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 9);
    \u0275\u0275text(1, "Utilizado");
    \u0275\u0275elementEnd();
  }
}
function MyTicketsComponent_Conditional_5_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 18);
    \u0275\u0275text(1, "V\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function MyTicketsComponent_Conditional_5_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "UTILIZADO");
    \u0275\u0275elementEnd()();
  }
}
function MyTicketsComponent_Conditional_5_For_2_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ticket_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Utilizado em ", \u0275\u0275pipeBind2(2, 1, ticket_r2.usedAt, "dd/MM/yyyy HH:mm"), "");
  }
}
function MyTicketsComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 8)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-card-subtitle");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-chip-set");
    \u0275\u0275template(7, MyTicketsComponent_Conditional_5_For_2_Conditional_7_Template, 2, 0, "mat-chip", 9)(8, MyTicketsComponent_Conditional_5_For_2_Conditional_8_Template, 2, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "mat-card-content")(10, "div", 10);
    \u0275\u0275element(11, "img", 11);
    \u0275\u0275template(12, MyTicketsComponent_Conditional_5_For_2_Conditional_12_Template, 5, 0, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "mat-divider");
    \u0275\u0275elementStart(14, "div", 13)(15, "div", 14)(16, "mat-icon");
    \u0275\u0275text(17, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 14)(22, "mat-icon");
    \u0275\u0275text(23, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 14)(27, "mat-icon");
    \u0275\u0275text(28, "confirmation_number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 15);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 14)(32, "mat-icon");
    \u0275\u0275text(33, "attach_money");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span");
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(37, MyTicketsComponent_Conditional_5_For_2_Conditional_37_Template, 3, 4, "p", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "mat-card-actions")(39, "button", 17);
    \u0275\u0275listener("click", function MyTicketsComponent_Conditional_5_For_2_Template_button_click_39_listener() {
      const ticket_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.downloadQRCode(ticket_r2));
    });
    \u0275\u0275elementStart(40, "mat-icon");
    \u0275\u0275text(41, "download");
    \u0275\u0275elementEnd();
    \u0275\u0275text(42, " Salvar QR Code ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ticket_r2 = ctx.$implicit;
    \u0275\u0275classProp("used-ticket", ticket_r2.isUsed);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ticket_r2.eventTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ticket_r2.ticketTypeName);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(7, ticket_r2.isUsed ? 7 : 8);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("qr-used", ticket_r2.isUsed);
    \u0275\u0275property("src", "data:image/png;base64," + ticket_r2.qrCodeBase64, \u0275\u0275sanitizeUrl)("alt", "QR Code " + ticket_r2.serialNumber);
    \u0275\u0275advance();
    \u0275\u0275conditional(12, ticket_r2.isUsed ? 12 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(20, 16, ticket_r2.eventDateTime, "dd/MM/yyyy - HH:mm"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", ticket_r2.eventVenue, ", ", ticket_r2.eventCity, "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ticket_r2.serialNumber);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(36, 19, ticket_r2.unitPrice, "BRL"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(37, ticket_r2.isUsed && ticket_r2.usedAt ? 37 : -1);
  }
}
function MyTicketsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275repeaterCreate(1, MyTicketsComponent_Conditional_5_For_2_Template, 43, 22, "mat-card", 7, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.tickets);
  }
}
var MyTicketsComponent = class _MyTicketsComponent {
  constructor() {
    this.ticketService = inject(TicketService);
    this.tickets = [];
    this.loading = true;
  }
  ngOnInit() {
    this.ticketService.getMyTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  downloadQRCode(ticket) {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${ticket.qrCodeBase64}`;
    link.download = `ingresso-${ticket.serialNumber}.png`;
    link.click();
  }
  static {
    this.\u0275fac = function MyTicketsComponent_Factory(t) {
      return new (t || _MyTicketsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MyTicketsComponent, selectors: [["app-my-tickets"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 1, consts: [[1, "container", "page-container"], [1, "section-title"], [1, "loading-overlay"], ["mode", "indeterminate"], [1, "empty-state"], ["mat-raised-button", "", "color", "primary", "routerLink", "/events"], [1, "tickets-grid"], [1, "ticket-card", 3, "used-ticket"], [1, "ticket-card"], ["color", "warn"], [1, "qr-code-container"], [1, "qr-code-image", 3, "src", "alt"], [1, "used-overlay"], [1, "ticket-details"], [1, "detail-row"], [1, "serial"], [1, "used-info"], ["mat-button", "", 3, "click"], ["color", "primary"]], template: function MyTicketsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
        \u0275\u0275text(2, "Meus Ingressos");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, MyTicketsComponent_Conditional_3_Template, 2, 0, "div", 2)(4, MyTicketsComponent_Conditional_4_Template, 9, 0)(5, MyTicketsComponent_Conditional_5_Template, 3, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(3, ctx.loading ? 3 : ctx.tickets.length === 0 ? 4 : 5);
      }
    }, dependencies: [CommonModule, CurrencyPipe, DatePipe, MatButtonModule, MatAnchor, MatButton, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatChipsModule, MatChip, MatChipSet, MatDialogModule, MatDividerModule, MatDivider], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n}\n.tickets-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 24px;\n}\n.ticket-card[_ngcontent-%COMP%] {\n  position: relative;\n}\n.used-ticket[_ngcontent-%COMP%] {\n  opacity: 0.7;\n}\n.qr-code-container[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  padding: 16px 0;\n}\n.qr-code-image[_ngcontent-%COMP%] {\n  width: 220px;\n  height: 220px;\n  border: 2px solid #e0e0e0;\n  border-radius: 8px;\n}\n.qr-used[_ngcontent-%COMP%] {\n  filter: grayscale(80%);\n}\n.used-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.4);\n  border-radius: 8px;\n  color: white;\n}\n.used-overlay[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #43a047;\n}\n.used-overlay[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1.2rem;\n}\n.ticket-details[_ngcontent-%COMP%] {\n  padding: 16px 0;\n}\n.detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 8px 0;\n  color: #616161;\n}\n.detail-row[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #9e9e9e;\n}\n.serial[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 0.85rem;\n}\n.used-info[_ngcontent-%COMP%] {\n  color: #e53935;\n  font-size: 0.85rem;\n  text-align: center;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 64px;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 80px;\n  width: 80px;\n  height: 80px;\n  color: #bdbdbd;\n  display: block;\n  margin: 0 auto 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #757575;\n  margin-bottom: 24px;\n}\n/*# sourceMappingURL=my-tickets.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MyTicketsComponent, { className: "MyTicketsComponent", filePath: "src\\app\\features\\my-tickets\\my-tickets.component.ts", lineNumber: 123 });
})();
export {
  MyTicketsComponent
};
//# sourceMappingURL=chunk-IZ2F6K7F.js.map
