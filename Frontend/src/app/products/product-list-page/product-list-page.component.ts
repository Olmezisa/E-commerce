import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product-list-page',
  standalone: false,
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css']
})
export class ProductListPageComponent implements OnInit, OnChanges {
  @Input() categoryFilter = '';
  @Input() statusFilter: 'PENDING' | 'ACTIVE' | 'BANNED' = 'ACTIVE';

  products: Product[] = [];
  filtered: Product[] = [];
  selectedProducts: Product[] = [];
  searchTerm = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar,
    private wishlist: WishlistService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts(this.statusFilter).subscribe(list => {
      this.products = list;
      this.applyFilter();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryFilter'] || changes['statusFilter']) {
      this.applyFilter();
    }
  }

  private applyFilter(): void {
    this.filtered = this.products;

    if (this.categoryFilter) {
      this.filtered = this.filtered.filter(
        p => p.category.toLowerCase() === this.categoryFilter.toLowerCase()
      );
    }

    if (this.searchTerm) {
      this.filtered = this.filtered.filter(
        p => p.name.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  // Kartın tamamına tıklanınca
  viewDetails(product: Product): void {
    this.router.navigate(['/products/detail', product.id]);
  }

  addToCart(product: Product, event: MouseEvent): void {
  event.stopPropagation();
  this.cartService.addToCart(product.id, 1)
    .subscribe({
      next: () => {
        this.snackBar.open(`${product.name} sepete eklendi.`, 'Kapat', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
      },
      error: err => {
        this.snackBar.open(`Sepete eklenemedi: ${err.message}`, 'Kapat', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
      }
    });
}

  addToCompare(product: Product, event: MouseEvent): void {
    event.stopPropagation();
    if (!this.selectedProducts.includes(product) && this.selectedProducts.length < 2) {
      this.selectedProducts.push(product);
    }
  }

  compareSelected(event: MouseEvent): void {
    event.stopPropagation();
    if (this.selectedProducts.length === 2) {
      this.router.navigate(['/products/compare'], {
        queryParams: {
          product1: this.selectedProducts[0].id,
          product2: this.selectedProducts[1].id
        }
      });
      this.selectedProducts = [];
    }
  }

  toggleWishlist(product: Product, event: MouseEvent): void {
    event.stopPropagation();
    this.wishlist.toggle(product);
  }

  isWishlisted(p: Product): boolean {
    return this.wishlist.isInWishlist(p.id);
  }

  onSearch(term: string): void {
    this.searchTerm = term.trim().toLowerCase();
    this.applyFilter();
  }
}
