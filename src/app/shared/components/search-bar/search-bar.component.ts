import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap
} from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { Router } from '@angular/router';

import Fuse from 'fuse.js';
import { Product } from '../../../products/models/product.model';
import { ProductService } from '../../../core/services/product.service';


@Component({
  selector: 'app-search-bar',
  standalone:false,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('', { nonNullable: true });
  suggestions: Product[] = [];
  allProducts: Product[] = [];
  private sub!: Subscription;
  private fuse!: Fuse<Product>;

  @Output() search = new EventEmitter<string>();

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1) Ürünleri çek ve Fuse'u hazırla
    this.productService.getProducts().subscribe(list => {
      this.allProducts = list;
      this.fuse = new Fuse(list, {
        keys: ['title'],
        threshold: 0.4,       // 0.0 çok sıkı, 1.0 çok gevşek
        includeScore: true
      });
    });

    // 2) Canlı öneri: yazarken Fuse ile en iyi 5 sonucu al
    this.sub = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(term => {
        const q = term.trim();
        if (!q) {
          this.suggestions = [];
        }
      }),
      filter(term => term.trim().length > 0),
      tap(term => {
        // Fuse’dan top 5 sonucu çek
        const results = this.fuse.search(term).slice(0, 5);
        this.suggestions = results.map(r => r.item);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /** Bir öneriye tıklandığında */
  onSelect(product: Product): void {
    this.router.navigate(['/products', product.id]);
    this.clear();
  }

  /** Enter’a basıldığında veya form submit olduğunda */
  onSubmit(): void {
    const term = this.searchControl.value.trim();
    if (!term) return;

    // 3) Fuse’dan “tüm” yakın sonuçları al (en iyi 20)
    const results = this.fuse.search(term).slice(0, 20);
    this.suggestions = results.map(r => r.item);

    // 4) İsterseniz direkt /search sayfasına da yönlendirebilirsiniz:
    // this.router.navigate(['/search'], { queryParams: { q: term } });
  }

  clear(): void {
    this.searchControl.setValue('');
    this.suggestions = [];
  }
}
