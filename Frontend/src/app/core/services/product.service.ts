
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../products/models/product.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(status?: string): Observable<Product[]> {
    if (status) {
      return this.http.get<Product[]>(`${this.apiUrl}/products?status=${status}`);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  approveProduct(id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}/approve`, {});
  }

  rejectProduct(id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}/reject`, {});
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/admin/${id}`);
  }

  addProduct(productData:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/products`,
      productData
    );
  }
  unbanProduct(id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}/unban`, {});
  }
}
