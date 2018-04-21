import { TestBed, inject } from '@angular/core/testing';

import { ProtectedResourcesService } from './protected-resources.service';

describe('ProtectedResourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProtectedResourcesService]
    });
  });

  it('should be created', inject([ProtectedResourcesService], (service: ProtectedResourcesService) => {
    expect(service).toBeTruthy();
  }));
});
