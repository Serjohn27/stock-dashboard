import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.css']
})
export class SearchWidgetComponent implements OnInit {

  searchTerm: string;

  constructor(private dataService: DataService,private _router: Router) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message=>this.searchTerm=message);
  }

  search(ticker: string){
    this.dataService.sendMessage(ticker);
    this._router.navigate(['/quotes']);
  }

}
