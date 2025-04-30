
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService,Role } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean|UrlTree {
    const allowed: Role[] = route.data['roles'];
    const user = this.auth.getCurrentUser();
    if (user && user.role && allowed.includes(user.role)) {
      return true;
    }
    return this.router.createUrlTree(['/unauthorized']);
  }
}
