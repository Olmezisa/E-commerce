import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-category-quick-links',
  standalone:false,
  templateUrl: './category-quick-links.component.html',
  styleUrls: ['./category-quick-links.component.css']
})
export class CategoryQuickLinksComponent implements OnInit {
  categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      // Sadece benzersiz kategorileri al
      this.categories = Array.from(new Set(products.map(p => p.category)));
    });
  }

  select(category: string) {
    this.categorySelected.emit(category);
  }
}
