import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product; //kartta gösterilecek ürün bilgileri
  @Input() selected: boolean = false; //daha öne seçildiyse buton disabled olur
  @Input() canSelect: boolean = true; //seçim sınırı dolduysa seçim yapamazsın

  @Output() viewDetails = new EventEmitter<number>();//view details butonuna tıkladığında event fırlatır
  @Output() selectCompare = new EventEmitter<Product>();//compare butonuna tıkladığında event fırlatır

  onViewDetails(): void {
    this.viewDetails.emit(this.product.id);
  }

  onSelectCompare(): void {
    this.selectCompare.emit(this.product);
  }
}

