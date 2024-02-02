import { TestBed } from '@angular/core/testing';

import { NewRecruitmentFormService } from './new-recruitment.service';

describe('NewRecruitmentService', () => {
  let service: NewRecruitmentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewRecruitmentFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
