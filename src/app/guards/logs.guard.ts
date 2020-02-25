import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from
'@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
@Injectable()
export class AuthsGuard implements CanActivate {
  constructor(private myRoute: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(localStorage.getItem('auth_tokens')){
      return true;
    }else{
      this.myRoute.navigate(["/loginsonicu"],{replaceUrl:true});
      return false;
    }
  }
}

