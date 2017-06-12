import { TestBed, inject } from '@angular/core/testing';

import { RouteGenerationProgressService } from './route-generation-progress.service';

describe('RouteGenerationProgressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteGenerationProgressService]
    });
  });

  it('should be created', inject([RouteGenerationProgressService], (service: RouteGenerationProgressService) => {
    expect(service).toBeTruthy();
  }));
});
