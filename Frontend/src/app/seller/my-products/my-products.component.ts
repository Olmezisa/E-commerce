import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../core/services/seller.service';
import { Product } from '../../products/models/product.model';

@Component({
  selector: 'app-my-products',
  standalone:false,
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(private sellerService: SellerService) {}

  ngOnInit(): void {
    this.sellerService.getMyProducts().subscribe({
      next: prods => {
        this.products = prods;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Ürünler yüklenirken hata oluştu';
        this.loading = false;
      }
    });
  }
}
