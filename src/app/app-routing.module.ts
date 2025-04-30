// src/app/app-routing.module.ts
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

const routes: Routes = [
  { path: '',          redirectTo: 'home', pathMatch: 'full' },
  {path:'home',component:HomeComponent },
  { path: 'login',     component: LoginComponent },
  { path: 'signup',    component: RegisterComponent },
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
