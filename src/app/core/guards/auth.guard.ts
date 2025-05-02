import { CanActivateFn,CanActivate, ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private authService:AuthService,private router:Router){

  }


  canActivate():boolean {
    if(this.authService.isLoggedIn()){
      return true;
    }
    else{
      this.router.navigate(['/home'])
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
