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
  standalone:false,
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css']
})
export class ProductListPageComponent implements OnInit, OnChanges {
  @Input() categoryFilter = '';

  products: Product[] = [];
  filtered: Product[] = [];
  selectedProducts: Product[] = [];
  searchTerm = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar,
    private wishlist:WishlistService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(list => {
      this.products = list;
      this.applyFilter();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryFilter']) {
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
        p => p.title.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.snackBar.open(`${product.title} sepete eklendi.`, 'Kapat', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  addToCompare(product: Product): void {
    if (!this.selectedProducts.includes(product) && this.selectedProducts.length < 2) {
      this.selectedProducts.push(product);
    }
  }

  compareSelected(): void {
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

  viewDetails(product: Product): void {
    this.router.navigate(['/products/detail', product.id]);
  }

  isWishlisted(p: Product): boolean {
    return this.wishlist.isInWishlist(p.id);
  }

  toggleWishlist(p: Product): void {
    this.wishlist.toggle(p);
  }


  onSearch(term: string): void {
    this.searchTerm = term.trim().toLowerCase();
    this.applyFilter();
  }


}
