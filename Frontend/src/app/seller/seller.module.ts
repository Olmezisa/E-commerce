import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { SellerAnalyticsComponent } from './seller-analytics/seller-analytics.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SellerRegisterComponent } from './seller-register/seller-register.component';


@NgModule({
  declarations: [
    SellerComponent,
    SellerDashboardComponent,
    SellerAnalyticsComponent,
    AddProductsComponent,
    MyProductsComponent,
    SellerRegisterComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    ReactiveFormsModule,

  ]
})
export class SellerModule { }
