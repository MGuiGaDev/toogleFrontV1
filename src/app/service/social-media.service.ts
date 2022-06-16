import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialMedia } from '../core/models/social-media';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  //socialMediaURL = 'http://localhost:8080/toggle/social-media/';
  //socialMediaURL = 'http://localhost:8080/social-media/';
  schoolProfileURL = 'https://toggleback.herokuapp.com/account/';
   

  constructor(private httpClient: HttpClient) {   }

    public list(): Observable<SocialMedia[]>{
      return this.httpClient.get<SocialMedia[]>(this.schoolProfileURL + "list");
    }
 
}
