import {
  MatChipsModule
} from "./chunk-Z5A633E3.js";
import {
  EventService
} from "./chunk-EYXM5OOP.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-K2OQUEAO.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatPrefix,
  NgControlStatus,
  NgModel
} from "./chunk-XPY4B3TJ.js";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardImage,
  MatCardModule,
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
  CurrencyPipe,
  DatePipe,
  NgIf,
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
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-L24MRG7B.js";

// src/app/features/home/home.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = (a0) => ["/events", a0];
function HomeComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function HomeComponent_For_15_Template_button_click_0_listener() {
      const cat_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.filterByCategory(cat_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r2);
  }
}
function HomeComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "mat-progress-spinner", 20);
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "mat-icon");
    \u0275\u0275text(2, "event_busy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Nenhum evento dispon\xEDvel no momento.");
    \u0275\u0275elementEnd()();
  }
}
function HomeComponent_Conditional_26_For_2_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const event_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r4.category);
  }
}
function HomeComponent_Conditional_26_For_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1, "GRATUITO");
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_Conditional_26_For_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("A partir de ", \u0275\u0275pipeBind2(2, 1, event_r4.minPrice, "BRL"), "");
  }
}
function HomeComponent_Conditional_26_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 23);
    \u0275\u0275element(1, "img", 24);
    \u0275\u0275elementStart(2, "mat-card-content");
    \u0275\u0275template(3, HomeComponent_Conditional_26_For_2_div_3_Template, 3, 1, "div", 25);
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 26)(7, "mat-icon");
    \u0275\u0275text(8, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 26)(12, "mat-icon");
    \u0275\u0275text(13, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "mat-card-actions")(16, "div", 27);
    \u0275\u0275template(17, HomeComponent_Conditional_26_For_2_Conditional_17_Template, 2, 0, "span", 28)(18, HomeComponent_Conditional_26_For_2_Conditional_18_Template, 3, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 29);
    \u0275\u0275text(20, " Comprar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const event_r4 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(14, _c0, event_r4.id));
    \u0275\u0275advance();
    \u0275\u0275property("src", event_r4.imageUrl || "assets/default-event.jpg", \u0275\u0275sanitizeUrl)("alt", event_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", event_r4.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r4.title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(10, 11, event_r4.dateTime, "dd/MM/yyyy"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate3(" ", event_r4.venue, " \xB7 ", event_r4.city, "/", event_r4.state, " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(17, event_r4.minPrice === 0 ? 17 : 18);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(16, _c0, event_r4.id));
  }
}
function HomeComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275repeaterCreate(1, HomeComponent_Conditional_26_For_2_Template, 21, 18, "mat-card", 23, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.events);
  }
}
var HomeComponent = class _HomeComponent {
  constructor() {
    this.eventService = inject(EventService);
    this.events = [];
    this.loading = true;
    this.searchQuery = "";
    this.featuredCategories = ["Show / Concerto", "Festival", "Teatro", "Stand-up Comedy", "Esportes"];
  }
  ngOnInit() {
    this.loadEvents();
  }
  loadEvents() {
    this.loading = true;
    this.eventService.getEvents({ page: 1, pageSize: 6 }).subscribe({
      next: (result) => {
        this.events = result.items;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  searchEvents() {
    if (this.searchQuery.trim()) {
      window.location.href = `/events?search=${encodeURIComponent(this.searchQuery)}`;
    }
  }
  filterByCategory(category) {
    window.location.href = `/events?category=${encodeURIComponent(category)}`;
  }
  static {
    this.\u0275fac = function HomeComponent_Factory(t) {
      return new (t || _HomeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 53, vars: 2, consts: [[1, "hero"], [1, "hero-content"], [1, "search-bar"], ["appearance", "fill", 1, "search-input"], ["matPrefix", ""], ["matInput", "", "placeholder", "Buscar eventos...", 3, "ngModelChange", "keyup.enter", "ngModel"], ["mat-raised-button", "", "color", "accent", 3, "click"], [1, "categories"], ["mat-stroked-button", "", 1, "category-chip"], [1, "container", "events-section"], [1, "section-header"], [1, "section-title"], ["mat-button", "", "routerLink", "/events"], [1, "loading-overlay"], [1, "how-it-works"], [1, "container"], [1, "section-title", 2, "text-align", "center"], [1, "steps"], [1, "step"], ["mat-stroked-button", "", 1, "category-chip", 3, "click"], ["mode", "indeterminate", "diameter", "50"], [1, "empty-state"], [1, "events-grid"], [1, "event-card", 3, "routerLink"], ["mat-card-image", "", 1, "event-image", 3, "src", "alt"], ["class", "event-category", 4, "ngIf"], [1, "event-meta"], [1, "event-price"], [1, "price-free"], ["mat-raised-button", "", "color", "primary", 3, "routerLink"], [1, "event-category"], [1, "category-badge"], [1, "price"]], template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Encontre os Melhores Eventos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p");
        \u0275\u0275text(5, "Shows, festivais, teatro, stand-up e muito mais. Compre seu ingresso com seguran\xE7a.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 2)(7, "mat-form-field", 3)(8, "mat-icon", 4);
        \u0275\u0275text(9, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "input", 5);
        \u0275\u0275twoWayListener("ngModelChange", function HomeComponent_Template_input_ngModelChange_10_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
          return $event;
        });
        \u0275\u0275listener("keyup.enter", function HomeComponent_Template_input_keyup_enter_10_listener() {
          return ctx.searchEvents();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "button", 6);
        \u0275\u0275listener("click", function HomeComponent_Template_button_click_11_listener() {
          return ctx.searchEvents();
        });
        \u0275\u0275text(12, "Buscar");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 7);
        \u0275\u0275repeaterCreate(14, HomeComponent_For_15_Template, 2, 1, "button", 8, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(16, "section", 9)(17, "div", 10)(18, "h2", 11);
        \u0275\u0275text(19, "Pr\xF3ximos Eventos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "a", 12);
        \u0275\u0275text(21, "Ver todos ");
        \u0275\u0275elementStart(22, "mat-icon");
        \u0275\u0275text(23, "arrow_forward");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(24, HomeComponent_Conditional_24_Template, 2, 0, "div", 13)(25, HomeComponent_Conditional_25_Template, 5, 0)(26, HomeComponent_Conditional_26_Template, 3, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "section", 14)(28, "div", 15)(29, "h2", 16);
        \u0275\u0275text(30, "Como Funciona");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "div", 17)(32, "div", 18)(33, "mat-icon");
        \u0275\u0275text(34, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "h3");
        \u0275\u0275text(36, "1. Encontre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "p");
        \u0275\u0275text(38, "Busque eventos por cidade, data ou categoria");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(39, "div", 18)(40, "mat-icon");
        \u0275\u0275text(41, "shopping_cart");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "h3");
        \u0275\u0275text(43, "2. Compre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "p");
        \u0275\u0275text(45, "Pague com cart\xE3o ou PIX de forma segura");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(46, "div", 18)(47, "mat-icon");
        \u0275\u0275text(48, "qr_code_2");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "h3");
        \u0275\u0275text(50, "3. Aproveite");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "p");
        \u0275\u0275text(52, "Receba seu QR Code e entre no evento");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
        \u0275\u0275advance(4);
        \u0275\u0275repeater(ctx.featuredCategories);
        \u0275\u0275advance(10);
        \u0275\u0275conditional(24, ctx.loading ? 24 : ctx.events.length === 0 ? 25 : 26);
      }
    }, dependencies: [
      CommonModule,
      NgIf,
      CurrencyPipe,
      DatePipe,
      RouterLink,
      FormsModule,
      DefaultValueAccessor,
      NgControlStatus,
      NgModel,
      MatButtonModule,
      MatAnchor,
      MatButton,
      MatCardModule,
      MatCard,
      MatCardActions,
      MatCardContent,
      MatCardImage,
      MatIconModule,
      MatIcon,
      MatInputModule,
      MatInput,
      MatFormField,
      MatPrefix,
      MatFormFieldModule,
      MatChipsModule,
      MatProgressSpinnerModule,
      MatProgressSpinner
    ], styles: ["\n\n.hero[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6200ea 0%,\n      #9c27b0 100%);\n  color: white;\n  padding: 80px 16px;\n  text-align: center;\n}\n.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 16px;\n}\n.hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  opacity: 0.9;\n  margin-bottom: 32px;\n}\n.search-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n  max-width: 600px;\n  margin: 0 auto 24px;\n}\n.search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  background: white;\n  border-radius: 4px;\n}\n.categories[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n.category-chip[_ngcontent-%COMP%] {\n  color: white !important;\n  border-color: rgba(255, 255, 255, 0.5) !important;\n}\n.events-section[_ngcontent-%COMP%] {\n  padding: 48px 16px;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.event-image[_ngcontent-%COMP%] {\n  height: 200px;\n  object-fit: cover;\n}\n.event-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  color: #757575;\n  font-size: 0.9rem;\n  margin: 4px 0;\n}\n.event-meta[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.event-price[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.category-badge[_ngcontent-%COMP%] {\n  background: #ede7f6;\n  color: #6200ea;\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 0.8rem;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n  color: #757575;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  display: block;\n  margin: 0 auto 16px;\n}\n.how-it-works[_ngcontent-%COMP%] {\n  background: white;\n  padding: 64px 16px;\n}\n.steps[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 32px;\n  margin-top: 32px;\n}\n@media (max-width: 768px) {\n  .steps[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.step[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.step[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #6200ea;\n}\n.step[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 16px 0 8px;\n}\n/*# sourceMappingURL=home.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src\\app\\features\\home\\home.component.ts", lineNumber: 148 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-6JSTBUYU.js.map
