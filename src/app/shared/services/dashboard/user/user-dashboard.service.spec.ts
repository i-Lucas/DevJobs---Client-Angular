import { TestBed } from '@angular/core/testing';

import { SharedDashboardService } from './user-dashboard.service';

describe('UserDashboardService', () => {
  let service: SharedDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
