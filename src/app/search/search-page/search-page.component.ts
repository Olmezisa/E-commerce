import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../../ProductModule/models/product.model';
import { ProductService } from '../../ProductModule/services/product.service';
import { CartService } from '../../cart/service/cart.service';

@Component({
  selector: 'app-search-page',
  standalone:false,
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent implements OnInit {
  term = '';
  results$!: Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService:CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.results$ = this.route.queryParamMap.pipe(
      map(params => this.term = params.get('term')?.trim() || ''),
      switchMap(term => this.productService.getProducts().pipe(
        map(list => list.filter(p => p.title.toLowerCase().includes(term.toLowerCase())))
      ))
    );
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }
}
