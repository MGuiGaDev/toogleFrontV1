import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Podría haber usado sessionStorage
 * diferencia: 
 * - localStorage => no tiene fecha de expiración, siendo compartida por varias ventanas
 * - sessionStorage => tiene fecha de expiración y solo es utilizable en una ventana
 * - 
 */

const TOKEN_KEY = 'AuthToken';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor(private router: Router) { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY)!;
  }
  public logOut(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/toggle/login']);
  }
  public logOut2(): void {
    window.localStorage.removeItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    if(this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  public getUserName(): string {
    if(!this.isLogged()) {
      return '';
    } else {
      const payload = this.getToken().split('.')[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const username = values.sub;
      return username;
    }
  }
  public getUserType(): string {
    if(!this.isLogged()) {
      return '';
    } else {
      const payload = this.getToken().split('.')[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const userType = values.userType;
      return userType;
    }
  }

  public getIsAdmin(): boolean {
    if(!this.isLogged()) {
      return false;
    }
    const payload = this.getToken().split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles; 
    if(roles.indexOf('ROLE_ADMIN')<0) {
      return false;
    } else {
      return true;
    }
  }

}
