import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockStats } from './stock-stats';
import { Technicals } from '../price-quote/technicals';

@Injectable({
  providedIn: 'root'
})
export class StockStatsService {

  endpoint = 'http://localhost:8888/data/technicals/';

  constructor(private http: HttpClient) { }


  getTechnicals(ticker: string) {
    return this.http.get<Technicals>(this.endpoint + ticker);
  }
}
