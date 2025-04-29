import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-product-detail-page',
  standalone: false,
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {
  product!: Product;
  rating: number = 0;
  ratingCount: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductById(1).subscribe((data: Product) => {
      console.log('Fetched Product in Detail Page:', data); // Veriyi kontrol et
      this.product = data;
      this.rating = data.rating.rate;
      this.ratingCount = data.rating.count;
    });
  }
}
