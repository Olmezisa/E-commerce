import { Component, OnInit }      from '@angular/core';
import { Observable }             from 'rxjs';

import { Router }                 from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<User | null>;
  cartCount$: Observable<number>;

  constructor(
    private auth: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.isLoggedIn$   = this.auth.isLoggedIn$;
    this.currentUser$  = this.auth.currentUser$;
    this.cartCount$    = this.cartService.cartCount$;
  }

  ngOnInit(): void {}

  logout(): void {
    this.auth.logout();
  }

  goToOrders():void{
    this.router.navigate(['/orders']);
  }

  goToAccount(): void {
    this.router.navigate(['/account/profile']);
  }

  /** SearchBar’dan gelen terimle arama sayfasına yönlendir */
  // header.component.ts içinde
onSearch(term: string): void {
  if (term.trim()) {
    this.router.navigate(['/products/search'], {
      queryParams: { q: term.trim() }
    });
  }
}

}
