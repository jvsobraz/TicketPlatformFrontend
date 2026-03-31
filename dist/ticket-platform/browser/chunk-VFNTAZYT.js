import {
  HttpClient,
  HttpParams
} from "./chunk-FV6QPV75.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-PY3RLCY5.js";

// src/app/core/services/event.service.ts
var EventService = class _EventService {
  constructor(http) {
    this.http = http;
    this.BASE_URL = "/Events";
    this.categories = [
      "Show / Concerto",
      "Festival",
      "Teatro",
      "Stand-up Comedy",
      "Esportes",
      "Confer\xEAncia",
      "Workshop",
      "Festa",
      "Exposi\xE7\xE3o",
      "Outro"
    ];
    this.brazilianStates = [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO"
    ];
  }
  getEvents(params = {}) {
    let httpParams = new HttpParams();
    if (params.search)
      httpParams = httpParams.set("search", params.search);
    if (params.city)
      httpParams = httpParams.set("city", params.city);
    if (params.category)
      httpParams = httpParams.set("category", params.category);
    if (params.dateFrom)
      httpParams = httpParams.set("dateFrom", params.dateFrom);
    if (params.dateTo)
      httpParams = httpParams.set("dateTo", params.dateTo);
    if (params.page)
      httpParams = httpParams.set("page", params.page);
    if (params.pageSize)
      httpParams = httpParams.set("pageSize", params.pageSize);
    return this.http.get(this.BASE_URL, { params: httpParams });
  }
  getEventById(id) {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }
  createEvent(request) {
    return this.http.post(this.BASE_URL, request);
  }
  updateEvent(id, request) {
    return this.http.put(`${this.BASE_URL}/${id}`, request);
  }
  deleteEvent(id) {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }
  getMyEvents() {
    return this.http.get(`${this.BASE_URL}/my-events`);
  }
  static {
    this.\u0275fac = function EventService_Factory(t) {
      return new (t || _EventService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EventService, factory: _EventService.\u0275fac, providedIn: "root" });
  }
};

export {
  EventService
};
//# sourceMappingURL=chunk-VFNTAZYT.js.map
