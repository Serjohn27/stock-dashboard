import { Component, OnInit } from '@angular/core';
import { PriceQuoteService } from './price-quote.service';
import { PriceQuote } from './price-quote';
import { Observable } from 'rxjs';
import { StockStats } from '../stock-stats/stock-stats';
import { StockStatsService } from '../stock-stats/stock-stats.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-price-quote',
  templateUrl: './price-quote.component.html',
  styleUrls: ['./price-quote.component.css']
})
export class PriceQuoteComponent implements OnInit {

  quotes: Observable<PriceQuote>;
  stats: Observable<StockStats>;
  ticker: string;

  constructor(private priceQuoteService: PriceQuoteService, private stockStatsService: StockStatsService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => {
      this.ticker = message;
      if (message != null) {
        this.searchTicker(message)
      }
    });
  }

  searchTicker(ticker: string) {
    this.ticker = ticker;
    this.quotes = this.priceQuoteService.getQuotes(ticker);
    this.stats = this.stockStatsService.getStats(ticker);
  }

  searchTickerByDays(ticker: string, days: string) {
    this.quotes = this.priceQuoteService.getQuotesByDay(ticker, days);
  }

}
