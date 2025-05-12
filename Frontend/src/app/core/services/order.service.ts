
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PaymentCreateResp {
  clientSecret: string;
  paymentIntentId: string;
}

export interface OrderItemReq {
  productId: number;
  quantity: number;
}

export interface ConfirmOrderReq {
  paymentIntentId: string;
  items: OrderItemReq[];
}

export interface OrderResp {
  orderId: number;
  status: string;
  totalAmount: number;
  currency: string;
  createdAt:Date;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private base = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  createPayment(amount: number): Observable<PaymentCreateResp> {
    return this.http.post<PaymentCreateResp>(
      `${environment.apiUrl}/payments/create?amount=${amount}`, {}
    );
  }

  confirmOrder(req: ConfirmOrderReq): Observable<OrderResp> {

    return this.http.post<OrderResp>(`${this.base}/create`, req);
  }

  getBuyerOrders(): Observable<OrderResp[]> {
    return this.http.get<OrderResp[]>(`${this.base}/my`);
  }

  cancelOrder(orderId: number): Observable<OrderResp> {
  return this.http.post<OrderResp>(
    `${this.base}/${orderId}/cancel`, {}
  );
  }

  getSellerOrders(): Observable<OrderResp[]> {
    return this.http.get<OrderResp[]>(`${this.base}/seller`);
  }


}
