import { Component, OnInit } from '@angular/core';
import { PriceQuote } from '../price-quote/price-quote';
import { PriceQuoteService } from '../price-quote/price-quote.service';

import * as d3 from 'd3';

@Component({
  selector: 'app-candlestick-chart',
  templateUrl: './candlestick-chart.component.html',
  styleUrls: ['./candlestick-chart.component.css']
})
export class CandlestickChartComponent implements OnInit {

  priceQuote : PriceQuote;

  constructor(private priceQuoteService: PriceQuoteService) { }

  ngOnInit() { 
     this.priceQuoteService.getQuotes().subscribe((data: PriceQuote)=>{this.priceQuote = data; console.log(data);});
     this.drawChart();
  }


  drawChart() {
          d3.select('#candlestick-chart-container')
          .append('svg')
          .attr('width',500)
          .attr('height',500)
          .style('background-color','black');
  }

  

}
