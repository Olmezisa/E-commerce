import { Component } from '@angular/core';
import { OrderResp, OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-my-orders',
  standalone: false,
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
orders: OrderResp[] = [];
  loading = true;
  error = '';

  constructor(private orderSvc: OrderService) {}

  ngOnInit() {
    this.orderSvc.getBuyerOrders().subscribe({
      next: data => {
        this.orders = data;
        this.loading = false;
      },
      error: err => {
        this.error = err.message || 'Siparişler yüklenemedi';
        this.loading = false;
      }
    });
  }
}
