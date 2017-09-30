import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { MapDirectionsDirective } from '../../directives/map-directions.directive';
import {Observable} from 'rxjs/Rx';

declare var google: any;
declare var jQuery: any;

@Component({
  selector: 'app-gmap-directions-simple',
  templateUrl: './gmap-directions-simple.component.html',
  styleUrls: ['./gmap-directions-simple.component.css'],
  providers: [GoogleMapsAPIWrapper]
})
export class GmapDirectionsSimpleComponent implements OnInit {

    public latitude: number;
    public longitude: number;
    public destinationInput: FormControl;
    public destinationOutput: FormControl;
    public zoom: number;
    public iconurl: string;
    public mapCustomStyles: any;
    public estimatedTime: any;
    public estimatedDistance: any;

    public waypoints = [];

    @ViewChild('pickupInput')
    public pickupInputElementRef: ElementRef;

     @ViewChild('pickupOutput')
    public pickupOutputElementRef: ElementRef;

     @ViewChild('scrollMe')
    private scrollContainer: ElementRef;

    @ViewChild(MapDirectionsDirective) vc: MapDirectionsDirective;

    public origin: any ; // its a example aleatory position
    public destination: any; // its a example aleatory position

    constructor(
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private gmapsApi: GoogleMapsAPIWrapper,
      private _elementRef: ElementRef
    ) {
    }

    ngOnInit() {
      // set google maps defaults
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;


      let alternativeStopover = false;

      this.iconurl = '../image/map-icon.png';

      // set current position
      this.setCurrentPosition();

      // load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
         this.origin = 'slavi soucek str. 11, salzburg, austria';
         this.destination = 'rennbahnstrasse 4b, salzburg, austria';
         this.waypoints.push ({ location: 'rudolfskai 4, salzburg, austria', stopover: true});


         const timer = Observable.timer(2000, 10000);
         timer.subscribe(t => {
              this.vc.updateDirections();

              this.waypoints = [];
              if (alternativeStopover) {
                this.waypoints.push ({ location: 'rudolfskai 4, salzburg, austria', stopover: true});
                this.waypoints.push ({ location: 'zaunergasse 2, salzburg, austria', stopover: true});

              }
              else  {
                this.waypoints.push ({ location: 'rudolfskai 4, salzburg, austria', stopover: true});
              }
              alternativeStopover = !alternativeStopover;

          });
      });
    }

    scrollToBottom(): void {
      jQuery('html, body').animate({ scrollTop: jQuery(document).height() }, 3000);
    }
    private setCurrentPosition() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
        });
      }
    }

    private getMapCusotmStyles() {
      // Write your Google Map Custom Style Code Here.
    }
}
