import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { SellerAnalyticsComponent } from './seller-analytics/seller-analytics.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { VariantModule } from '../variant/variant.module';
import { OrderManagementComponent } from './order-management/order-management.component';



@NgModule({
  declarations: [
    SellerComponent,
    SellerDashboardComponent,
    SellerAnalyticsComponent,
    AddProductsComponent,
    MyProductsComponent,
    EditProductComponent,
    OrderManagementComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    ReactiveFormsModule,
    VariantModule

  ]
})
export class SellerModule { }
