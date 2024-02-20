import { TestBed } from '@angular/core/testing';

import { HiringProcessService } from './hiring-process.service';

describe('HiringListService', () => {
  let service: HiringProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiringProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
