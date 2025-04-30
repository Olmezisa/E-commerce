import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-compare-page',
  standalone: false,
  templateUrl: './product-compare-page.component.html',
  styleUrls: ['./product-compare-page.component.css']
})


export class ProductComparePageComponent implements OnInit {
  product1: Product | undefined;
  product2: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id1 = Number(params.get('product1'));
      const id2 = Number(params.get('product2'));

      if (id1) {
        this.productService.getProductById(id1).subscribe((data) => {
          this.product1 = data;
        });
      }

      if (id2) {
        this.productService.getProductById(id2).subscribe((data) => {
          this.product2 = data;
        });
      }
    });
  }
}
