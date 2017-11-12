import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapMovingMarkerComponent } from './gmap-moving-marker.component';
import { AgmCoreModule } from '@agm/core';
import {MockGoogleMapsAPIWrapper} from '../../mocks/mock-google-maps-api-wrapper';
import {MovingMarkerDirective} from '../../directives/moving-marker.directive';
import {environment} from '../../../environments/environment';

describe('GmapMovingMarkerComponent', () => {
  let component: GmapMovingMarkerComponent;
  let fixture: ComponentFixture<GmapMovingMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapMovingMarkerComponent, MovingMarkerDirective ],
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.googleApiKey,
          libraries: environment.googleLibraries
        })
      ],
      providers: [MockGoogleMapsAPIWrapper],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmapMovingMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
