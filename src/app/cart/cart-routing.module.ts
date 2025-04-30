import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from '../checkout/checkout-page/checkout-page.component';


const routes: Routes = [
  { path: '', component: CartPageComponent },
  { path: 'checkout', component: CheckoutPageComponent } // /cart için bu component
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
