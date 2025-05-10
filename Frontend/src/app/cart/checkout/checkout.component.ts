import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../cart-item.model';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout-page',
  standalone:false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  successMessage: string = '';
  checkoutForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });

    this.loadCart();
  }

  private loadCart(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });
  }

  placeOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.cartService.clearCart().subscribe(() => {
      this.cartItems = [];
      this.totalPrice = 0;
      this.successMessage = '🎉 Siparişiniz başarıyla alındı! Teşekkür ederiz.';
      this.checkoutForm.reset();
    });
  }
}
