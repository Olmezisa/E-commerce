import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';

const routes: Routes = [
  {   path: '', component: OrdersComponent,
      canActivate:[AuthGuard,RoleGuard],
      data:{roles:['BUYER']},
    children:[
      {path:'my-orders',component:MyOrdersComponent},
      {path:'order-tracking/:id',component:OrderTrackingComponent}
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
