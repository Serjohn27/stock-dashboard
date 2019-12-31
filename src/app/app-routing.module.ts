import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceQuoteComponent } from './price-quote/price-quote.component';


const routes: Routes = [
    { path: 'quotes' , component: PriceQuoteComponent},
    { path: '',   redirectTo: '/quotes', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
