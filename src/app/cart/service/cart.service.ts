import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../ProductModule/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  addToCart(product: Product): void {
    this.cartItems.push(product);
    this.cartItemsSubject.next([...this.cartItems]);
    this.cartCountSubject.next(this.cartItems.length);
  }

  getCartItems(): Product[] {
    return [...this.cartItems];
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next([]);
  }
}
