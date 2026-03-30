import {
  MatDialogModule
} from "./chunk-FOXS3DOS.js";
import {
  MatTableModule
} from "./chunk-CVSV6LR3.js";
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
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule
} from "./chunk-NW3FCLJU.js";
import "./chunk-6UWFS5XU.js";
import {
  CommonModule,
  CurrencyPipe,
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

// src/app/core/services/affiliate.service.ts
var AffiliateService = class _AffiliateService {
  constructor(http) {
    this.http = http;
    this.BASE_URL = "/Affiliates";
  }
  createLink(request) {
    return this.http.post(this.BASE_URL, request);
  }
  getMyLinks() {
    return this.http.get(`${this.BASE_URL}/my-links`);
  }
  getMyEarnings() {
    return this.http.get(`${this.BASE_URL}/earnings`);
  }
  static {
    this.\u0275fac = function AffiliateService_Factory(t) {
      return new (t || _AffiliateService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AffiliateService, factory: _AffiliateService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/admin/affiliates/affiliates.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AffiliatesComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "mat-card", 9)(2, "mat-icon", 10);
    \u0275\u0275text(3, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "span", 11);
    \u0275\u0275text(6, "Total Ganho");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 12);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "mat-card", 9)(11, "mat-icon", 13);
    \u0275\u0275text(12, "pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "span", 11);
    \u0275\u0275text(15, "Convers\xF5es");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 12);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 2, ctx_r0.earnings.totalEarned, "BRL"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.earnings.conversions.length);
  }
}
function AffiliatesComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 7);
  }
}
function AffiliatesComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "add_link");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Criar Link Geral ");
  }
}
function AffiliatesComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "mat-progress-spinner", 14);
    \u0275\u0275elementEnd();
  }
}
function AffiliatesComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1, "Nenhum link criado ainda.");
    \u0275\u0275elementEnd();
  }
}
function AffiliatesComponent_Conditional_31_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 19);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 20)(7, "span")(8, "mat-icon");
    \u0275\u0275text(9, "people");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span")(12, "mat-icon");
    \u0275\u0275text(13, "attach_money");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span")(17, "mat-icon");
    \u0275\u0275text(18, "percent");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "button", 21);
    \u0275\u0275listener("click", function AffiliatesComponent_Conditional_31_For_2_Template_button_click_20_listener() {
      const link_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.copyLink(link_r3.shareUrl));
    });
    \u0275\u0275elementStart(21, "mat-icon");
    \u0275\u0275text(22, "content_copy");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const link_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(link_r3.eventTitle || "Link Geral");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(link_r3.shareUrl);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", link_r3.conversionsCount, " convers\xF5es");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(15, 5, link_r3.totalEarned, "BRL"), " ganhos");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (link_r3.commissionRate * 100).toFixed(0), "% comiss\xE3o");
  }
}
function AffiliatesComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275repeaterCreate(1, AffiliatesComponent_Conditional_31_For_2_Template, 23, 8, "div", 17, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.links);
  }
}
var AffiliatesComponent = class _AffiliatesComponent {
  constructor() {
    this.affiliateService = inject(AffiliateService);
    this.snackBar = inject(MatSnackBar);
    this.links = [];
    this.earnings = null;
    this.loading = true;
    this.creating = false;
  }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.affiliateService.getMyLinks().subscribe({
      next: (links) => {
        this.links = links;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
    this.affiliateService.getMyEarnings().subscribe({
      next: (e) => {
        this.earnings = e;
      }
    });
  }
  createLink() {
    this.creating = true;
    this.affiliateService.createLink({}).subscribe({
      next: (link) => {
        this.links.unshift(link);
        this.creating = false;
        this.snackBar.open("Link criado com sucesso!", "OK", { duration: 3e3 });
      },
      error: (err) => {
        this.creating = false;
        this.snackBar.open(err.error?.error || "Erro ao criar link", "Fechar", { duration: 3e3 });
      }
    });
  }
  copyLink(url) {
    navigator.clipboard.writeText(url).then(() => {
      this.snackBar.open("Link copiado!", "OK", { duration: 2e3 });
    });
  }
  static {
    this.\u0275fac = function AffiliatesComponent_Factory(t) {
      return new (t || _AffiliatesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AffiliatesComponent, selectors: [["app-affiliates"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 32, vars: 4, consts: [[1, "container", "page-container"], [1, "page-header"], [1, "section-title"], ["mat-button", "", "routerLink", "/admin"], [1, "earnings-grid"], [1, "create-card"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "18", "mode", "indeterminate"], [2, "text-align", "center", "padding", "32px"], [1, "earning-card"], [2, "color", "#43a047"], [1, "earning-label"], [1, "earning-value"], [2, "color", "#ff6d00"], ["mode", "indeterminate"], [2, "color", "#757575", "padding", "24px", "text-align", "center"], [1, "links-list"], [1, "link-item"], [1, "link-info"], [1, "link-url"], [1, "link-stats"], ["mat-icon-button", "", "title", "Copiar link", 3, "click"]], template: function AffiliatesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Sistema de Afiliados");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 3)(5, "mat-icon");
        \u0275\u0275text(6, "arrow_back");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Voltar");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, AffiliatesComponent_Conditional_8_Template, 18, 5, "div", 4);
        \u0275\u0275elementStart(9, "mat-card", 5)(10, "mat-card-header")(11, "mat-card-title");
        \u0275\u0275text(12, "Criar Link de Afiliado");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "mat-card-content")(14, "p");
        \u0275\u0275text(15, "Gere links \xFAnicos para promover eventos e ganhe comiss\xE3o por cada venda realizada.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "p")(17, "strong");
        \u0275\u0275text(18, "Comiss\xE3o padr\xE3o: 5%");
        \u0275\u0275elementEnd();
        \u0275\u0275text(19, " sobre cada venda gerada pelo seu link.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "mat-card-actions")(21, "button", 6);
        \u0275\u0275listener("click", function AffiliatesComponent_Template_button_click_21_listener() {
          return ctx.createLink();
        });
        \u0275\u0275template(22, AffiliatesComponent_Conditional_22_Template, 1, 0, "mat-progress-spinner", 7)(23, AffiliatesComponent_Conditional_23_Template, 3, 0);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(24, "mat-card")(25, "mat-card-header")(26, "mat-card-title");
        \u0275\u0275text(27, "Meus Links");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "mat-card-content");
        \u0275\u0275template(29, AffiliatesComponent_Conditional_29_Template, 2, 0, "div", 8)(30, AffiliatesComponent_Conditional_30_Template, 2, 0)(31, AffiliatesComponent_Conditional_31_Template, 3, 0);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275conditional(8, ctx.earnings ? 8 : -1);
        \u0275\u0275advance(13);
        \u0275\u0275property("disabled", ctx.creating);
        \u0275\u0275advance();
        \u0275\u0275conditional(22, ctx.creating ? 22 : 23);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(29, ctx.loading ? 29 : ctx.links.length === 0 ? 30 : 31);
      }
    }, dependencies: [CommonModule, CurrencyPipe, RouterLink, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatButtonModule, MatAnchor, MatButton, MatIconButton, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatSnackBarModule, MatTableModule, MatChipsModule, MatDialogModule], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.earnings-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.earning-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px;\n}\n.earning-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  width: 36px;\n  height: 36px;\n}\n.earning-card[_ngcontent-%COMP%]   .earning-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.85rem;\n  color: #757575;\n}\n.earning-card[_ngcontent-%COMP%]   .earning-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.6rem;\n  font-weight: 700;\n}\n.create-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.links-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.link-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.link-url[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #6200ea;\n  word-break: break-all;\n  margin: 4px 0;\n  font-family: monospace;\n}\n.link-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-top: 8px;\n  font-size: 0.85rem;\n  color: #757575;\n}\n.link-stats[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.link-stats[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n/*# sourceMappingURL=affiliates.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AffiliatesComponent, { className: "AffiliatesComponent", filePath: "src\\app\\features\\admin\\affiliates\\affiliates.component.ts", lineNumber: 111 });
})();
export {
  AffiliatesComponent
};
//# sourceMappingURL=chunk-EDEV6M4C.js.map
