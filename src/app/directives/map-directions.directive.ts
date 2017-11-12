import { Directive,  Input, Output } from '@angular/core';
import {GoogleMapsAPIWrapper}  from '@agm/core';
import { LatLngPoint } from 'app/classes/lat-lng-point';
import { MercatorProjection } from 'app/classes/mercator-projection';


declare var google: any;

@Directive({
  selector: 'appMapDirections'
})
export class MapDirectionsDirective {

  @Input() origin;
  @Input() destination;
  @Input() waypoints;

  directionsService: any;
  directionsDisplay: any;
  markerArray = [];

  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit() {
    console.log('loading google maps ' + this.origin);

    const me = this;
    me.gmapsApi.getNativeMap();
/*
    this.gmapsApi.getNativeMap().then(map => {

              if (!this.origin || !this.destination ) {
                return;
              }
              if (me.directionsService == null) {
                me.directionsService = new google.maps.DirectionsService;
              }

              if (me.directionsDisplay == null) {
                me.directionsDisplay = new google.maps.DirectionsRenderer({
                  suppressMarkers: true
                });
                me.directionsDisplay.setMap(map);
              }
              me.directionsService.route({
                      origin: {lat: this.origin.latitude, lng: this.origin.longitude},
                      destination: {lat: this.destination.latitude, lng: this.destination.longitude},
                      waypoints: this.waypoints,
                      optimizeWaypoints: false,
                      travelMode: 'DRIVING'
                    }, function(response, status) {
                                if (status === 'OK') {
                                  me.directionsDisplay.setDirections(response);
                                } else {
                                  window.alert('Directions request failed due to ' + status);
                                }
              });

    });*/
  }

  public updateDirections(origin: string, destination: string) {

    if (origin == null || destination == null) {
      console.log('map-directions.directive.ts: either origin or destination is null');
    }

    console.log('updating directions from: ' + this.origin + ' to ' + this.destination);
    const me = this;
    me.origin = origin;
    me.destination = destination;


    this.gmapsApi.getNativeMap().then(map => {

        google.maps.event.trigger(map, 'resize'); // issue resize command to display the map if the div was hidden

        if (!this.origin || !this.destination ) {
          return;
        }
        if (me.directionsService == null) {
          me.directionsService = new google.maps.DirectionsService;
        }
        if (me.directionsDisplay == null) {
          me.directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
          });
          me.directionsDisplay.setMap(map);
        }

        me.directionsService.route({
                origin: this.origin,
                destination: me.destination,
                waypoints: me.waypoints,
                optimizeWaypoints: false,
                travelMode: 'DRIVING'
              }, function(response, status) {
                          if (status === 'OK') {
                            // me.directionsDisplay.setOptions({ preserveViewport: true });
                            me.directionsDisplay.setDirections(response);
                            me.showSteps(map, response );
                          } else {
                            window.alert('Directions request failed due to ' + status);
                          }
        });
    });
  }


  showSteps(map: any, directionResult: any) {

    // First, remove any existing markers from the map.
    for (let i = 0; i < this.markerArray.length; i++) {
      this.markerArray[i].setMap(null);
    }

    // Now, clear the array itself.
    this.markerArray = [];

    // For each step, place a marker, and add the text to the marker's
    // info window. Also attach the marker to an array so we
    // can keep track of it and remove it when calculating new
    // routes.
    for (let i = 0; i < directionResult.routes[0].legs.length; i++) {

        const myRoute = directionResult.routes[0].legs[i];

        let icon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=' + i + '|FF0000|000000';
        if (i === 0) {
          icon = 'https://chart.googleapis.com/chart?chst=d_map_xpin_icon&chld=pin_star|car-dealer|00FFFF|FF0000';
        }

        const marker = new google.maps.Marker({
          position: myRoute.steps[0].start_point,
          map: map,
          icon: icon
        });
        this.markerArray.push(marker);
      }
      const myRoute = directionResult.routes[0].legs[directionResult.routes[0].legs.length - 1];
      const marker = new google.maps.Marker({
        position: myRoute.steps[myRoute.steps.length - 1].end_point,
        map: map,
        icon: 'https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=flag|ADDE63'
      });
      this.markerArray.push(marker);
  }
}
