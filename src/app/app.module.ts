import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';


import { CommonModule } from '@angular/common';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';



import { ProductComparePageComponent } from './products/product-compare-page/product-compare-page.component';


import { BuyerComponent } from './GuardingHome/buyer/buyer.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AdminComponent } from './admin/admin.component';
import { AuthService } from './core/services/auth.service';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';


@NgModule({
  declarations: [
    AppComponent,
    BuyerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    ReactiveFormsModule,
    CommonModule,
    ProductsModule,
    SocialLoginModule,
    BrowserAnimationsModule,  // önemli!
    MatSnackBarModule,
    SharedModule,
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
