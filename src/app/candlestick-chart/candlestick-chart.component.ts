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

      let candles = priceQuote.candles; 
      //Map dates from candles
      const dates = candles.map( candle => new Date(candle.datetime));
      const xmin = d3.min(dates);
      const xmax = d3.max(dates);
      //Date Scale    
      const xScale = d3.scaleTime().domain([xmin,xmax]).range([0, width])
      const xAxis = d3.axisBottom().scale(xScale);

      const gX = svg.append("g")
					.attr("class", "axis x-axis") //Assign "axis" class
					.attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      
      const prices = candles.map(candle => candle.close);
      const ymin = d3.min(prices);
      const ymax = d3.max(prices);
      const yScale = d3.scaleLinear().domain([ymin,ymax]).range(0,height);
      const yAxis = d3.axisLeft().scale(yScale);

      const gy = svg.append("g")
					.attr("class", "axis y-axis") //Assign "axis" class
          .call(yAxis);


      //   const xScale = d3.scaleTime().domain([xmin,xmax]).range(0,width);
      //  console.log(xScale(xmin));




         // const xScale = d3.scaleLinear().domain([xmin,xmax]).range(0,width);

       //   const xDateScale = d3.scaleQuantize().domain([0, dates.length]).range(dates);
      //    let xBand = d3.scaleBand().domain(d3.range(xmin,xmax)).range([0, width]).padding(0.3);



           console.log('date' + dates[0])
       //    console.log(xBand(dates[0]))
     //     const xAxis = d3.axisBottom().scale(xBand);
       
        
  
          // const gX = svg.append("g")
					// .attr("class", "axis x-axis") //Assign "axis" class
					// .attr("transform", "translate(0," + height + ")")
          // .call(xAxis);

   
          
    
  }

  
   drawCanvas(){
     
   }

}
