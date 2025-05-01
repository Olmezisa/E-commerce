// header.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService,User } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.component.html' })
export class HeaderComponent  {


  constructor(private auth: AuthService) {}



}
