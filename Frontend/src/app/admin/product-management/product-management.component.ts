import { Component, OnInit } from '@angular/core';
import { Product } from '../../products/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-management',
  standalone: false,
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent implements OnInit {
  pendingProducts: Product[] = [];
  loading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchPendingProducts();
  }

  fetchPendingProducts() {
    this.loading = true;
    this.productService.getPendingProducts().subscribe({
      next: (products) => {
        this.pendingProducts = products;
        this.loading = false;
      },
      error: (err) => {
        console.error('Ürünler alınamadı', err);
        this.loading = false;
      }
    });
  }

  approve(id: number) {
    this.productService.approveProduct(id).subscribe(() => {
      this.pendingProducts = this.pendingProducts.filter(p => p.id !== id);
    });
  }

  reject(id: number) {
    this.productService.rejectProduct(id).subscribe(() => {
      this.pendingProducts = this.pendingProducts.filter(p => p.id !== id);
    });
  }
}
