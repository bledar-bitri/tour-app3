import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component} from '@angular/core';
import { CityComponent } from './city.component';
import { MdCardModule } from '@angular/material';
import {City} from '../../classes/city';


describe('CityComponent', () => {
  let component: TestCityComponent;
  let fixture: ComponentFixture<TestCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityComponent, TestCityComponent ],
      imports: [MdCardModule],
  })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show id 1', () => {
    expect(fixture.nativeElement.querySelector('md-card-title').innerText).toEqual('1');
  });

  @Component({
    selector: 'app-city-test',
    template: `<app-city [city]="{id: 1, name: test}"></app-city>`
  })
  class TestCityComponent {

  }
});
