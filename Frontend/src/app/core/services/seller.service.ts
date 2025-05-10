import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellerRegistrationRequest } from '../models/SellerRegistrationRequest';
import { UserResponse } from '../models/user-response.model';
import { Product, Seller } from '../../products/models/product.model';

export interface SellerDashboardDto {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private url=`${environment.apiUrl}/auth/register-seller`;
  private url1=`${environment.apiUrl}/seller`;

  constructor(private http:HttpClient) {}

  registerSeller(data: SellerRegistrationRequest):Observable<UserResponse>{
      return this.http.post<UserResponse>(this.url,data);
    }

  getMyProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.url1}/my-products`);
    }
  getDashboard():Observable<SellerDashboardDto>{
    return this.http.get<SellerDashboardDto>(`${this.url1}/my-products`);
  }

}
