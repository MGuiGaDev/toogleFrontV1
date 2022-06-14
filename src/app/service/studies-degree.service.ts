import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudiesCycle } from '../core/models/studies-cycle';

@Injectable({
  providedIn: 'root'
})
export class StudiesDegreeService {
  studiesURL = 'http://localhost:8080/studies/';
  constructor(private httpClient: HttpClient) { }

  public list(): Observable<StudiesCycle[]>{
    return this.httpClient.get<StudiesCycle[]>(this.studiesURL + 'list/dto');
  }
  public getOne(code: string): Observable<any>{
    return this.httpClient.get<StudiesCycle[]>(this.studiesURL + `one/${code}`);
  }

 

}
