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

    const margin = { top: 30, right: 70, bottom: 30, left: 70 };

    const width = 720;
    const height = 400;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    let candles = this.data.candles;

    const svg = d3.select("#candlestick-chart-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style('background-color', '#9cb5aa')
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

    svg
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);



    // X Axis with Dates

    // Map dates from candles
    const dates = candles.map(candle => new Date(candle.datetime));
    const xmin = d3.min(dates);
    const xmax = d3.max(dates);
    // Date Scale    
    const xScale = d3.scaleTime()
      .domain([xmin, xmax])
      .range([0, innerWidth]);


    const xAxis = d3.axisBottom().scale(xScale);

    const gX = svg.append("g")
      .attr("class", "axis x-axis")
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);


    svg.selectAll('rect').data(candles)
      .enter().append('rect')
      .attr('y', d => yScale(d.close))
      .attr('width', d => xScale(d.datetime))
      .attr('height', yScale.bandwidth);


  }


  drawCanvas() {

  }

}
