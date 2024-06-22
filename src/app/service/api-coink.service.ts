import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCoinkService {

  private apiKey = '030106';
  private URLbase = 'https://api.bancoink.biz/qa/signup';

  httpClient = inject(HttpClient);

  getDocumentTypes(): Observable<any>{
    return this.httpClient.get(`${this.URLbase}/documentTypes?apiKey=${this.apiKey}`);
  }

  getGenders(): Observable<any>{
    return this.httpClient.get(`${this.URLbase}/genders?apiKey=${this.apiKey}`);
  }
 
}
