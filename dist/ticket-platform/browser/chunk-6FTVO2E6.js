import {
  HttpClient
} from "./chunk-FV6QPV75.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-PY3RLCY5.js";

// src/app/core/services/order.service.ts
var OrderService = class _OrderService {
  constructor(http) {
    this.http = http;
    this.BASE_URL = "/Orders";
  }
  createOrder(request) {
    return this.http.post(this.BASE_URL, request);
  }
  getOrderById(id) {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }
  getMyOrders() {
    return this.http.get(`${this.BASE_URL}/my-orders`);
  }
  cancelOrder(id) {
    return this.http.post(`${this.BASE_URL}/${id}/cancel`, {});
  }
  static {
    this.\u0275fac = function OrderService_Factory(t) {
      return new (t || _OrderService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OrderService, factory: _OrderService.\u0275fac, providedIn: "root" });
  }
};

export {
  OrderService
};
//# sourceMappingURL=chunk-6FTVO2E6.js.map
