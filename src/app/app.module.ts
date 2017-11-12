import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { RouterModule, Routes } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdMenuModule, MdToolbarModule, MdSidenavModule, MdTabsModule,
  MdProgressBarModule, MdCommonModule } from '@angular/material';
import { RouteGenerationProgressComponent } from './components/route-generation-progress/route-generation-progress.component';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { TourComponent } from './components/tour/tour.component';
import { MapComponent } from './components/map/map.component';
import { CityComponent } from './components/city/city.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { GmapNormalComponent } from './components/gmap-normal/gmap-normal.component';
import { DirectionsMapDirective } from './directives/directions-map.directive';
import { GmapDirectionsComponent } from './components/gmap-directions/gmap-directions.component';
import { GmapDirectionsSimpleComponent } from './components/gmap-directions-simple/gmap-directions-simple.component';
import { MapDirectionsDirective } from './directives/map-directions.directive';
import { GmapMovingMarkerComponent } from './components/gmap-moving-marker/gmap-moving-marker.component';
import { MovingMarkerDirective } from './directives/moving-marker.directive';
import { SignalRService } from './services/signal-r.service';
import { AppHttpInterceptor } from './interceptors/app-http-interceptor'
import {environment} from '../environments/environment';
import { ClockComponent } from './components/clock/clock.component';


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
    HeaderComponent,
    RouteGenerationProgressComponent,
    GmapNormalComponent,
    GmapDirectionsComponent,
    GmapDirectionsSimpleComponent,
    GmapMovingMarkerComponent,
    DirectionsMapDirective,
    MovingMarkerDirective,
    MapDirectionsDirective,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
      apiKey: environment.googleApiKey,
      libraries: environment.googleLibraries
    })
  ],
  providers: [
      SignalRService,
      {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true}
    ],
  exports: [],
  bootstrap: [AppComponent],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
