import { Component  } from '@angular/core';


declare var google:any;

@Component({
  selector: 'app-gmap-moving-marker',
  templateUrl: './gmap-moving-marker.component.html',
  styleUrls: ['./gmap-moving-marker.component.css']
})
export class GmapMovingMarkerComponent {

  public latitude: number;
  public longitude: number;

  constructor() { }


  private setCurrentPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        });
      }
    }
}
