import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private jwtHelper: JwtHelperService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const path = next.routeConfig.path;

    console.log('Path: ', path);

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      if (role && role !== '') {
        console.log('Role: ', role);
        if (role === 'ADO PL') {
          switch (path) {
            case 'home': return true;
            case 'already': return true;
            default: {
              this.router.navigate(['login']);
              return false;
            }
          }
        }
        if (role === 'ADO Tech') {
          switch (path) {
            case 'upload': return true;
            case 'reported': return true;
            default: {
              this.router.navigate(['login']);
              return false;
            }
          }
        }
      }
    }
    /*if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log(this.jwtHelper.decodeToken(token));
      return true;
    }
    this.router.navigate(['login']);
    return false;*/
  }
  
}
