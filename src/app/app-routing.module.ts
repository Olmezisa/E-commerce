import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ProductListPageComponent } from './ProductModule/pages/product-list-page/product-list-page.component';
import { ProductDetailPageComponent } from './ProductModule/pages/product-detail-page/product-detail-page.component';
import { ProductComparePageComponent } from './ProductModule/pages/product-compare-page/product-compare-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'products', component: ProductListPageComponent },  // ProductListPageComponent için route ekledik
  { path: 'products/detail/:id', component: ProductDetailPageComponent },  // ProductDetailPageComponent için route ekledik
  { path: 'products/compare', component: ProductComparePageComponent },  // ProductComparePageComponent için route ekledik
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: '**', redirectTo: '' }  // Yedek yönlendirme
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
