import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { PriceQuote } from '../price-quote/price-quote';
import { catchError } from 'rxjs/operators';
import { Technicals } from '../price-quote/technicals';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  endpoint = 'http://localhost:8888/stocks/search';

  constructor(private http: HttpClient) { }


  findStocksByRsi(gt: string, lt: string) {
    const params = new HttpParams().set('gt', gt).set('lt', lt);
    return this.http.get<Technicals[]>(this.endpoint + '/rsi', { params }).pipe(catchError(this.handleError));
  }


  search(lessThanRsi: string, greaterThanRsi: string, isAboveSma: boolean, isEmaAboveSma: boolean) {
    let params = new HttpParams();
    if (greaterThanRsi !== "" && lessThanRsi !== "") {
      params = params.set('rsi', 'gt:' + greaterThanRsi + '*' + 'lt:' + lessThanRsi);
    }
    else if (greaterThanRsi !== "") {
      params = params.set('rsi', 'gt:' + greaterThanRsi);
    }
    else if (lessThanRsi !== "") {
      params = params.set('rsi', 'lt:' + lessThanRsi);
    }


    return this.http.get<Technicals[]>(this.endpoint, { params }).pipe(catchError(this.handleError));

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
