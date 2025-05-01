
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }   from './auth/login/login.component';
import { RegisterComponent }from './auth/register/register.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { BuyerComponent } from './GuardingHome/buyer/buyer.component';
import { SellerComponent } from './GuardingHome/seller/seller.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { UnauthorizedComponent } from './GuardingHome/unauthorized/unauthorized.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailPageComponent } from './ProductModule/pages/product-detail-page/product-detail-page.component';
import { ProductComparePageComponent } from './ProductModule/pages/product-compare-page/product-compare-page.component';
import { SearchPageComponent } from './search/search-page/search-page.component';

const routes: Routes = [
  { path: '',          redirectTo: 'home', pathMatch: 'full' },
  { path:'home',component:HomeComponent },
  { path: 'login',     component: LoginComponent },
  { path: 'signup',    component: RegisterComponent },
  { path: 'products/detail/:id', component: ProductDetailPageComponent },  // ProductDetailPageComponent için route ekledik
  { path: 'products/compare', component: ProductComparePageComponent },  // ProductComparePageComponent için route ekledik
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'search',component:SearchPageComponent},

  {
    path: 'buyer',
    component: BuyerComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['BUYER'] }
  },
  {
    path: 'seller',
    component: SellerComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['SELLER'] }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
