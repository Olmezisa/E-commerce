import { Product } from '../products/models/product.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { PricePipe } from './pipes/price.pipe';
import { RoleDirective } from './directives/role.directive';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import {  MatMenuModule } from '@angular/material/menu';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    ProductCardComponent,
    PricePipe,
    RoleDirective,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule

  ],
  exports: [
    CommonModule,      // ngIf/ngFor gibi yapılar
    MatIconModule,
    MatMenuModule,

    RouterModule,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    ProductCardComponent,
    PricePipe,
    RoleDirective,
    SearchBarComponent
  ]


})
export class SharedModule { }
