import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CartService } from '../../../cart/service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // 👈 snackbar importu

@Component({
  selector: 'app-product-list-page',
  standalone: false,
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css']
})
export class ProductListPageComponent implements OnInit {
  products: Product[] = [];
  selectedProducts: Product[] = [];

  constructor(
    private ProductService: ProductService,
    private router: Router,
    private cartService: CartService,
    private snackBar: MatSnackBar // 👈 snackbar inject
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.ProductService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  compareSelected(): void {
    if (this.selectedProducts.length === 2) {
      const product1Id = this.selectedProducts[0].id;
      const product2Id = this.selectedProducts[1].id;

      this.router.navigate(['/products/compare'], {
        queryParams: { product1: product1Id, product2: product2Id }
      });

      this.selectedProducts = [];
    }
  }

  onViewDetails(productId: number): void {
    this.router.navigate(['/products/detail', productId]);
  }

  addToCompare(product: Product): void {
    if (this.selectedProducts.length < 2 && !this.selectedProducts.includes(product)) {
      this.selectedProducts.push(product);
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.snackBar.open(`${product.title} sepete eklendi.`, 'Kapat', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'] // opsiyonel stil
    });
  }
}
