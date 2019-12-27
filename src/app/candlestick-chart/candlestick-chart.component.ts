import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PriceQuote } from '../price-quote/price-quote';

import * as d3 from 'd3';
import * as fc from 'd3fc';



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

    const FIVE_HOURS = 1000*60*60*5;
    const ONE_DAY = 1000*60*60*24;

    d3.select('svg').remove();

    const margin = { top: 40, right: 60, bottom: 60, left: 80 };

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
    
    candles.forEach(candle=>{console.log(candle)
     console.log(new Date(candle.datetime));
    });


    // X Axis with Dates
    const xMin = d3.min(candles.map(candle=>(candle.datetime-FIVE_HOURS)));
    const xMax = d3.max(candles.map(candle=>candle.datetime-FIVE_HOURS));
    // Date Scale    
    // new version takes domain and range arrays as argument
    // adapt the d3 time scale in a discontinuous scale that skips weekends
   const xScale = fc.scaleDiscontinuous(d3.scaleTime([new Date(xMin-ONE_DAY),new Date(xMax+ONE_DAY)], [0, contentWidth]))
     .discontinuityProvider(fc.discontinuitySkipWeekends());
  //  const xScale = d3.scaleTime([xMin-ONE_DAY, xMax+ONE_DAY], [0, contentWidth]);
    let xBand = d3.scaleBand().domain(d3.range(-1, candles.length)).range([0, contentWidth]).padding(0.1)
    //let xBand = d3.scaleBand().domain(d3.range(0, candles.length)).range([margin.left, width - margin.right]).padding(0.3);

    
    const xAxis = d3.axisBottom()
      .scale(xScale)
      .tickFormat(d3.timeFormat("%m/%d"))
      .ticks(14);

    const gX = svg.append("g")
      .attr("class", "axis x-axis")
      .attr('transform', `translate(0, ${contentHeight})`)
      .call(xAxis);


    // Find min and max for closing prices to use in y axis       
    const ymin = d3.min(candles.map(candle=>candle.low));
    const ymax = d3.max(candles.map(candle=>candle.high));
    const yScale = d3.scaleLinear([ymin,ymax], [contentHeight, 0]).nice();
    const yAxis = d3.axisRight(yScale);

    svg.append("g")
      .attr("class", "axis y-axis")
      .attr("transform", `translate(${contentWidth}, 0)`)
      .call(yAxis);

    this.data.candles.forEach(candle => {
      console.log(new Date(candle.datetime));
      console.log('Position x ' + xScale(new Date(candle.datetime)));
    });


    svg.selectAll('.bar')
      .data(this.data.candles)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(new Date(d.datetime+(FIVE_HOURS))) - xBand.bandwidth()/2)
      .attr('y', d => yScale(Math.max(d.open, d.close)))
      .attr('width', xBand.bandwidth() / 2)
      .attr('height', d => (d.open === d.close) ? 1 : yScale(Math.min(d.open, d.close)) - yScale(Math.max(d.open, d.close)))
      .attr("fill", d => (d.open === d.close) ? "silver" : (d.open > d.close) ? "red" : "green");

      // draw high and low
      let stems = svg.selectAll("g.line")
      .data(this.data.candles)
      .enter()
      .append("line")
      .attr("class", "stem")
      .attr("x1", d => xScale(new Date(d.datetime+(FIVE_HOURS))) - xBand.bandwidth()/4)
      .attr("x2", d => xScale(new Date(d.datetime+(FIVE_HOURS))) - xBand.bandwidth()/4)
      .attr("y1", d => yScale(d.high))
      .attr("y2", d => yScale(d.low))
      .attr("stroke", d => (d.open === d.close) ? "gray" : (d.open > d.close) ? "red" : "green");


  }




  drawCanvas() {

  }

}
