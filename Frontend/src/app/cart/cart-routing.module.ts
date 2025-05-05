import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart.component';
import { CartListComponent } from './cart-list/cart-list.component';


const routes: Routes = [
  { path: '', component: CartComponent,
    children:[
      { path: 'cartlist', component: CartListComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'cart', component :CartComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
