import { TestBed, inject } from '@angular/core/testing';

import { RouteGenerationProgressService } from './route-generation-progress.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('RouteGenerationProgressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteGenerationProgressService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([RouteGenerationProgressService], (service: RouteGenerationProgressService) => {
    expect(service).toBeTruthy();
  }));
});
