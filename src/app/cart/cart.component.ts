import { CartItem } from './cart-item.model';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart.component.html',
  standalone: false,
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
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
