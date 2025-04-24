// header.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService,User } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.component.html' })
export class HeaderComponent implements OnInit {
  isUserMenuOpen=false;
  user$!: Observable<User | null>;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user$ = this.auth.currentUser$;
  }

  logout() {
    this.auth.logout();
  }
}
