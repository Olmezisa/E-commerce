import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { filter, tap }       from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService }  from './auth.service';
import { CartItem }     from '../../cart/cart-item.model';

@Injectable({ providedIn: 'root' })

export class CartService {
  private api = 'http://localhost:8080/api/cart';
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {

    this.auth.currentUser$.subscribe(user => {
      if (user) this.loadCount();
      else     this.cartCountSubject.next(0);
    });


    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.auth.isLoggedInSnapshot()) {
          this.loadCount();
        }
      });
  }

  getCart() {
    return this.http.get<CartItem[]>(this.api);
  }
  addToCart(id: number, qty: number) {
    return this.http.post<void>(`${this.api}/add`, null, {
      params: { productId: id.toString(), quantity: qty.toString() }
    }).pipe(tap(() => this.loadCount()));
  }
  removeFromCart(id: number) {
    return this.http.delete<void>(`${this.api}/remove`, {
      params: { productId: id.toString() }
    }).pipe(tap(() => this.loadCount()));
  }
  clearCart() {
    return this.http.delete<void>(`${this.api}/clear`).pipe(
      tap(() => this.cartCountSubject.next(0))
    );
  }

  private loadCount() {
    this.getCart().subscribe(items => {
      const total = items.reduce((s, i) => s + i.quantity, 0);
      this.cartCountSubject.next(total);
    });
  }
}
