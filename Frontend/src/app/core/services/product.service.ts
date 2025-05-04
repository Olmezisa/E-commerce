
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

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }
  getPendingProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/pending`);
  }

  approveProduct(id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}/approve`, {});
  }

  rejectProduct(id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}/reject`, {});
  }

  addProduct(productData:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/products`,
      productData
    );
  }
}
