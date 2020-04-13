import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StockStats } from './stock-stats';
import { Observable } from 'rxjs';
import { Technicals } from '../price-quote/technicals';

@Component({
  selector: 'app-stock-stats',
  templateUrl: './stock-stats.component.html',
  styleUrls: ['./stock-stats.component.css']
})
export class StockStatsComponent implements OnInit, OnChanges {

  @Input()
  technicals: Technicals;

  constructor() { }

  ngOnInit() {
  
  }

  ngOnChanges(){
    if (!this.technicals) { return; }
  }

}
