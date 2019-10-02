import { Component, OnInit } from '@angular/core';
import { PriceQuoteService } from './price-quote.service';
import { PriceQuote } from './price-quote';

@Component({
  selector: 'app-price-quote',
  templateUrl: './price-quote.component.html',
  styleUrls: ['./price-quote.component.css']
})
export class PriceQuoteComponent implements OnInit {

  priceQuote : PriceQuote;

  constructor(private priceQuoteService: PriceQuoteService) { }

  ngOnInit() { 
     this.priceQuoteService.getQuotes().subscribe((data: PriceQuote)=>this.priceQuote = data);
  }

}
