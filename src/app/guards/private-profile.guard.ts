import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class PrivateProfileGuard implements CanActivate {
  username!: string;
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }
  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    const expectedUsername = route.params.username;
    this.username = this.tokenService.getUserName();
    if(this.username=='') {
      this.router.navigate([`/toggle/login`]);
      return false;
    } else if(expectedUsername!==this.username){
        this.router.navigate([`/toggle/perfil-teacher/${this.username}`]);
      return false;
    } else {
        return true;
    }
  }
}
/**
 * this.router.navigate([`/toggle/login`]);
 * this.router.navigate([`/toggle/perfil-teacher/${this.username}`]);
 */