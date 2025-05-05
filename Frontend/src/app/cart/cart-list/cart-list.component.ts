import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../cart-item.model';

@Component({
  selector: 'app-cart-list',
  standalone: false,
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.refreshCart();
  }

  refreshCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
    this.refreshCart();
  }
  increaseQty(id: number): void {
    this.cartService.increaseQuantity(id);
    this.refreshCart();
  }

  decreaseQty(id: number): void {
    this.cartService.decreaseQuantity(id);
    this.refreshCart();
  }
}
