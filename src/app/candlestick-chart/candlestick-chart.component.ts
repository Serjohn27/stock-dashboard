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

      const margin = {top: 30, right: 70, bottom: 30, left: 70};

      const width = 720;
      const height = 400;

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      let candles = priceQuote.candles;

      var chart = d3.select("#candlestick-chart-container")
        .append("svg")
          .attr("width", width)
          .attr("height", height)
          .style('background-color','#9cb5aa')
          .append('g')
          .attr('transform', `translate(${margin.left}, ${margin.right})`);


      //  Y Axis with Price          
      const prices = candles.map(candle => candle.close);
      const ymin = d3.min(prices);
      const ymax = d3.max(prices);    

      // Create the scale
      const yScale = d3.scaleLinear()
          .domain([ymin, ymax])       
          .range([innerHeight, 0]);  

      const yAxis = d3.axisLeft(yScale);    

      chart
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

      
      
      // X Axis with Dates

      // Map dates from candles
       const dates = candles.map( candle => new Date(candle.datetime));
       const xmin = d3.min(dates);
       const xmax = d3.max(dates);
      // Date Scale    
      const xScale = d3.scaleTime()
                         .domain([xmin,xmax])
                         .range([0, innerWidth]);


       const xAxis = d3.axisBottom().scale(xScale);

       const gX = chart.append("g")
                 .attr("class", "axis x-axis") 
                 .attr('transform', `translate(0, ${innerHeight})`)
                 .call(xAxis);
          

  }

  
   drawCanvas(){
     
   }

}
