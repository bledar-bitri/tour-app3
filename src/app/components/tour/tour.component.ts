import {Component, Input} from '@angular/core';
import {City} from '../../classes/city';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})

export class TourComponent  {

  @Input() tour: City[];


}
