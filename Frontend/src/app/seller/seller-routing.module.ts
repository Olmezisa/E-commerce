import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { RoleGuard } from '../core/guards/role.guard';
import { AddProductsComponent } from './add-products/add-products.component';
import { SellerRegisterComponent } from './seller-register/seller-register.component';

const routes: Routes = [
  { path: '', component: SellerComponent,
  children:[
    {
    path: 'dashboard', component:SellerDashboardComponent,
    canActivate:[RoleGuard],
    data: {roles:['SELLER']}
    },
    {
      path: 'seller-register', component:SellerRegisterComponent
    },
    { path: 'add-products', component:AddProductsComponent,
      canActivate:[RoleGuard],
      data: {roles:['SELLER']}
    },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
