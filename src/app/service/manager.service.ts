import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewBasicUser } from '../core/models/new-basic-user';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  schoolProfileURL = 'http://localhost:8080/basicuser/';

  constructor(private httpClient: HttpClient) { }

  public update(id: number, profile: NewBasicUser): Observable<any> {
    return this.httpClient.put<any>(this.schoolProfileURL + `update/${id}`, profile);
  }

}
