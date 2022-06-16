import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from '../core/models/manager';
import { NewBasicUser } from '../core/models/new-basic-user';
import { SchoolProfile } from '../core/models/school-profile';
import { StudiesCycle } from '../core/models/studies-cycle';

@Injectable({
  providedIn: 'root'
})
export class SchoolProfileService {

  
  schoolProfileURL = 'http://localhost:8080/toggle/account/';
  //schoolProfileURL = 'http://localhost:8080/account/';
  //schoolProfileURL = 'https://toggleback.herokuapp.com/account/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<SchoolProfile[]>{
    return this.httpClient.get<SchoolProfile[]>(this.schoolProfileURL + 'list');
  }

  public detail(id: number): Observable<SchoolProfile>{
    return this.httpClient.get<SchoolProfile>(this.schoolProfileURL + `detail/${id}`);
  }

  public detailByUsername(username: string): Observable<SchoolProfile>{
    return this.httpClient.get<SchoolProfile>(this.schoolProfileURL + `detail/profile/${username}`);
  }

  public save(profile: SchoolProfile): Observable<any> {
    return this.httpClient.post<any>(this.schoolProfileURL + 'create/', profile);
  }

  public update(id: number, profile: SchoolProfile): Observable<any> {
    return this.httpClient.put<any>(this.schoolProfileURL + `update/${id}`, profile);
  }

  public updateCycle(id: String, profile: SchoolProfile): Observable<any> {
    return this.httpClient.put<any>(this.schoolProfileURL + `updateCycle/${id}`, profile);
  }

  public updateManager(id: number, profile: Manager): Observable<any> {
    return this.httpClient.put<any>(this.schoolProfileURL + `updateManager/${id}`, profile);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.schoolProfileURL + `delete/${id}`);
  }

  public deleteTeacher(username: string): Observable<string>{
    return this.httpClient.delete<any>(this.schoolProfileURL + `deleteTeacher/${username}`);
  }

  public deleteCycle(id: number, code: StudiesCycle): Observable<any>{
    return this.httpClient.delete<any>(this.schoolProfileURL + `deleteCycle/${id}`, {body:code} );
  }

}
