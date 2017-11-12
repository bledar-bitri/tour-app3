import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import {City} from '../../classes/city';

import { MapsAPILoader} from '@agm/core';
import { MapDirectionsDirective } from '../../directives/map-directions.directive';
import {GeoCodeConverter} from '../../classes/geo-code-converter';

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

      this.vc.updateDirections(this.origin, this.destination);

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

    let lat = this.tour[0].latitude;
    let lng = this.tour[0].longitude;

    console.log('Lat: ' + lat);
    console.log('Lng: ' + lng);
    lat = GeoCodeConverter.ToGeoCoordinate(lat);
    lng = GeoCodeConverter.ToGeoCoordinate(lng);
    console.log('Lat Geo: ' + lat);
    console.log('Lng Geo: ' + lng);


    this.origin = new google.maps.LatLng(lat, lng);

    lat = this.tour[this.tour.length - 1].latitude;
    lng = this.tour[this.tour.length - 1].longitude;
    lat = GeoCodeConverter.ToGeoCoordinate(lat);
    lng = GeoCodeConverter.ToGeoCoordinate(lng);

    this.destination = new google.maps.LatLng(lat, lng);

    this.waypoints = [];

    this.tour.forEach((item, index) => {
      if (index > 0 && index <  this.tour.length - 1) {
        if (index < 23) {
          // this.waypoints.push({location: this.tour[index].name, stopover: true});

          let lat = this.tour[index].latitude;
          let lng = this.tour[index].longitude;
          console.log('Lat: ' + lat);
          console.log('Lng: ' + lng);
          lat = GeoCodeConverter.ToGeoCoordinate(lat);
          lng = GeoCodeConverter.ToGeoCoordinate(lng);
          console.log('Lat Geo: ' + lat);
          console.log('Lng Geo: ' + lng);

          this.waypoints.push(
            {
              location: new google.maps.LatLng(lat, lng),
              stopover: true
            });
        }
      }
    });

    this.vc.updateDirections(this.origin, this.destination);

  }
}
