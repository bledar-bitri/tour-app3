import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapNormalComponent } from './gmap-normal.component';

describe('GmapNormalComponent', () => {
  let component: GmapNormalComponent;
  let fixture: ComponentFixture<GmapNormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapNormalComponent ]
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
