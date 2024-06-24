import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiCoinkService {

  private apiKey = '030106';
  private URLbase = 'https://api.bancoink.biz/qa/signup';

  httpClient = inject(HttpClient);

  getDocumentTypes(): Observable<any> {
    return this.httpClient.get(`${this.URLbase}/documentTypes?apiKey=${this.apiKey}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getGenders(): Observable<any> {
    return this.httpClient.get(`${this.URLbase}/genders?apiKey=${this.apiKey}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Un error del lado del cliente o de red ocurrió.
      console.error('Un error ocurrió:', error.error.message);
    } else {
      // El backend retornó un código de respuesta sin éxito.
      // El cuerpo de la respuesta puede contener pistas sobre qué salió mal.
      console.error(
        `Backend retornó código ${error.status}, ` +
        `cuerpo era: ${error.error}`);
    }
    // Retorna un observable con un mensaje de error orientado al usuario
    return throwError(() => new Error('Algo malo sucedió; por favor, inténtalo de nuevo más tarde.'));
  }
}