import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapDirectionsSimpleComponent } from './gmap-directions-simple.component';

describe('GmapDirectionsSimpleComponent', () => {
  let component: GmapDirectionsSimpleComponent;
  let fixture: ComponentFixture<GmapDirectionsSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapDirectionsSimpleComponent ]
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
