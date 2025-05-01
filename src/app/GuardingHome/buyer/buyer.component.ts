import { CartService } from './../../cart/service/cart.service';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

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
