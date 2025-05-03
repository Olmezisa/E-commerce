// src/app/core/guards/role.guard.ts
import { Injectable } from '@angular/core';

import {CanActivate,ActivatedRouteSnapshot,Router} from '@angular/router';
import { AuthService, Role } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // route.data['roles'] dizisi ['buyer','seller','admin'] gibi stringler tutuyor
    const allowedRoles = route.data['roles'] as Role[];

    // Senkron getter ile güncel rolü al
    const currentRole = this.auth.userRole;

    if (currentRole && allowedRoles.includes(currentRole)) {
      return true;
    }

    // Yetkisi yoksa unauthorized sayfasına yönlendir
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
