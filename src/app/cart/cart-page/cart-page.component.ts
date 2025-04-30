import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Product } from '../../ProductModule/models/product.model';
import { CartItem } from '../cart-item.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  standalone: false,
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
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
