// header.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService,User } from '../../services/auth.service';
import { CartService } from '../../cart/service/cart.service';

@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.component.html' })
export class HeaderComponent  {
  cartCount$: Observable<number>;

  constructor(private auth: AuthService,private cartService:CartService) {

    this.cartCount$=this.cartService.cartCount$
  }



}
