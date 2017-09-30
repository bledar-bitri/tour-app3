import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapMovingMarkerComponent } from './gmap-moving-marker.component';

describe('GmapMovingMarkerComponent', () => {
  let component: GmapMovingMarkerComponent;
  let fixture: ComponentFixture<GmapMovingMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapMovingMarkerComponent ]
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
