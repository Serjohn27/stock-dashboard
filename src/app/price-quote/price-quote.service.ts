import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PriceQuote } from './price-quote';

@Injectable({
  providedIn: 'root'
})
export class PriceQuoteService {
 
  endpoint= './assets/data/OBLN.json';

  constructor(private http: HttpClient) { }

   getQuotes(){
     console.log('Getting price quote from '+this.endpoint );
     return this.http.get<PriceQuote>(this.endpoint);
   }
}
