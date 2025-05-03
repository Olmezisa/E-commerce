import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoggedIn$: Observable<boolean>;
  selectedCategory ='';


  constructor(private auth:AuthService){
    this.isLoggedIn$=this.auth.isLoggedIn$;
  }
  onCategorySelected(cat:string){
    this.selectedCategory=cat;
  }
}
