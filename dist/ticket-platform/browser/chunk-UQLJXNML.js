import {
  UserRole
} from "./chunk-WMQBKU7S.js";
import {
  Router
} from "./chunk-7BHVX7AP.js";
import {
  HttpClient
} from "./chunk-FV6QPV75.js";
import {
  __spreadProps,
  __spreadValues,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-PY3RLCY5.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  constructor(http, router) {
    this.http = http;
    this.router = router;
    this.BASE_URL = "/Auth";
    this.TOKEN_KEY = "tp_token";
    this.USER_KEY = "tp_user";
    this.currentUser = signal(this.loadUser());
  }
  register(request) {
    return this.http.post(`${this.BASE_URL}/register`, request).pipe(tap((response) => this.saveSession(response)));
  }
  login(request) {
    return this.http.post(`${this.BASE_URL}/login`, request).pipe(tap((response) => this.saveSession(response)));
  }
  getProfile() {
    return this.http.get(`${this.BASE_URL}/profile`).pipe(tap((response) => {
      const current = this.currentUser();
      if (current) {
        this.saveSession(__spreadProps(__spreadValues({}, response), { token: current.token }));
      }
    }));
  }
  updateProfile(request) {
    return this.http.put(`${this.BASE_URL}/profile`, request);
  }
  changePassword(request) {
    return this.http.put(`${this.BASE_URL}/change-password`, request);
  }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(["/login"]);
  }
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  isAuthenticated() {
    return !!this.getToken();
  }
  isAdmin() {
    return this.currentUser()?.role === UserRole.Admin;
  }
  isOrganizer() {
    const role = this.currentUser()?.role;
    return role === UserRole.Organizer || role === UserRole.Admin;
  }
  saveSession(response) {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response));
    this.currentUser.set(response);
  }
  loadUser() {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }
  static {
    this.\u0275fac = function AuthService_Factory(t) {
      return new (t || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-UQLJXNML.js.map
