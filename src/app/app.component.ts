import { Component, OnInit } from '@angular/core';
import { PriceQuoteService } from './price-quote/price-quote.service';
import { PriceQuote } from './price-quote/price-quote';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
   priceQuote: PriceQuote;

   constructor(private priceQuoteService: PriceQuoteService){}

  ngOnInit(): void {
  
  }
  title = 'stock-dashboard';
  
}
