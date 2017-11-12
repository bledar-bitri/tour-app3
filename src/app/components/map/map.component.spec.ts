import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import {AgmCoreModule} from '@agm/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MockGoogleMapsAPIWrapper} from '../../mocks/mock-google-maps-api-wrapper';
import {environment} from '../../../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
