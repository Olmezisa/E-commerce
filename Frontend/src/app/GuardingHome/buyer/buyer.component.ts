
import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-buyer',
  standalone: false,
  templateUrl: './buyer.component.html',
  styleUrl: './buyer.component.css'
})
export class BuyerComponent {
  cartCount$: Observable<number>;

  constructor(private authService:AuthService,private cartService:CartService){
  this.cartCount$=this.cartService.cartCount$;
  }

  logout(){
    this.authService.logout();
  }

}
