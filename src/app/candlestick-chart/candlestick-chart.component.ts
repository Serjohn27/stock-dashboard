import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PriceQuote } from '../price-quote/price-quote';

import * as d3 from 'd3';



@Component({
  selector: 'app-candlestick-chart',
  templateUrl: './candlestick-chart.component.html',
  styleUrls: ['./candlestick-chart.component.css']
})
export class CandlestickChartComponent implements OnInit, OnChanges {

  @Input()
  data: PriceQuote;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    if (!this.data) { return; }
    this.drawChart();
  }


  drawChart() {

    d3.select('svg').remove();

    const margin = { top: 15, right: 65, bottom: 205, left: 50 };

    const width = 960;
    const height = 600;

    const contentWidth = width - margin.left - margin.right;
    const contentHeight = height - margin.top - margin.bottom;

    let candles = this.data.candles;

    const svg = d3.select("#candlestick-chart-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    
    // X Axis with Dates
    const xExtent = d3.extent(candles, candle=>new Date(candle.datetime));
    // Date Scale    
    // new version takes domain and range arrays as argument
    const xScale = d3.scaleTime(xExtent,[0, contentWidth]);
    let xBand = d3.scaleBand().domain(d3.range(-1, candles.length)).range([0, contentWidth]).padding(0.5);
    const xAxis = d3.axisBottom()
                    .scale(xScale)
                    .ticks(candles.length)
                    .tickFormat(d3.timeFormat("%m/%d"));
                  
   
   
    const gX = svg.append("g")
      .attr("class", "axis x-axis")
      .attr('transform', `translate(0, ${contentHeight})`)
      .call(xAxis);


      // Find min and max for closing prices to use in y axis       
      const yExtent = d3.extent(candles, candle=>candle.close);
      const yScale = d3.scaleLinear(yExtent,[contentHeight, 0]).nice();
      const yAxis = d3.axisLeft(yScale);
  
      svg.append("g")
      .attr("class", "axis y-axis")
        .call(yAxis);


    // svg.selectAll('.bar')
    //   .data(this.data.candles)
    //   .enter().append('rect')
    //   .attr('class', 'bar')
    //   .attr('x', d => xScale(d.datetime) - xBand.bandwidth())
    //   .attr('y',d => yScale(Math.max(d.open, d.close)) )
    //   .attr('width', xBand.bandwidth())
    //   .attr('height', d => (d.open === d.close) ? 1 : yScale(Math.min(d.open, d.close))-yScale(Math.max(d.open, d.close)))
    //   .attr("fill", d => (d.open === d.close) ? "silver" : (d.open > d.close) ? "red" : "green");

    //   // draw high and low
    //   let stems = svg.selectAll("g.line")
    //   .data(this.data.candles)
    //   .enter()
    //   .append("line")
    //   .attr("class", "stem")
    //   .attr("x1", d => xScale(d.datetime) - xBand.bandwidth()/2)
    //   .attr("x2", d => xScale(d.datetime) - xBand.bandwidth()/2)
    //   .attr("y1", d => yScale(d.high))
    //   .attr("y2", d => yScale(d.low))
    //   .attr("stroke", d => (d.open === d.close) ? "white" : (d.open > d.close) ? "red" : "green");


  }




  drawCanvas() {

  }

}
