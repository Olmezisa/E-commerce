import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser }               from '@angular/common';
import { BehaviorSubject }                 from 'rxjs';
import { Product }                         from '../../products/models/product.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private storageKey = 'wishlistItems';
  private items: Product[] = [];
  public items$ = new BehaviorSubject<Product[]>([]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.storageKey);
      this.items = saved ? JSON.parse(saved) : [];
    }
    this.items$.next([...this.items]);
  }

  private updateStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    }
    this.items$.next([...this.items]);
  }

  /** Ürünü wishlist’e ekle/çıkar (toggle) */
  toggle(product: Product) {
    const idx = this.items.findIndex(p => p.id === product.id);
    if (idx > -1) {
      this.items.splice(idx, 1);
    } else {
      this.items.push(product);
    }
    this.updateStorage();
  }

  /** Belirli bir ürün wishlist’te mi? */
  isInWishlist(productId: number): boolean {
    return this.items.some(p => p.id === productId);
  }

  /** Tüm wishlist ürünlerini al */
  getWishlist(): Product[] {
    return [...this.items];
  }
}
