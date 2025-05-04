import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { RoleGuard } from '../core/guards/role.guard';
import { AddProductsComponent } from './add-products/add-products.component';

const routes: Routes = [
  { path: '', component: SellerDashboardComponent,
  children:[
    {
    path: 'dashboard', component:SellerDashboardComponent,
    canActivate:[RoleGuard],
    data: {roles:['SELLER']}
    },
    {
      path: '', redirectTo: 'dashboard', pathMatch: 'full'
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
