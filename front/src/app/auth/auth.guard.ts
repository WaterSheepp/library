import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router } from '@angular/router'
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private userService: UserService, private router: Router) {


  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.userService.isLogedIn()) {
        this.router.navigateByUrl('login');
        this.userService.deleteToken();
        return false;
      }
    return true;
  }
  
}
 