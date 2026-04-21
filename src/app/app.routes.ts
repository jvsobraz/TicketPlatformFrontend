import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'events',
    loadComponent: () => import('./features/events/event-list/event-list.component').then(m => m.EventListComponent)
  },
  {
    path: 'events/:id',
    loadComponent: () => import('./features/events/event-detail/event-detail.component').then(m => m.EventDetailComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  {
    path: 'confirm-email',
    loadComponent: () => import('./features/auth/confirm-email/confirm-email.component').then(m => m.ConfirmEmailComponent)
  },
  {
    path: '2fa-verify',
    loadComponent: () => import('./features/auth/two-factor-verify/two-factor-verify.component').then(m => m.TwoFactorVerifyComponent)
  },
  {
    path: 'checkout/:orderId',
    canActivate: [authGuard],
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'my-tickets',
    canActivate: [authGuard],
    loadComponent: () => import('./features/my-tickets/my-tickets.component').then(m => m.MyTicketsComponent)
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent)
  },
  {
    path: 'admin/create-event',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/admin/create-event/create-event.component').then(m => m.CreateEventComponent)
  },
  {
    path: 'admin/analytics',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/admin/analytics/analytics.component').then(m => m.AnalyticsComponent)
  },
  {
    path: 'admin/affiliates',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/admin/affiliates/affiliates.component').then(m => m.AffiliatesComponent)
  },
  {
    path: 'admin/coupons',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/admin/coupons/coupons.component').then(m => m.CouponsComponent)
  },
  {
    path: 'my-waitlist',
    canActivate: [authGuard],
    loadComponent: () => import('./features/my-waitlist/my-waitlist.component').then(m => m.MyWaitlistComponent)
  },
  {
    path: 'loyalty',
    canActivate: [authGuard],
    loadComponent: () => import('./features/loyalty/loyalty.component').then(m => m.LoyaltyComponent)
  },
  {
    path: 'resale',
    loadComponent: () => import('./features/resale/resale.component').then(m => m.ResaleComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'pay/:token',
    loadComponent: () => import('./features/pay/pay.component').then(m => m.PayComponent)
  },
  {
    path: 'ticket-transfers',
    canActivate: [authGuard],
    loadComponent: () => import('./features/ticket-transfers/ticket-transfers.component').then(m => m.TicketTransfersComponent)
  },
  {
    path: 'admin/payment-links',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/admin/payment-links/payment-links.component').then(m => m.PaymentLinksComponent)
  },
  {
    path: 'admin/flash-sales',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/admin/flash-sales/flash-sales.component').then(m => m.FlashSalesComponent)
  },
  {
    path: 'admin/my-events',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/admin/my-events/my-events.component').then(m => m.MyEventsComponent)
  },
  {
    path: 'admin/scan',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/admin/scan/scan.component').then(m => m.ScanComponent)
  },
  {
    path: 'queue/:eventId',
    canActivate: [authGuard],
    loadComponent: () => import('./features/queue/queue.component').then(m => m.QueueComponent)
  },
  {
    path: 'split/:token',
    loadComponent: () => import('./features/split/split.component').then(m => m.SplitComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
