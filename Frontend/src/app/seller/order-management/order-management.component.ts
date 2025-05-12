import { Component, OnInit } from '@angular/core';
import { OrderResp, OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-order-management',
  standalone: false,
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})
export class OrderManagementComponent implements OnInit {
orders: OrderResp[] = [];
  loading = true;
  error = '';

  constructor(private orderSvc: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  private loadOrders() {
    this.loading = true;
    this.error = '';
    this.orderSvc.getSellerOrders().subscribe({
      next: data => {
        this.orders = data;
        this.loading = false;
      },
      error: err => {
        this.error = err.message || 'Satışlar yüklenemedi';
        this.loading = false;
      }
    });
  }

  onCancel(o: OrderResp) {
    if (!confirm(`Sipariş #${o.orderId} iptal edilsin mi?`)) return;
    this.orderSvc.cancelOrder(o.orderId).subscribe({
      next: () => this.loadOrders(),
      error: err => alert('İptal sırasında hata: ' + (err.message || err.statusText))
    });
  }
}
