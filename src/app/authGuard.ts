import { AdalService } from "ng2-adal/services";
import { SecretService } from '../services/secret.service';
import { Injectable }  from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
        private adalService: AdalService,
        private secretService: SecretService) {
            this.adalService.init(this.secretService.adalConfig);
            this.adalService.handleWindowCallback();
        }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { 
    return this.checkLogin();
  }

  checkLogin(){
      if(this.adalService.userInfo.isAuthenticated){
          console.log('authGuard: isAutenticated -> allow');
          return this.router.url.includes("oic");
      }
      else{
          console.log('authGuard: isAutenticated -> deny');
          this.adalService.login();
          return false;
      }
  }
  
}