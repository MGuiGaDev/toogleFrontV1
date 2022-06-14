import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialMedia } from '../core/models/social-media';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  socialMediaURL = 'http://localhost:8080/social-media/';

  constructor(private httpClient: HttpClient) {   }

    public list(): Observable<SocialMedia[]>{
      return this.httpClient.get<SocialMedia[]>(this.socialMediaURL + "list");
    }

}
