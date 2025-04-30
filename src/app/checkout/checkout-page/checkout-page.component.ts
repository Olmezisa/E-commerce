import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../cart/service/cart.service';
import { CartItem } from '../../cart/cart-item.model';

@Component({
  selector: 'app-checkout-page',
  standalone: false,
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  successMessage: string = '';
  checkoutForm!: FormGroup;

  constructor(private cartService: CartService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();

    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
  }

  placeOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    // Sipariş başarılı
    this.cartService.clearCart();
    this.cartItems = [];
    this.totalPrice = 0;
    this.successMessage = '🎉 Siparişiniz başarıyla alındı! Teşekkür ederiz.';
    this.checkoutForm.reset();
  }
}
