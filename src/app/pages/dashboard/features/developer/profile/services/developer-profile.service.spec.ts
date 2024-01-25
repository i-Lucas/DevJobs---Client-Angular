import { TestBed } from '@angular/core/testing';

import { DeveloperProfileService } from './developer-profile.service';

describe('DeveloperProfileService', () => {
  let service: DeveloperProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeveloperProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
