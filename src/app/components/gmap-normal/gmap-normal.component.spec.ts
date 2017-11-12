import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapNormalComponent } from './gmap-normal.component';
import { AgmCoreModule } from '@agm/core';
import {environment} from '../../../environments/environment';

describe('GmapNormalComponent', () => {
  let component: GmapNormalComponent;
  let fixture: ComponentFixture<GmapNormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapNormalComponent ],
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.googleApiKey,
          libraries: environment.googleLibraries
      })]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmapNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
