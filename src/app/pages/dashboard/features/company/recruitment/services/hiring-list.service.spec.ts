import { TestBed } from '@angular/core/testing';

import { HiringListService } from './hiring-list.service';

describe('HiringListService', () => {
  let service: HiringListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiringListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
