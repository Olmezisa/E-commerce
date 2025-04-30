import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-buyer',
  standalone: false,
  templateUrl: './buyer.component.html',
  styleUrl: './buyer.component.css'
})
export class BuyerComponent {
  constructor(private authService:AuthService){

  }

  logout(){
    this.authService.logout();
  }

}
