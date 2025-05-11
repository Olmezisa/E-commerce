// src/app/core/services/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth.service';
import { CartItem } from '../../cart/cart-item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private api = `${environment.apiUrl}/cart`;
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
    // Kullanıcı değiştiğinde sepet sayısını güncelle
    this.auth.currentUser$.subscribe(user => {
      if (user) {
        this.loadCount();
      } else {
        this.cartCountSubject.next(0);
      }
    });

    // Her navigation sonunda sepet sayısını güncelle
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.auth.isLoggedInSnapshot()) {
          this.loadCount();
        }
      });
  }

  /** Sepeti al */
  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.api);
  }

  /**
   * Ürünü sepete ekle veya çıkart
   * @param productId  Ürün ID
   * @param quantity   Eklenecek (pozitif) veya çıkarılacak (negatif) adet
   * @param variantId  (Opsiyonel) Varyant ID
   */
  addToCart(
    productId: number,
    quantity: number,
    variantId?: number
  ): Observable<void> {
    let params = new HttpParams()
      .set('productId', productId.toString())
      .set('quantity', quantity.toString());
    if (variantId != null) {
      params = params.set('variantId', variantId.toString());
    }
    return this.http
      .post<void>(`${this.api}/add`, null, { params })
      .pipe(tap(() => this.loadCount()));
  }

  /**
   * Sepetten tek bir ürünü tamamen çıkarır
   * @param productId  Ürün ID
   */
  removeFromCart(productId: number): Observable<void> {
    const params = new HttpParams().set('productId', productId.toString());
    return this.http
      .delete<void>(`${this.api}/remove`, { params })
      .pipe(tap(() => this.loadCount()));
  }

  /** Sepeti tamamen temizler */
  clearCart(): Observable<void> {
    return this.http
      .delete<void>(`${this.api}/clear`)
      .pipe(tap(() => this.cartCountSubject.next(0)));
  }

  /** İçsel: sepet toplam adetini hesaplayıp BehaviorSubject’e yayınlar */
  private loadCount(): void {
    this.getCart().subscribe(items => {
      const total = items.reduce((sum, item) => sum + item.quantity, 0);
      this.cartCountSubject.next(total);
    });
  }
}
