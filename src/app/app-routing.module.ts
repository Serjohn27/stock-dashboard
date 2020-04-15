import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceQuoteComponent } from './price-quote/price-quote.component';
import { TechnicalSearchComponent } from './technical-search/technical-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';


const routes: Routes = [
    { path: 'quotes' , component: PriceQuoteComponent},
    { path: 'search', component: TechnicalSearchComponent },
    { path: '',   redirectTo: '/search', pathMatch: 'full' },

];

@NgModule({
  imports: [
     RouterModule.forRoot(routes),
     FormsModule,
     ReactiveFormsModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AppRoutingModule { }
