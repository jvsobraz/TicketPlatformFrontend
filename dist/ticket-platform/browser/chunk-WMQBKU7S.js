// src/app/core/models/index.ts
var UserRole;
(function(UserRole2) {
  UserRole2[UserRole2["Customer"] = 0] = "Customer";
  UserRole2[UserRole2["Organizer"] = 1] = "Organizer";
  UserRole2[UserRole2["Admin"] = 2] = "Admin";
})(UserRole || (UserRole = {}));
var EventStatus;
(function(EventStatus2) {
  EventStatus2[EventStatus2["Draft"] = 0] = "Draft";
  EventStatus2[EventStatus2["Active"] = 1] = "Active";
  EventStatus2[EventStatus2["Cancelled"] = 2] = "Cancelled";
  EventStatus2[EventStatus2["Completed"] = 3] = "Completed";
})(EventStatus || (EventStatus = {}));
var OrderStatus;
(function(OrderStatus2) {
  OrderStatus2[OrderStatus2["Pending"] = 0] = "Pending";
  OrderStatus2[OrderStatus2["Paid"] = 1] = "Paid";
  OrderStatus2[OrderStatus2["Cancelled"] = 2] = "Cancelled";
  OrderStatus2[OrderStatus2["Refunded"] = 3] = "Refunded";
})(OrderStatus || (OrderStatus = {}));
var PaymentMethod;
(function(PaymentMethod2) {
  PaymentMethod2[PaymentMethod2["Card"] = 0] = "Card";
  PaymentMethod2[PaymentMethod2["Pix"] = 1] = "Pix";
})(PaymentMethod || (PaymentMethod = {}));
var DiscountType;
(function(DiscountType2) {
  DiscountType2[DiscountType2["Percentage"] = 0] = "Percentage";
  DiscountType2[DiscountType2["Fixed"] = 1] = "Fixed";
})(DiscountType || (DiscountType = {}));
var WaitlistStatus;
(function(WaitlistStatus2) {
  WaitlistStatus2[WaitlistStatus2["Waiting"] = 0] = "Waiting";
  WaitlistStatus2[WaitlistStatus2["Notified"] = 1] = "Notified";
  WaitlistStatus2[WaitlistStatus2["Purchased"] = 2] = "Purchased";
  WaitlistStatus2[WaitlistStatus2["Expired"] = 3] = "Expired";
})(WaitlistStatus || (WaitlistStatus = {}));
var LoyaltyTransactionType;
(function(LoyaltyTransactionType2) {
  LoyaltyTransactionType2[LoyaltyTransactionType2["Earned"] = 0] = "Earned";
  LoyaltyTransactionType2[LoyaltyTransactionType2["Redeemed"] = 1] = "Redeemed";
  LoyaltyTransactionType2[LoyaltyTransactionType2["Expired"] = 2] = "Expired";
  LoyaltyTransactionType2[LoyaltyTransactionType2["Bonus"] = 3] = "Bonus";
})(LoyaltyTransactionType || (LoyaltyTransactionType = {}));
var ResaleStatus;
(function(ResaleStatus2) {
  ResaleStatus2[ResaleStatus2["Active"] = 0] = "Active";
  ResaleStatus2[ResaleStatus2["Sold"] = 1] = "Sold";
  ResaleStatus2[ResaleStatus2["Cancelled"] = 2] = "Cancelled";
})(ResaleStatus || (ResaleStatus = {}));
var TicketTransferStatus;
(function(TicketTransferStatus2) {
  TicketTransferStatus2[TicketTransferStatus2["Pending"] = 0] = "Pending";
  TicketTransferStatus2[TicketTransferStatus2["Accepted"] = 1] = "Accepted";
  TicketTransferStatus2[TicketTransferStatus2["Cancelled"] = 2] = "Cancelled";
})(TicketTransferStatus || (TicketTransferStatus = {}));

export {
  UserRole,
  EventStatus,
  OrderStatus,
  PaymentMethod,
  DiscountType,
  WaitlistStatus,
  TicketTransferStatus
};
//# sourceMappingURL=chunk-WMQBKU7S.js.map
