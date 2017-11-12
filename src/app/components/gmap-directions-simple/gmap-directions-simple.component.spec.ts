import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapDirectionsSimpleComponent } from './gmap-directions-simple.component';
import { AgmCoreModule } from '@agm/core';
import {MockGoogleMapsAPIWrapper} from '../../mocks/mock-google-maps-api-wrapper';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { MapDirectionsDirective } from '../../directives/map-directions.directive';
import {environment} from '../../../environments/environment';


describe('GmapDirectionsSimpleComponent', () => {
  let component: GmapDirectionsSimpleComponent;
  let fixture: ComponentFixture<GmapDirectionsSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapDirectionsSimpleComponent, MapDirectionsDirective ],
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.googleApiKey,
          libraries: environment.googleLibraries
        })],
      providers: [MockGoogleMapsAPIWrapper],
      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmapDirectionsSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
