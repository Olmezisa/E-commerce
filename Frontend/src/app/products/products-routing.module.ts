import { Component } from '@angular/core';
//hangi sayfa hangi component açılacak url leri ayarlama
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListPageComponent } from './product-list-page/product-list-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { ProductComparePageComponent } from './product-compare-page/product-compare-page.component';
import { SearchPageComponent } from './search-page/search-page.component';



const routes: Routes = [
  { path: '', component: ProductListPageComponent },            // /products
  { path: 'detail/:id', component: ProductDetailPageComponent },// /products/detail/:id
  { path: 'compare', component: ProductComparePageComponent },
  { path: '', component:SearchPageComponent}  // /products/compare
];

@NgModule({
  imports: [RouterModule.forChild(routes)], //feature module routing olduğu için forChild kullanıyoruz
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
