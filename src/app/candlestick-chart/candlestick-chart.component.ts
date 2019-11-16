import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PriceQuote } from '../price-quote/price-quote';
import { PriceQuoteService } from '../price-quote/price-quote.service';

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

    const margin = { top: 40, right: 70, bottom: 40, left: 70 };

    const width = 960;
    const height = 600;

    const contentWidth = width - margin.left - margin.right;
    const contentHeight = height - margin.top - margin.bottom;

    let candles = this.data.candles;

    const svg = d3.select("#candlestick-chart-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style('background-color', 'white');


    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.right})`);


    //  Y Axis with Price          
    const prices = candles.map(candle => candle.close);
    const ymin = d3.min(prices);
    const ymax = d3.max(prices);

    // Create the scale
    const yScale = d3.scaleLinear()
      .domain([ymin, ymax])
      .range([contentHeight, 0]);

    const yAxis = d3.axisLeft(yScale);

    g.attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);



    // X Axis with Dates

    // Map dates from candles
    const dates = candles.map(candle => new Date(candle.datetime));
    const xmin = d3.min(dates);
    const xmax = d3.max(dates);
    // Date Scale    
    const xScale = d3.scaleTime()
      .domain([xmin, xmax])
      .range([0, contentWidth]);


    const xAxis = d3.axisBottom().scale(xScale);

    const gX = g.append("g")
      .attr("class", "axis x-axis")
      .attr('transform', `translate(0, ${contentHeight})`)
      .call(xAxis);


    console.log(this.data.candles[0].close)

    svg.selectAll('.bar')
      .data(this.data.candles)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.datetime))
      .attr('y',d => yScale(Math.max(d.open, d.close)) )
      .attr('width', 10)
      .attr('height', d => (d.open === d.close) ? 1 : yScale(Math.min(d.open, d.close))-yScale(Math.max(d.open, d.close)))
      .attr("fill", d => (d.open === d.close) ? "silver" : (d.open > d.close) ? "red" : "green")
      ;


  }


  drawCanvas() {

  }

}
