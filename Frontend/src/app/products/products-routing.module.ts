import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListPageComponent } from './product-list-page/product-list-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { ProductComparePageComponent } from './product-compare-page/product-compare-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ProductsComponent } from './products.component';



const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: '', component: ProductListPageComponent },
      { path: ':id', component: ProductDetailPageComponent },
      { path: 'compare', component: ProductComparePageComponent },
      { path: 'search', component: SearchPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
