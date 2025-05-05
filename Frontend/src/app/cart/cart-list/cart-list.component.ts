import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../cart-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  standalone: false,
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshCart();
  }

  refreshCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  // Kartın tamamına tıklandığında detaya gider
  viewDetails(productId: number): void {
    this.router.navigate(['/products/detail', productId]);
  }

  removeItem(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.cartService.removeFromCart(id);
    this.refreshCart();
  }

  increaseQty(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.cartService.increaseQuantity(id);
    this.refreshCart();
  }

  decreaseQty(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.cartService.decreaseQuantity(id);
    this.refreshCart();
  }
}
