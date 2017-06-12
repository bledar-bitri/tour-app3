import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteGenerationProgressComponent } from './route-generation-progress.component';

describe('RouteGenerationProgressComponent', () => {
  let component: RouteGenerationProgressComponent;
  let fixture: ComponentFixture<RouteGenerationProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteGenerationProgressComponent ]
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
