import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../products/models/product.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly storageKey = 'wishlistItems';
  private readonly isBrowser: boolean;
  private items: Product[] = [];

  // Observable’lar
  private itemsSubject = new BehaviorSubject<Product[]>([]);
  public readonly items$ = this.itemsSubject.asObservable();

  private countSubject = new BehaviorSubject<number>(0);
  public readonly count$ = this.countSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        try {
          this.items = JSON.parse(saved);
        } catch {
          console.warn('Wishlist parse hatası, sıfırlanıyor');
          this.items = [];
        }
      }
    }

    // İlk değerleri yayınla
    this.itemsSubject.next([...this.items]);
    this.countSubject.next(this.items.length);
  }

  /** Ekle/Çıkar toggle */
  toggle(product: Product): void {
    const idx = this.items.findIndex(p => p.id === product.id);
    if (idx > -1) {
      this.items.splice(idx, 1);
    } else {
      this.items.push(product);
    }
    this.commit();
  }

  /** Belirli bir ürün wishlist’te mi? */
  isInWishlist(productId: number): boolean {
    return this.items.some(p => p.id === productId);
  }

  /** Tüm wishlist ürünlerini al (snapshot) */
  getWishlist(): Product[] {
    return [...this.items];
  }

  /** Wishlist’i tamamen temizle */
  clearWishlist(): void {
    this.items = [];
    this.commit();
  }

  /** Değişiklikleri LocalStorage’a kaydet ve Observable’ları güncelle */
  private commit(): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
      } catch {
        console.warn('Wishlist kaydetme hatası');
      }
    }
    this.itemsSubject.next([...this.items]);
    this.countSubject.next(this.items.length);
  }
}
