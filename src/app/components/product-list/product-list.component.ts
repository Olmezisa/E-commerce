import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products:Product[]=[];
  constructor(private productService:ProductService){}

  ngOnInit():void{
    this.listProducts();
  }

  //crossOrigin eklememiz lazım backend tarafına
  listProducts(){
    this.productService.getProductList().subscribe(
      data =>{
        this.products=data;
      }
    )
  }
}
