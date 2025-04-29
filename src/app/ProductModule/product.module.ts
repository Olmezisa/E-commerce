import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //ngif ngfor ngclass ngstyle falan buradan geliyor
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductRoutingModule } from './product-routing.module';

import { ProductService } from '../ProductModule/services/product.service'; // ProductService'i buraya ekliyoruz


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductRoutingModule,

  ],
  providers: [
    ProductService, // Service burada sağlanıyor
  ]
})
export class ProductModule { }
