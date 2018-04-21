import { TestBed, inject } from '@angular/core/testing';

import { IdentityResourcesService } from './identity-resources.service';

describe('IdentityResourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdentityResourcesService]
    });
  });

  it('should be created', inject([IdentityResourcesService], (service: IdentityResourcesService) => {
    expect(service).toBeTruthy();
  }));
});
