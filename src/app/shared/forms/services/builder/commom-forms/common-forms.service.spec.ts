import { TestBed } from '@angular/core/testing';

import { CommonFormService } from './common-forms.service';

describe('CommonFormsService', () => {
  let service: CommonFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
