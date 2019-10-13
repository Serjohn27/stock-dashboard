import { Component, OnInit } from '@angular/core';
import { PriceQuote } from '../price-quote/price-quote';
import { PriceQuoteService } from '../price-quote/price-quote.service';

import * as d3 from 'd3';
import { createNgModule } from '@angular/compiler/src/core';
import { debug } from 'util';


@Component({
  selector: 'app-candlestick-chart',
  templateUrl: './candlestick-chart.component.html',
  styleUrls: ['./candlestick-chart.component.css']
})
export class CandlestickChartComponent implements OnInit {

  priceQuote : PriceQuote;

  constructor(private priceQuoteService: PriceQuoteService) { }

  ngOnInit() { 
     this.priceQuoteService.getQuotes().subscribe((data: PriceQuote)=>{
       this.priceQuote = data; 
       console.log(data);
       this.drawChart(data);
      });
  }


  drawChart(priceQuote: PriceQuote) {

          const dateFormat = d3.timeFormat('%Y-%m-%d');

          let candles = priceQuote.candles; 

          for(let i =0;i< candles.length ; i++){
           candles[i]['datetime'] = dateFormat(candles[i]['datetime']);
          }

          const margin = {top: 20, right: 10, bottom: 20, left: 10};

          const width = 720 - margin.left - margin.right;
          const height = 400 - margin.top - margin.bottom;

          const svg = d3.select('#candlestick-chart-container')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height',height + margin.top + margin.bottom)
          .style('background-color','#9cb5aa')
          .append('g')
          .attr('transform', "translate(" + margin.left + "," + margin.top + ")");

          const dates = candles.map( candle => candle.datetime);
          const xmin = d3.min(dates);
          const xmax = d3.max(dates);

          const xScale = d3.scaleLinear().domain([-1,dates.length]).range(0,width);
          const xDateScale = d3.scaleQuantize().domain([0, dates.length]).range(dates);
          let xBand = d3.scaleBand().domain(d3.range(-1, dates.length)).range([0, width]).padding(0.3);
          const xAxis = d3.axisBottom().scale(xScale);
          debugger;
        
  
          const gX = svg.append("g")
					.attr("class", "axis x-axis") //Assign "axis" class
					.attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          
          
    
  }

  

}
