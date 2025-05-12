import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';

const routes: Routes = [
  { path: '', component: OrdersComponent,
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
