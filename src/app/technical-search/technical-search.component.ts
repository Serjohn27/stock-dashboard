import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SearchService } from './search-service';
import { Technicals } from '../price-quote/technicals';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-technical-search',
  templateUrl: './technical-search.component.html',
  styleUrls: ['./technical-search.component.css']
})
export class TechnicalSearchComponent implements OnInit {

  searchForm: FormGroup;
  technicals: Observable<Technicals[]>;

  constructor(private formBuilder: FormBuilder, private searchService: SearchService) { }


  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      rsiLow: [''],
      rsiHigh: ['']
    });

  }

  onSubmit() {
    const lowRsi = this.searchForm.controls.rsiLow.value;
    const highRsi = this.searchForm.controls.rsiHigh.value;

    this.technicals = this.searchService.search(highRsi, lowRsi, null, null);

  }

}
