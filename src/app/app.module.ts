import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { NavbarComponent } from './header/navbar/navbar.component';
import { FooterComponent } from './header/footer/footer.component'
import { CommonModule } from '@angular/common';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { AuthService } from './services/auth.service';

import { ProductModule } from './ProductModule/product.module'; // ProductModule'i buraya ekliyoruz
import { ProductCardComponent } from './ProductModule/Components/product-card/product-card.component';
import { ProductDetailComponent } from './ProductModule/Components/product-detail/product-detail.component';
import { ProductFilterComponent } from './ProductModule/Components/product-filter/product-filter.component';
import { ReviewCardComponent } from './ProductModule/Components/review-card/review-card.component';
import { ReviewListComponent } from './ProductModule/Components/review-list/review-list.component';
import { ProductComparePageComponent } from './ProductModule/pages/product-compare-page/product-compare-page.component';
import { ProductDetailPageComponent } from './ProductModule/pages/product-detail-page/product-detail-page.component';
import { ProductListPageComponent } from './ProductModule/pages/product-list-page/product-list-page.component';
import { CartPageComponent } from './cart/cart-page/cart-page.component';
import { BuyerComponent } from './GuardingHome/buyer/buyer.component';
import { SellerComponent } from './GuardingHome/seller/seller.component';
import { UnauthorizedComponent } from './GuardingHome/unauthorized/unauthorized.component';
import { AdminComponent } from './Admin/admin/admin.component';


import { CheckoutPageComponent } from './checkout/checkout-page/checkout-page.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './components/search/search.component';
import { SearchPageComponent } from './search/search-page/search-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ProductCardComponent,
    ProductDetailComponent,
    ProductFilterComponent,
    ReviewCardComponent,
    ReviewListComponent,
    ProductComparePageComponent,
    ProductDetailPageComponent,
    ProductListPageComponent,
    CartPageComponent,
    CheckoutPageComponent,
    BuyerComponent,
    SellerComponent,
    UnauthorizedComponent,


    AdminComponent,
    CheckoutPageComponent,
    SearchComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    ReactiveFormsModule,
    CommonModule,
    SocialLoginModule,
    ProductModule,
    BrowserAnimationsModule,  // önemli!
    MatSnackBarModule,
    HttpClientModule

  ],
  providers: [
    provideClientHydration(withEventReplay()),
    AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'GOOGLE_CLIENT_ID_HERE'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              'FACEBOOK_APP_ID_HERE'
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
