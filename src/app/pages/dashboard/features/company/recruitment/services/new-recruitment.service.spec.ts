import { TestBed } from '@angular/core/testing';

import { NewRecruitmentService } from './new-recruitment.service';

describe('NewRecruitmentService', () => {
  let service: NewRecruitmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewRecruitmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
