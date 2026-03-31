// ======== Auth ========
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  cpf?: string;
  role?: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  token: string;
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  cpf?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export enum UserRole {
  Customer = 0,
  Organizer = 1,
  Admin = 2
}

// ======== Events ========
export interface EventListResponse {
  id: number;
  title: string;
  description: string;
  venue: string;
  city: string;
  state: string;
  dateTime: string;
  imageUrl?: string;
  category?: string;
  status: EventStatus;
  minPrice: number;
  totalTicketsAvailable: number;
}

export interface EventResponse {
  id: number;
  title: string;
  description: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  dateTime: string;
  imageUrl?: string;
  category?: string;
  status: EventStatus;
  organizerId: number;
  organizerName: string;
  createdAt: string;
  ticketTypes: TicketTypeResponse[];
}

export interface TicketTypeResponse {
  id: number;
  eventId: number;
  name: string;
  description?: string;
  price: number;
  quantityTotal: number;
  quantitySold: number;
  quantityAvailable: number;
  isActive: boolean;
  saleStartDate?: string;
  saleEndDate?: string;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  dateTime: string;
  imageUrl?: string;
  category?: string;
  ticketTypes: CreateTicketTypeRequest[];
}

export interface CreateTicketTypeRequest {
  name: string;
  description?: string;
  price: number;
  quantityTotal: number;
  saleStartDate?: string;
  saleEndDate?: string;
}

export enum EventStatus {
  Draft = 0,
  Active = 1,
  Cancelled = 2,
  Completed = 3
}

// ======== Orders ========
export interface CreateOrderRequest {
  items: OrderItemRequest[];
  paymentMethod: PaymentMethod;
}

export interface OrderItemRequest {
  ticketTypeId: number;
  quantity: number;
}

export interface OrderResponse {
  id: number;
  userId: number;
  userName: string;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  stripeClientSecret?: string;
  createdAt: string;
  paidAt?: string;
  items: OrderItemResponse[];
}

