import { TestBed } from '@angular/core/testing';

import { CommonSignupService } from './common-signup.service';

describe('CommonSignupService', () => {
  let service: CommonSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
