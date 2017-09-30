import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import {RouterModule, Routes} from '@angular/router';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdMenuModule, MdToolbarModule, MdSidenavModule, MdTabsModule,
  MdProgressBarModule, MdCommonModule} from '@angular/material';
import { RouteGenerationProgressComponent } from './components/route-generation-progress/route-generation-progress.component';
import {FlexLayoutModule} from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { TourComponent } from './components/tour/tour.component';
import { MapComponent } from './components/map/map.component';
import { CityComponent } from './components/city/city.component';
import { BmapComponent } from './components/bmap/bmap.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { GmapNormalComponent } from './components/gmap-normal/gmap-normal.component';
import { DirectionsMapDirective } from './directives/directions-map.directive';
import { GmapDirectionsComponent } from './components/gmap-directions/gmap-directions.component';
import { GmapDirectionsSimpleComponent } from './components/gmap-directions-simple/gmap-directions-simple.component';
import { MapDirectionsDirective } from './directives/map-directions.directive';
import { GmapMovingMarkerComponent } from './components/gmap-moving-marker/gmap-moving-marker.component';
import { MovingMarkerDirective } from './directives/moving-marker.directive';
import {SignalRService} from './services/signal-r.service';


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
    RouteGenerationProgressComponent,
    GmapNormalComponent,
    GmapDirectionsComponent,
    GmapDirectionsSimpleComponent,
    GmapMovingMarkerComponent,
    DirectionsMapDirective,
    MovingMarkerDirective,
    MapDirectionsDirective
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
    MdProgressBarModule,
    MdCommonModule,
    FlexLayoutModule,
    RouterModule.forRoot(ROUTES),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCxOkfRrjm6gfSua1qkTBwNCx8bQZVY_q8',
      libraries: ['places']
    })
  ],
  providers: [SignalRService],
  exports: [],
  bootstrap: [AppComponent],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
