import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PriceQuote } from './price-quote';

@Injectable({
  providedIn: 'root'
})
export class PriceQuoteService {

  endpoint = 'http://localhost:8080/data/';

  constructor(private http: HttpClient) { }

  getQuotes(ticker: string) {
    return this.http.get<PriceQuote>(this.endpoint + ticker);
  }

  getQuotesByDay(ticker: string, days: string) {
    const params = new HttpParams().set('days', days);
    return this.http.get<PriceQuote>(this.endpoint + ticker, { params });
  }

}
