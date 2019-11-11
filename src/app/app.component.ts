import { Component, OnInit } from '@angular/core';
import { PriceQuoteService } from './price-quote/price-quote.service';
import { PriceQuote } from './price-quote/price-quote';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
   data: Observable<PriceQuote>;

   constructor(private priceQuoteService: PriceQuoteService){}

  ngOnInit(): void {
    this.data = this.priceQuoteService.getQuotes();
  }
  title = 'stock-dashboard';
  
}
