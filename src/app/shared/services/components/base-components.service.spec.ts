import { TestBed } from '@angular/core/testing';

import { BaseComponentService } from './base-component.service';

describe('BaseComponentsService', () => {
  let service: BaseComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
