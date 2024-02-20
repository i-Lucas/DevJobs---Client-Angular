import { TestBed } from '@angular/core/testing';

import { HiringProcessFormService } from './new-process.form.service';

describe('NewRecruitmentService', () => {
  let service: HiringProcessFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiringProcessFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
