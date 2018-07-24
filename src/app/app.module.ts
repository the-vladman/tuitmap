import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { TotalPercentComponent } from './components/total-percent/total-percent.component';
import { TotalCountriesComponent } from './components/total-countries/total-countries.component';


@NgModule({
  declarations: [
    AppComponent,
    TotalPercentComponent,
    TotalCountriesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