export interface OrderItemResponse {
  id: number;
  ticketTypeId: number;
  ticketTypeName: string;
  eventTitle: string;
  eventId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export enum OrderStatus {
  Pending = 0,
  Paid = 1,
  Cancelled = 2,
  Refunded = 3
}

export enum PaymentMethod {
  Card = 0,
  Pix = 1
}

// ======== Tickets ========
export interface TicketResponse {
  id: number;
  serialNumber: string;
  qrCodeBase64: string;
  eventTitle: string;
  eventId: number;
  eventVenue: string;
  eventCity: string;
  eventDateTime: string;
  ticketTypeName: string;
  unitPrice: number;
  isUsed: boolean;
  usedAt?: string;
  createdAt: string;
}

export interface ValidateTicketRequest {
  qrCodeHash: string;
}

export interface ValidateTicketResponse {
  isValid: boolean;
  message: string;
  ticket?: TicketValidationDetail;
}

export interface TicketValidationDetail {
  ticketId: number;
  serialNumber: string;
  eventTitle: string;
  ticketTypeName: string;
  holderName: string;
  wasAlreadyUsed: boolean;
  usedAt?: string;
}

// ======== Pagination ========
export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ======== API Error ========
export interface ApiError {
  error: string;
  statusCode: number;
  details?: string[];
}

// ======== Price Tiers ========
export interface PriceTierResponse {
  id: number;
  name: string;
  price: number;
  quantityLimit?: number;
  validUntil?: string;
  tierOrder: number;
  isActive: boolean;
}

export interface CreatePriceTierRequest {
  name: string;
  price: number;
  quantityLimit?: number;
  validUntil?: string;
  tierOrder: number;
}

// ======== Coupons ========
export interface CouponResponse {
  id: number;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  eventId?: number;
  maxUses?: number;
  usedCount: number;
  validFrom?: string;
  validUntil?: string;
  isActive: boolean;
}

export interface CreateCouponRequest {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  eventId?: number;
  maxUses?: number;
  validFrom?: string;
  validUntil?: string;
}

export interface CouponValidationResponse {
  isValid: boolean;
  discountAmount: number;
  message: string;
}

export enum DiscountType {
  Percentage = 0,
  Fixed = 1
}

// ======== Waitlist ========
export interface WaitlistEntryResponse {
  id: number;
  ticketTypeId: number;
  ticketTypeName: string;
  eventTitle: string;
  eventId: number;
  requestedQuantity: number;
  status: WaitlistStatus;
  notifiedAt?: string;
  expiresAt?: string;
  createdAt: string;
  buyUrl?: string;
}

export interface JoinWaitlistRequest {
  ticketTypeId: number;
  quantity: number;
}

export enum WaitlistStatus {
  Waiting = 0,
  Notified = 1,
  Purchased = 2,
  Expired = 3
}

// ======== Affiliates ========
export interface AffiliateLinkResponse {
  id: number;
  code: string;
  eventTitle?: string;
  eventId?: number;
  commissionRate: number;
  totalEarned: number;
  conversionsCount: number;
  shareUrl: string;
  isActive: boolean;
  createdAt: string;
}

export interface AffiliateEarningsResponse {
  totalEarned: number;
  pendingAmount: number;
  conversions: AffiliateConversionResponse[];
}

export interface AffiliateConversionResponse {
  id: number;
  orderId: number;
  orderAmount: number;
  commissionEarned: number;
  convertedAt: string;
}

export interface CreateAffiliateLinkRequest {
  eventId?: number;
}

// ======== Loyalty ========
export interface LoyaltyBalanceResponse {
  points: number;
  redeemableValue: number;
}

export interface LoyaltyTransactionResponse {
  id: number;
  points: number;
  transactionType: LoyaltyTransactionType;
  description: string;
  orderId?: number;
  createdAt: string;
}

export enum LoyaltyTransactionType {
  Earned = 0,
  Redeemed = 1,
  Expired = 2,
  Bonus = 3
}

// ======== Resale ========
export interface ResaleResponse {
  id: number;
  ticketId: number;
  serialNumber: string;
  eventTitle: string;
  eventId: number;
  eventDateTime: string;
  ticketTypeName: string;
  originalPrice: number;
  askingPrice: number;
  sellerId: number;
  sellerName: string;
  status: ResaleStatus;
  stripeClientSecret?: string;
  createdAt: string;
}

export enum ResaleStatus {
  Active = 0,
  Sold = 1,
  Cancelled = 2
}

// ======== Bundles ========
export interface BundleResponse {
  id: number;
  eventId: number;
  name: string;
  description?: string;
  price: number;
  quantityTotal: number;
  quantitySold: number;
  quantityAvailable: number;
  isActive: boolean;
  saleStartDate?: string;
  saleEndDate?: string;
  items: BundleItemResponse[];
}

export interface BundleItemResponse {
  id: number;
  ticketTypeId: number;
  ticketTypeName: string;
  quantity: number;
}

export interface CreateBundleRequest {
  eventId: number;
  name: string;
  description?: string;
  price: number;
  quantityTotal: number;
  saleStartDate?: string;
  saleEndDate?: string;
  items: CreateBundleItemRequest[];
}

export interface CreateBundleItemRequest {
  ticketTypeId: number;
  quantity: number;
}

// ======== Analytics ========
export interface OrganizerDashboardResponse {
  totalEvents: number;
  activeEvents: number;
  totalRevenue: number;
  totalTicketsSold: number;
  averageOrderValue: number;
  totalOrders: number;
  abandonedCarts: number;
  cartAbandonmentRate: number;
  pixRevenue: number;
  cardRevenue: number;
  topEvents: EventAnalyticsSummaryResponse[];
  salesByDay: SalesByDayResponse[];
}

export interface EventAnalyticsResponse {
  eventId: number;
  title: string;
  revenue: number;
  ticketsSold: number;
  checkInRate: number;
  ticketTypeBreakdown: TicketTypeAnalyticsResponse[];
  salesByDay: SalesByDayResponse[];
}

export interface EventAnalyticsSummaryResponse {
  eventId: number;
  title: string;
  revenue: number;
  ticketsSold: number;
}

export interface TicketTypeAnalyticsResponse {
  ticketTypeName: string;
  sold: number;
  revenue: number;
}

export interface SalesByDayResponse {
  date: string;
  revenue: number;
  tickets: number;
}

// ======== Social Proof ========
export interface SocialProofResponse {
  viewersNow: number;
  ticketsSoldLastHour: number;
  urgencyMessage?: string;
}

// ======== Checkin Stats ========
export interface CheckinStatsResponse {
  totalTickets: number;
  checkedIn: number;
  remaining: number;
  checkInRate: number;
  byTicketType: TicketTypeCheckinResponse[];
}

export interface TicketTypeCheckinResponse {
  ticketTypeName: string;
  total: number;
  checkedIn: number;
}

// ======== Updated Order models ========
export interface CreateOrderRequestV2 {
  items: OrderItemRequest[];
  paymentMethod: PaymentMethod;
  couponCode?: string;
  installments?: number;
  affiliateCode?: string;
  loyaltyPointsToRedeem?: number;
  bundles?: OrderBundleRequest[];
}

export interface OrderBundleRequest {
  bundleId: number;
  quantity: number;
}

// ======== Payment Links ========
export interface PaymentLinkResponse {
  id: number;
  token: string;
  url: string;
  eventId?: number;
  eventTitle?: string;
  ticketTypeId?: number;
  ticketTypeName?: string;
  maxUses?: number;
  usedCount: number;
  expiresAt?: string;
  isActive: boolean;
  customMessage?: string;
  totalRevenue: number;
  createdAt: string;
}

export interface CreatePaymentLinkRequest {
  eventId?: number;
  ticketTypeId?: number;
  maxUses?: number;
  expiresAt?: string;
  customMessage?: string;
}

// ======== Flash Sales ========
export interface FlashSaleResponse {
  id: number;
  ticketTypeId: number;
  ticketTypeName: string;
  eventId: number;
  eventTitle: string;
  discountType: DiscountType;
  discountValue: number;
  originalPrice: number;
  flashPrice: number;
  startAt: string;
  endAt: string;
  isActive: boolean;
  isRunning: boolean;
  maxTickets?: number;
  ticketsSold: number;
}

export interface CreateFlashSaleRequest {
  ticketTypeId: number;
  discountType: DiscountType;
  discountValue: number;
  startAt: string;
  endAt: string;
  maxTickets?: number;
}

// ======== Ticket Transfers ========
export interface TicketTransferResponse {
  id: number;
  ticketId: number;
  serialNumber: string;
  eventTitle: string;
  ticketTypeName: string;
  fromUserName: string;
  toEmail: string;
  token: string;
  status: TicketTransferStatus;
  createdAt: string;
  acceptedAt?: string;
}

export interface InitiateTransferRequest {
  ticketId: number;
  toEmail: string;
}

export enum TicketTransferStatus {
  Pending = 0,
  Accepted = 1,
  Cancelled = 2
}

// ======== Analytics (extended) ========
export interface OrganizerDashboardExtended {
  totalEvents: number;
  activeEvents: number;
  totalRevenue: number;
  totalTicketsSold: number;
  averageOrderValue: number;
  totalOrders: number;
  abandonedCarts: number;
  cartAbandonmentRate: number;
  pixRevenue: number;
  cardRevenue: number;
  topEvents: EventAnalyticsSummaryResponse[];
  salesByDay: SalesByDayResponse[];
}
