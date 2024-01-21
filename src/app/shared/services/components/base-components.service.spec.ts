import { TestBed } from '@angular/core/testing';

import { CommonComponentService } from './base-component.service';

describe('BaseComponentsService', () => {
  let service: CommonComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
