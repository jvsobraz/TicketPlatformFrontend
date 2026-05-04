# Tickly — Frontend

SPA Angular 17 para a plataforma de venda de ingressos. Interface completa para compradores e organizadores, com dark mode, notificações in-app, avaliações de eventos, checkout com Stripe (cartão e PIX), programa de fidelidade, revenda de ingressos e muito mais.

**Demo em produção:** [tickly-frontend-rho.vercel.app](https://tickly-frontend-rho.vercel.app)

---

## Sumário

- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e execução](#instalação-e-execução)
- [Configuração do proxy](#configuração-do-proxy)
- [Rotas e páginas](#rotas-e-páginas)
- [Funcionalidades](#funcionalidades)
- [Serviços](#serviços)
- [Build de produção](#build-de-produção)

---

## Arquitetura

O projeto usa **Angular 17** com **Standalone Components** e **Signals** (sem NgModules).

```
src/
├── app/
│   ├── core/
│   │   ├── guards/          # authGuard, adminGuard
│   │   ├── interceptors/    # JWT interceptor (adiciona Bearer token automaticamente)
│   │   └── services/        # Todos os serviços HTTP
│   ├── features/            # Páginas da aplicação (lazy-loaded)
│   │   ├── admin/           # Área do organizador
│   │   │   ├── affiliates/
│   │   │   ├── analytics/
│   │   │   ├── coupons/
│   │   │   ├── create-event/
│   │   │   ├── flash-sales/
│   │   │   ├── my-events/
│   │   │   ├── payment-links/
│   │   │   └── scan/
│   │   ├── auth/            # Login, cadastro, recuperação e confirmação de conta
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   ├── reset-password/
│   │   │   └── confirm-email/
│   │   ├── checkout/        # Fluxo de pagamento (Stripe Elements)
│   │   ├── events/          # Listagem e detalhe de eventos
│   │   ├── home/            # Página inicial
│   │   ├── loyalty/         # Programa de fidelidade
│   │   ├── my-tickets/      # Meus ingressos com QR code
│   │   ├── my-waitlist/     # Minha fila de espera
│   │   ├── pay/             # Checkout público via payment link
│   │   ├── profile/         # Perfil do usuário
│   │   ├── resale/          # Marketplace de revenda
│   │   └── ticket-transfers/ # Transferência de ingressos
│   └── shared/
│       ├── navbar/          # Navbar com dark mode e sino de notificações
│       └── footer/
├── proxy.conf.json          # Proxy para o backend local (ng serve)
└── styles.scss              # Estilos globais + variáveis CSS de dark mode
```

**Padrões utilizados:**

| Padrão | Detalhe |
|---|---|
| Standalone Components | Sem NgModules; imports declarados diretamente em cada componente |
| Signals | `signal()`, `computed()` para estado reativo sem RxJS nos componentes |
| Lazy loading | Todos os componentes usam `loadComponent` — carregados sob demanda |
| Angular Material | UI components (botões, formulários, tabelas, menus, badge, tooltip) |
| HTTP Interceptors (2) | `apiUrlInterceptor` prefixa a URL do backend em produção; `authInterceptor` adiciona Bearer token e trata 401 com refresh automático |
| Route Guards | `authGuard` e `adminGuard` protegem rotas privadas e de admin |
| Environments | `environment.ts` (dev, apiUrl vazio — usa proxy) e `environment.production.ts` (Railway URL); trocados em build via `fileReplacements` |

**Dependências principais:**

| Pacote | Versão | Uso |
|---|---|---|
| `@angular/core` | 17.x | Framework principal |
| `@angular/material` | 17.x | Componentes de UI (Material Design) |
| `ngx-stripe` | 17.x | Integração com Stripe Elements (cartão/PIX) |
| `@ngx-translate/core` | 15.x | Internacionalização PT/EN em runtime |
| `chart.js` | 4.x | Gráficos no dashboard de analytics |
| `qrcode` | 1.5.x | Geração de QR codes dos ingressos |

---

## Pré-requisitos

- [Node.js 18+](https://nodejs.org/)
- npm 9+ (incluído com o Node)
- Backend rodando em `https://localhost:5001`

---

## Instalação e execução

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento (proxy ativo)
npm start
# equivalente a:
ng serve
```

A aplicação estará disponível em `http://localhost:4200`.

O Angular Dev Server usa `proxy.conf.json` para encaminhar todas as chamadas de API para `https://localhost:5001`, evitando erros de CORS durante o desenvolvimento. O frontend nunca chama o backend diretamente — todas as rotas `/Auth`, `/Events`, etc. passam pelo proxy.

---

## Configuração do proxy

O arquivo `src/proxy.conf.json` define um redirecionamento por grupo de rota:

```json
{
  "/Auth":              { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/Events":            { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/Orders":            { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/Tickets":           { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/Coupons":           { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/Waitlist":          { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/Affiliates":        { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/Loyalty":           { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/Resale":            { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/Bundles":           { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/Analytics":         { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/SocialProof":       { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/FlashSales":        { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/PaymentLinks":      { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/TicketTransfers":   { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/PriceTiers":        { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/EventReviews":      { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/AppNotifications":  { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/Config":            { "target": "https://localhost:5001", "secure": false, "changeOrigin": true },
  "/WebHook":           { "target": "https://localhost:5001", "secure": false, "changeOrigin": true }
}
```

Se o backend mudar de porta, atualize o `target` em todas as entradas e reinicie o `ng serve`.

---

## Rotas e páginas

### Públicas

| Rota | Componente | Descrição |
|---|---|---|
| `/` | `HomeComponent` | Página inicial com eventos em destaque |
| `/events` | `EventListComponent` | Listagem e busca de eventos |
| `/events/:id` | `EventDetailComponent` | Detalhes, tipos de ingresso, flash sales, prova social, avaliações |
| `/login` | `LoginComponent` | Login |
| `/register` | `RegisterComponent` | Cadastro com validação de força de senha e aceite LGPD |
| `/forgot-password` | `ForgotPasswordComponent` | Solicitar reset de senha por e-mail |
| `/reset-password` | `ResetPasswordComponent` | Redefinir senha via token do e-mail |
| `/confirm-email` | `ConfirmEmailComponent` | Confirmar e-mail via token |
| `/resale` | `ResaleComponent` | Marketplace de revenda de ingressos |
| `/pay/:token` | `PayComponent` | Checkout público via payment link (sem login) |
| `/two-factor-verify` | `TwoFactorVerifyComponent` | Verificação TOTP no fluxo de login com 2FA |

### Autenticadas (requer login)

| Rota | Componente | Descrição |
|---|---|---|
| `/checkout/:orderId` | `CheckoutComponent` | Pagamento do pedido com Stripe (cartão ou PIX) |
| `/my-tickets` | `MyTicketsComponent` | Meus ingressos com QR code para check-in |
| `/my-waitlist` | `MyWaitlistComponent` | Minhas posições em filas de espera |
| `/loyalty` | `LoyaltyComponent` | Saldo e histórico de pontos de fidelidade |
| `/ticket-transfers` | `TicketTransfersComponent` | Transferir ou aceitar ingressos |
| `/split/:id` | `SplitComponent` | Pagamento dividido entre amigos |
| `/queue/:eventId` | `QueueComponent` | Fila virtual para acesso a eventos com alta demanda |
| `/profile` | `ProfileComponent` | Editar dados, alterar senha e configurar 2FA (TOTP) |

### Área do organizador (requer `role = Admin`)

| Rota | Componente | Descrição |
|---|---|---|
| `/admin` | `AdminComponent` | Painel principal com atalhos |
| `/admin/create-event` | `CreateEventComponent` | Criar novo evento com tipos de ingresso |
| `/admin/my-events` | `MyEventsComponent` | Gerenciar e editar eventos existentes |
| `/admin/analytics` | `AnalyticsComponent` | Dashboard com gráficos de vendas, receita e check-in |
| `/admin/affiliates` | `AffiliatesComponent` | Criar e monitorar links de afiliado |
| `/admin/coupons` | `CouponsComponent` | Criar e remover cupons de desconto |
| `/admin/flash-sales` | `FlashSalesComponent` | Criar e gerenciar promoções relâmpago |
| `/admin/payment-links` | `PaymentLinksComponent` | Criar e gerenciar payment links avulsos |
| `/admin/scan` | `ScanComponent` | Validar ingressos via câmera (QR code check-in) |
| `/admin/seat-map/:eventId` | `CreateSeatMapComponent` | Criar mapa de assentos numerados para o evento |
| `/admin/platform-dashboard` | `PlatformDashboardComponent` | Dashboard global da plataforma (Super Admin) |

---

## Funcionalidades

### Para compradores

- **Compra de ingressos** — Seleção de tipo, lote de preço (price tiers), cupom de desconto e pagamento com Stripe Elements (cartão de crédito ou PIX com QR code)
- **Meus ingressos** — Visualização do QR code de cada ingresso, com dados do evento
- **Fila de espera** — Entrada na fila quando o evento está esgotado; notificação automática quando vagas abrem
- **Revenda** — Anunciar ingresso para venda ou comprar ingresso de terceiros no marketplace
- **Transferência** — Enviar ingresso para outro usuário via token único gerado pelo sistema
- **Programa de fidelidade** — Pontos acumulados a cada compra; histórico de créditos e resgates
- **Avaliações** — Nota de 1 a 5 estrelas com comentário após o evento; visualização da média e distribuição no detalhe do evento
- **Fila virtual** — Acesso controlado a eventos com alta demanda; posição em tempo real na fila
- **Pagamento dividido (Split)** — Criação de grupos para rachar o custo de um ingresso entre amigos via link compartilhável
- **Mapa de assentos** — Visualização interativa dos assentos disponíveis/vendidos/reservados; seleção e reserva temporária de assentos numerados antes do checkout
- **Notificações in-app** — Sino no navbar com badge de não lidas; dropdown com histórico e opção de marcar como lida

### Para organizadores

- **Criação de eventos** — Nome, descrição, data, local, imagem de capa e múltiplos tipos de ingresso com lotes de preço por período
- **Mapa de assentos** — Interface de configuração de seções, fileiras e assentos por fileira com seleção de cor e tipo de ingresso por seção
- **Gerenciamento de eventos** — Edição de dados e controle dos eventos existentes
- **Analytics** — Dashboard com total de pedidos, receita acumulada, taxa de check-in e gráficos por tipo de ingresso (Chart.js)
- **Flash sales** — Promoções com desconto percentual por tempo limitado; exibidas no detalhe do evento em tempo real
- **Payment links** — Links de pagamento personalizados para venda avulsa sem evento associado (útil para patrocínios, reservas, etc.)
- **Cupons** — Cupons com desconto percentual ou valor fixo; validação automática no checkout
- **Afiliados** — Links rastreáveis com código único; estatísticas de cliques e conversões por link
- **Scan QR** — Câmera do dispositivo para escanear QR codes e registrar check-in no evento

### Geral

- **Internacionalização (i18n)** — PT/EN em runtime via `@ngx-translate/core`; toggle de idioma persistido em `localStorage`; todos os textos de UI, mensagens de erro e notificações traduzidos
- **2FA (TOTP)** — Configuração via QR code (Google Authenticator, Authy, etc.) direto no perfil; desativação protegida por código; fluxo de verificação separado no login
- **Dark mode** — Toggle no navbar; estado persistido em `localStorage`; aplicado via atributo `data-theme="dark"` no `<html>` com CSS custom properties
- **Lazy loading** — Todas as 30+ rotas usam `loadComponent`; cada página é um chunk JS separado carregado sob demanda
- **PWA** — Service Worker (`@angular/service-worker`) + `manifest.webmanifest` com ícones e atalhos; instalável no desktop e mobile via browser
- **Responsivo** — Layout adaptado para mobile, tablet e desktop usando Angular Material breakpoints

---

## Serviços

Todos os serviços ficam em `src/app/core/services/` e comunicam com o backend via `HttpClient`.

| Serviço | Responsabilidade |
|---|---|
| `AuthService` | Login, cadastro, refresh token, logout, reset/confirmação de e-mail; Signals de autenticação |
| `EventService` | Listagem pública e CRUD de eventos |
| `OrderService` | Criação de pedidos e confirmação de pagamento |
| `TicketService` | Ingressos do usuário, QR code, validação de check-in |
| `CouponService` | Validação de cupom no checkout e gerenciamento admin |
| `WaitlistService` | Entrada/saída da fila de espera |
| `AffiliateService` | Criação de links e estatísticas de afiliado |
| `LoyaltyService` | Saldo e histórico de pontos |
| `ResaleService` | Listagem, anúncio e compra em revenda |
| `BundleService` | Pacotes de ingressos por evento |
| `AnalyticsService` | Dados do dashboard do organizador |
| `SocialProofService` | Prova social — compras recentes exibidas no detalhe do evento |
| `FlashSaleService` | Flash sales por evento |
| `PaymentLinkService` | Criação, listagem e uso de payment links |
| `TicketTransferService` | Iniciação e aceitação de transferências |
| `ReviewService` | Criação e leitura de avaliações de eventos |
| `NotificationService` | Notificações in-app; Signal `unreadCount` atualizado via `tap()` |

### AuthService e interceptors HTTP

O `AuthService` armazena o JWT e o refresh token em `localStorage`. Dois interceptors são registrados em cadeia:

1. **`apiUrlInterceptor`** — Em produção, prefixa todas as requisições relativas com a URL do Railway (`environment.apiUrl`). Em dev, a string é vazia e o proxy do `ng serve` assume o papel.
2. **`authInterceptor`** — Adiciona `Authorization: Bearer {token}` automaticamente. Em caso de resposta `401`, tenta renovar o access token via `/Auth/refresh` uma única vez (usando `BehaviorSubject` para enfileirar requisições concorrentes). Se o refresh também falhar, chama `clearSession()` e redireciona para login.

O `AuthService` expõe um `Signal<boolean>` (`isAuthenticated`) consumido pelo navbar e pelos guards de rota.

### NotificationService e Signal

O `NotificationService` mantém um `Signal<number>` (`unreadCount`) que é atualizado via `tap()` sempre que `getNotifications()` ou `getUnreadCount()` é chamado. O navbar assina esse signal diretamente no template com `notificationService.unreadCount()`, atualizando o badge sem polling nem RxJS subjects adicionais.

---

## Build de produção

```bash
ng build --configuration=production
```

Os artefatos são gerados em `dist/ticket-platform/browser/`. Para servir a SPA, use Nginx ou qualquer servidor estático. É necessário redirecionar todas as rotas para `index.html` para o roteamento Angular funcionar:

```nginx
server {
    listen 80;
    root /var/www/ticket-platform;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

> Em produção, o `apiUrlInterceptor` usa `environment.production.ts` (trocado automaticamente via `fileReplacements` no build) que aponta para a URL do Railway.
