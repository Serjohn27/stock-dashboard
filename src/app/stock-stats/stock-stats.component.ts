import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StockStats } from './stock-stats';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock-stats',
  templateUrl: './stock-stats.component.html',
  styleUrls: ['./stock-stats.component.css']
})
export class StockStatsComponent implements OnInit, OnChanges {

  @Input()
  stockStats: StockStats;

  constructor() { }

  ngOnInit() {
  
  }

  ngOnChanges(){
    if (!this.stockStats) { return; }
  }

}
