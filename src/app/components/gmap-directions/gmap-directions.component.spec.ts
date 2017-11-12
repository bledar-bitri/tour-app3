import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapDirectionsComponent } from './gmap-directions.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MockGoogleMapsAPIWrapper} from '../../mocks/mock-google-maps-api-wrapper';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MapDirectionsDirective} from '../../directives/map-directions.directive';

import {environment} from '../../../environments/environment';

describe('GmapDirectionsComponent', () => {
  let component: GmapDirectionsComponent;
  let fixture: ComponentFixture<GmapDirectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapDirectionsComponent, MapDirectionsDirective ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
          apiKey: environment.googleApiKey,
          libraries: environment.googleLibraries
        })
      ],
      providers: [MockGoogleMapsAPIWrapper],
      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmapDirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
