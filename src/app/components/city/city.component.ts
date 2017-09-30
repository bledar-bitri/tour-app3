import {Component, Input, OnInit} from '@angular/core';
import {City} from '../../classes/city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  @Input()
  public city: City;
  constructor() { }

  ngOnInit() {
  }

}
