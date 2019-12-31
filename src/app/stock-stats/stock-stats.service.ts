import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockStats } from './stock-stats';

@Injectable({
  providedIn: 'root'
})
export class StockStatsService {

  endpoint = 'http://localhost:8080/data/stats/';

  constructor(private http: HttpClient) { }


  getStats(ticker: string) {
    return this.http.get<StockStats>(this.endpoint + ticker);
  }
}
