import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { TourComponent } from './components/tour/tour.component';
import { MapComponent } from './components/map/map.component';
import { CityComponent } from './components/city/city.component';
import { BmapComponent } from './components/bmap/bmap.component';
import { HeaderComponent } from './components/shared/header/header.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdMenuModule, MdToolbarModule,MdSidenavModule, MdTabsModule} from '@angular/material';
import { RouteGenerationProgressComponent } from './components/route-generation-progress/route-generation-progress.component';



export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'tour',
    component: TourComponent,
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: '**', redirectTo: ''
  }
];
@NgModule({
  declarations: [
    AppComponent,
    TourComponent,
    MapComponent,
    CityComponent,
    BmapComponent,
    HeaderComponent,
    RouteGenerationProgressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NoopAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdMenuModule,
    MdToolbarModule,
    MdSidenavModule,
    MdTabsModule,
    RouterModule.forRoot(ROUTES),

    AgmCoreModule.forRoot({
      apiKey: 'YOUR_KEY'
    })
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
