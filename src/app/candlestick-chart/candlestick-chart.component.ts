import { Component, OnInit } from '@angular/core';
import { PriceQuote } from '../price-quote/price-quote';
import { PriceQuoteService } from '../price-quote/price-quote.service';

@Component({
  selector: 'app-candlestick-chart',
  templateUrl: './candlestick-chart.component.html',
  styleUrls: ['./candlestick-chart.component.css']
})
export class CandlestickChartComponent implements OnInit {

  priceQuote : PriceQuote;

  constructor(private priceQuoteService: PriceQuoteService) { }

  ngOnInit() { 
     this.priceQuoteService.getQuotes().subscribe((data: PriceQuote)=>this.priceQuote = data);
  }

  

}
