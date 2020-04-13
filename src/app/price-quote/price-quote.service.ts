import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { PriceQuote } from './price-quote';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceQuoteService {

  endpoint = 'http://localhost:8888/data/';

  constructor(private http: HttpClient) { }

  getQuotes(ticker: string, period: string, frequency: string) {
    const params = new HttpParams().set('period', period).set('frequency', frequency);
    return this.http.get<PriceQuote>(this.endpoint + ticker, { params }).pipe(catchError(this.handleError));
  }

  getQuotesByDay(ticker: string, days: string) {
    const params = new HttpParams().set('days', days);
    return this.http.get<PriceQuote>(this.endpoint + ticker, { params }).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };



}
