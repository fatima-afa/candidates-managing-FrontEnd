import { TestBed } from '@angular/core/testing';

import { PassParamService } from './pass-param.service';

describe('PassParamService', () => {
  let service: PassParamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassParamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
