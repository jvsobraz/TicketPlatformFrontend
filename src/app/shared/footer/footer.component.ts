import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand -->
          <div class="footer-brand-col">
            <div class="footer-brand">
              <div class="brand-icon"><mat-icon>confirmation_number</mat-icon></div>
              <span>Tickly</span>
            </div>
            <p class="brand-tagline">A plataforma de ingressos mais completa do Brasil. Compre, venda e transfira com segurança.</p>
            <div class="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener" class="social-link" aria-label="Instagram">
                <mat-icon>photo_camera</mat-icon>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener" class="social-link" aria-label="Twitter">
                <mat-icon>alternate_email</mat-icon>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener" class="social-link" aria-label="Facebook">
                <mat-icon>thumb_up</mat-icon>
              </a>
            </div>
          </div>

          <!-- Explore -->
          <div class="footer-col">
            <h4>Explorar</h4>
            <ul>
              <li><a routerLink="/events">Todos os Eventos</a></li>
              <li><a routerLink="/events" [queryParams]="{category:'Música'}">Música</a></li>
              <li><a routerLink="/events" [queryParams]="{category:'Esportes'}">Esportes</a></li>
              <li><a routerLink="/events" [queryParams]="{category:'Teatro'}">Teatro</a></li>
              <li><a routerLink="/resale">Ingressos Revendas</a></li>
            </ul>
          </div>

          <!-- Conta -->
          <div class="footer-col">
            <h4>Minha Conta</h4>
            <ul>
              <li><a routerLink="/my-tickets">Meus Ingressos</a></li>
              <li><a routerLink="/profile">Meu Perfil</a></li>
              <li><a routerLink="/loyalty">Pontos de Fidelidade</a></li>
              <li><a routerLink="/my-waitlist">Lista de Espera</a></li>
              <li><a routerLink="/ticket-transfers">Transferências</a></li>
            </ul>
          </div>

          <!-- Organizadores -->
          <div class="footer-col">
            <h4>Organizadores</h4>
            <ul>
              <li><a routerLink="/register">Criar Conta</a></li>
              <li><a routerLink="/admin">Painel Admin</a></li>
              <li><a routerLink="/admin/analytics">Analytics</a></li>
              <li><a routerLink="/admin/payment-links">Links de Pagamento</a></li>
              <li><a routerLink="/admin/flash-sales">Promoções Flash</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© {{ year }} Tickly. Todos os direitos reservados.</p>
          <div class="payment-badges">
            <span class="badge"><mat-icon>pix</mat-icon> PIX</span>
            <span class="badge"><mat-icon>credit_card</mat-icon> Cartão</span>
            <span class="badge"><mat-icon>lock</mat-icon> Seguro</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #0d0d1a;
      color: #9ca3af;
      padding: 56px 0 0;
      margin-top: 64px;
    }

    /* ── Grid ── */
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 40px;
      padding-bottom: 48px;
      border-bottom: 1px solid rgba(255,255,255,.08);

      @media (max-width: 900px) { grid-template-columns: 1fr 1fr; }
      @media (max-width: 540px) { grid-template-columns: 1fr; }
    }

    /* ── Brand ── */
    .footer-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;
      font-size: 1.15rem;
      font-weight: 800;
      margin-bottom: 12px;
    }

    .brand-icon {
      width: 36px;
      height: 36px;
      background: var(--primary);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      mat-icon { font-size: 20px; width: 20px; height: 20px; color: white; }
    }

    .brand-tagline {
      font-size: 0.85rem;
      line-height: 1.6;
      color: #6b7280;
      margin: 0 0 20px;
      max-width: 280px;
    }

    .social-links { display: flex; gap: 10px; }

    .social-link {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: rgba(255,255,255,.07);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9ca3af;
      text-decoration: none;
      transition: background .2s, color .2s;

      mat-icon { font-size: 18px; width: 18px; height: 18px; }

      &:hover { background: var(--primary); color: white; }
    }

    /* ── Columns ── */
    .footer-col h4 {
      color: white;
      font-size: 0.88rem;
      font-weight: 700;
      letter-spacing: .5px;
      text-transform: uppercase;
      margin: 0 0 16px;
    }

    .footer-col ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .footer-col a {
      color: #6b7280;
      text-decoration: none;
      font-size: 0.88rem;
      transition: color .2s;

      &:hover { color: white; }
    }

    /* ── Bottom bar ── */
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      flex-wrap: wrap;
      gap: 12px;

      p { margin: 0; font-size: 0.82rem; color: #6b7280; }
    }

    .payment-badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .badge {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(255,255,255,.06);
      color: #9ca3af;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;

      mat-icon { font-size: 14px; width: 14px; height: 14px; }
    }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
