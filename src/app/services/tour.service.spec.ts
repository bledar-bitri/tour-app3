import { TestBed, inject } from '@angular/core/testing';

import { TourService } from './tour.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('TourService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TourService, HttpClient, HttpHandler]
    });
  });

  it('should ...', inject([TourService], (service: TourService) => {
    expect(service).toBeTruthy();
  }));
});
