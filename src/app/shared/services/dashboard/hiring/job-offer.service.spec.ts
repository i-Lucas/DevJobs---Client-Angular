import { TestBed } from '@angular/core/testing';

import { SharedJobOfferService } from './job-offer.service';

describe('JobOfferService', () => {
  let service: SharedJobOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedJobOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
