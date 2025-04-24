import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export class Product{
  constructor(
    public name:string,
    public description:string,
    public unitPrice:number,
    public imageUrl:string,
    public unitsInStock:number,
    public dateCreated:Date,
    public lastUpdated:Date
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl='http://localhost:8080/api/products';


  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]>{
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }


}
 interface GetResponse{
    _embedded:{
      products: Product[];
    }
  }
