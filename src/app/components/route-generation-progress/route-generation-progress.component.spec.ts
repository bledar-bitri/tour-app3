import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MdProgressBarModule} from '@angular/material';
import { RouteGenerationProgressComponent } from './route-generation-progress.component';
import {CityComponent} from '../city/city.component';
import {TourComponent} from '../tour/tour.component';
import {MapDirectionsDirective} from '../../directives/map-directions.directive';
import {environment} from '../../../environments/environment';
import {AgmCoreModule} from '@agm/core';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('RouteGenerationProgressComponent', () => {
  let component: RouteGenerationProgressComponent;
  let fixture: ComponentFixture<RouteGenerationProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteGenerationProgressComponent, TourComponent, CityComponent, MapDirectionsDirective ],
      imports: [MdProgressBarModule,
        AgmCoreModule.forRoot({
          apiKey: environment.googleApiKey,
          libraries: environment.googleLibraries
        })],
      providers: [HttpClient, HttpHandler],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteGenerationProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
