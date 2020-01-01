import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PriceQuoteComponent } from './price-quote/price-quote.component';
import { CandlestickChartComponent } from './candlestick-chart/candlestick-chart.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { StockStatsComponent } from './stock-stats/stock-stats.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchWidgetComponent } from './search-widget/search-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    PriceQuoteComponent,
    CandlestickChartComponent,
    StockStatsComponent,
    NavigationComponent,
    NavbarComponent,
    SearchWidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
