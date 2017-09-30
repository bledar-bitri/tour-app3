import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-gmap-normal',
  templateUrl: './gmap-normal.component.html',
  styleUrls: ['./gmap-normal.component.css']
})
export class GmapNormalComponent implements OnInit {

  constructor() { }

  ngOnInit(){
    let timer = Observable.timer(2000, 1000);
    timer.subscribe(t=> {
        this.lat = this.lat + 0.0001;
    });
  }

  title: string = 'Plain Google Map Integration';
  lat: number = 51.678419;
  lng: number = 7.809007;
}
