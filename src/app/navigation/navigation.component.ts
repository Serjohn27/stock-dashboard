import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

   navigationActive: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentState.subscribe(message => this.navigationActive = message);
  }

}
