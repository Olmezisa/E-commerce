import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellerRegistrationRequest } from '../models/SellerRegistrationRequest';
import { UserResponse } from '../models/user-response.model';



@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private url=`${environment.apiUrl}/auth/register-seller`;

  constructor(private http:HttpClient) {}

  registerSeller(data: SellerRegistrationRequest):Observable<UserResponse>{
      return this.http.post<UserResponse>(this.url,data);
    }
}
