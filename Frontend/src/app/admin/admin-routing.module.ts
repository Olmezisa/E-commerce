import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products/pending', component: ProductManagementComponent },
      { path: 'orders', component: OrderManagementComponent },
      { path: 'users', component: UserManagementComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
