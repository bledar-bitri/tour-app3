import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import {City} from '../../classes/city';

import { MapsAPILoader} from '@agm/core';
import { MapDirectionsDirective } from '../../directives/map-directions.directive';

declare var google: any;

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})

export class TourComponent implements OnInit {

  @ViewChild(MapDirectionsDirective) vc: MapDirectionsDirective;

  tourValue: City[];


  get tour(): City[] {
    return this.tourValue;
  }

  @Input('tour')
  set tour(value: City[]) {
    this.tourValue = value;
    this.tourChange();
  }

  waypoints = [];
  origin: any ; // its a example aleatory position
  destination: any; // its a example aleatory position

  constructor(private mapsAPILoader: MapsAPILoader) {}

  ngOnInit () {

    this.mapsAPILoader.load().then(() => {
      if (this.tour == null) {
        return;
      }
      this.origin = this.tour[0].name;
      this.destination = this.tour[this.tour.length - 1].name;

      this.vc.updateDirections();

      this.waypoints = [];
      // this.waypoints.push ({ location: 'rudolfskai 4, salzburg, austria', stopover: true});
      // this.waypoints.push ({ location: 'zaunergasse 2, salzburg, austria', stopover: true});
    })
      .catch(error => console.log('TourComponent: getNativeMap() Error: ', error));
  }

  tourChange() {
    if (!this.tour) {
      return;
    }

    console.log('Tour changed: ' + this.tour);

    this.origin = this.tour[0].name;
    this.destination = this.tour[this.tour.length - 1].name;
    this.vc.updateDirections();

  }
}
