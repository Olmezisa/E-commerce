// src/app/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone:false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService,private router:Router) {}

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.productService.getProductList().subscribe(
      data => this.products = data,
      err  => console.error('API hatası', err)
    );
  }
  toggleFavorite(p: Product) {
    p.favorite = !p.favorite;

    // Favorilere ekleyince favorites sayfasına yönlendir
    if (p.favorite) {
      this.router.navigate(['/favorites']);
    }
  }


}
