import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourComponent } from './tour.component';
import {MapDirectionsDirective} from '../../directives/map-directions.directive';
import {environment} from '../../../environments/environment';
import {AgmCoreModule} from '@agm/core';
import {CityComponent} from '../city/city.component';
import {MdCardModule} from '@angular/material';

describe('TourComponent', () => {
  let component: TourComponent;
  let fixture: ComponentFixture<TourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourComponent, MapDirectionsDirective, CityComponent ],
      imports: [
        MdCardModule,
        AgmCoreModule.forRoot({
          apiKey: environment.googleApiKey,
          libraries: environment.googleLibraries
        })]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
