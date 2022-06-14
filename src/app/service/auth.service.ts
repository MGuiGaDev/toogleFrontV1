import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginBasicUser } from '../core/models/login-basic-user';
import { NewBasicUser } from '../core/models/new-basic-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/toggle/auth/';
  /**
   * authURL = 'http://localhost:8080/toggle/auth/';
   * @param httpClient 
   */

  constructor(private httpClient: HttpClient) { }

  public createBasicUser(newBasicUser: NewBasicUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'create-account', newBasicUser);
  }

  public createBasicUserTeacher(newBasicUser: NewBasicUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'create-acount-teacher', newBasicUser);
  }

  public login(loginBasicUser: LoginBasicUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'login', loginBasicUser);
  }

}
