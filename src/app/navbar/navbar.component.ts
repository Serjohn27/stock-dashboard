import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dataService: DataService,private _router: Router) { }

  ngOnInit() {
  }

  toggleMenu(){
    this._router.navigate(['/search']);
     // this.dataService.toggleNavigationMenu();
  }

}
