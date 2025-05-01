import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../../ProductModule/services/product.service';
import { Product } from '../../ProductModule/models/product.model';

@Component({
  selector: 'app-search',
  standalone:false,
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('', { nonNullable: true });
  suggestions$!: Observable<Product[]>;
  showDropdown = false;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const products$ = this.productService.getProducts();
    const term$ = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(300),
      distinctUntilChanged()
    );

    this.suggestions$ = combineLatest([products$, term$]).pipe(
      map(([products, term]) =>
        products
          .filter(p => p.title.toLowerCase().includes(term.toLowerCase()))
          .slice(0, 5)
      )
    );

    this.searchControl.valueChanges.subscribe(val => {
      this.showDropdown = val.length > 0;
    });
  }

  select(product: Product) {
    this.showDropdown = false;
    this.router.navigate(['/products/detail', product.id]);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-wrapper')) {
      this.showDropdown = false;
    }
  }
  onEnter():void{
    const term = this.searchControl.value.trim();
    if(term){
      this.showDropdown =false;
      this.router.navigate(['/search'],{queryParams:{term}});
    }
  }
}
