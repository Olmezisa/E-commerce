import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AdminService {
  private api = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.api}/users/count`);
  }


  getProductCount(): Observable<number> {
    return this.http.get<number>(`${this.api}/products/count`);
  }

  getOrderCount(): Observable<number> {
    return this.http.get<number>(`${this.api}/orders/count`);
  }
}
