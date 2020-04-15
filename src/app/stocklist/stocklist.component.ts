import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Technicals } from '../price-quote/technicals';



@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css']
})
export class StocklistComponent implements OnInit,OnChanges {

  @Input()
  technicals: Technicals;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    if (!this.technicals) { return; }
  }

}
