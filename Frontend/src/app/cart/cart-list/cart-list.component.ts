import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../cart-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  standalone:false,
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
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });
  }

  viewDetails(productId: number): void {
    this.router.navigate(['/products/detail', productId]);
  }

  removeItem( event: MouseEvent): void {
    event.stopPropagation();
    this.cartService.clearCart().subscribe(() => this.refreshCart());
  }

  increaseQty(productId: number, event: MouseEvent): void {
    event.stopPropagation();
    this.cartService.addToCart(productId, 1).subscribe(() => this.refreshCart());
  }

  decreaseQty(productId: number, event: MouseEvent): void {
    event.stopPropagation();
    this.cartService.addToCart(productId, -1).subscribe(() => this.refreshCart());
  }
}
