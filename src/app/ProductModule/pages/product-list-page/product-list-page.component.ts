import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-page',
  standalone: false,
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css']
})
export class ProductListPageComponent implements OnInit {
  products: Product[] = []; // Ürünleri tutmak için
  selectedProducts: Product[] = []; // Karşılaştırmaya eklenen ürünleri tutar

  constructor(
    private ProductService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts(); // Component yüklenince ürünleri çek
  }

  loadProducts(): void {
    this.ProductService.getProducts().subscribe((data: Product[]) => {
      this.products = data; // API'den gelen veriyi products dizisine atıyoruz
    });
  }

  compareSelected(): void {
    if (this.selectedProducts.length === 2) {
      const product1Id = this.selectedProducts[0].id;
      const product2Id = this.selectedProducts[1].id;

      this.router.navigate(['/products/compare'], {
        queryParams: { product1: product1Id, product2: product2Id } // Karşılaştırmaya yönlendiriyoruz
      });

      this.selectedProducts = []; // Seçilen ürünleri sıfırla
    }
  }

  onViewDetails(productId: number): void {
    this.router.navigate(['/products/detail', productId]); // Ürün detayına yönlendiriyoruz
  }

  addToCompare(product: Product): void {
    if (this.selectedProducts.length < 2 && !this.selectedProducts.includes(product)) {
      this.selectedProducts.push(product); // Ürünü karşılaştırmaya ekliyoruz
    }
  }

  addToCart(product: Product): void {
    // Sepete eklemek için buraya bir işlev ekliyoruz
    console.log(`${product.name} sepete eklendi.`);
  }
}
