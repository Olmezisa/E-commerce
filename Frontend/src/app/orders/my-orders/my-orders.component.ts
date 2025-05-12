import { Component, OnInit } from '@angular/core';
import { OrderResp, OrderService } from '../../core/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  standalone: false,
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: OrderResp[] = [];
  loading = true;
  error = '';

  constructor(private orderSvc: OrderService,private router: Router) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
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

  onCancel(order: OrderResp) {
    if (!confirm(`Sipariş #${order.orderId} iptal edilsin mi?`)) {
      return;
    }
    this.orderSvc.cancelOrder(order.orderId).subscribe({
      next: updated => {
        this.loadOrders();
      },
      error: err => {
        alert('İptal sırasında hata: ' + (err.message || err.statusText));
      }
    });
  }
   trackOrder(o: OrderResp): void {
    this.router.navigate(['/orders/order-tracking', o.orderId]);
  }
}
