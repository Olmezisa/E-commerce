import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';  // ActivatedRoute import ediyoruz

@Component({
  selector: 'app-product-detail-page',
  standalone: false,
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {
  product!: Product;  // Product nesnesini tanımlıyoruz
  loading: boolean = true;  // Verinin yüklenme durumu
  rating: number = 0;
  ratingCount: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute  // ActivatedRoute'i enjekte ediyoruz
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');  // URL parametrelerinden id'yi alıyoruz
    if (productId) {
      this.productService.getProductById(Number(productId)).subscribe((data: Product) => {
        this.product = data;
        this.rating = data.rating.rate;
        this.ratingCount = data.rating.count;
        this.loading = false;  // Yükleme tamamlandı
      });
    }
  }
}
