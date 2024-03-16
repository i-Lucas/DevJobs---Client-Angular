import { TestBed } from '@angular/core/testing';

import { HiringStepProcessService } from './hiring-process.service';

describe('HiringProcessService', () => {
  let service: HiringStepProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiringStepProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
