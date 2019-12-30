import { Component, OnInit } from '@angular/core';
import { PriceQuoteService } from './price-quote.service';
import { PriceQuote } from './price-quote';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-price-quote',
  templateUrl: './price-quote.component.html',
  styleUrls: ['./price-quote.component.css']
})
export class PriceQuoteComponent implements OnInit {

  data: Observable<PriceQuote>;

  constructor(private priceQuoteService: PriceQuoteService) { }

  ngOnInit(): void {
    this.data = this.priceQuoteService.getQuotes();
  }

}
