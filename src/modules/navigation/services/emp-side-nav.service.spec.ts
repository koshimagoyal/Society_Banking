import { TestBed } from '@angular/core/testing';

import { EmpSideNavService } from './emp-side-nav.service';

describe('EmpSideNavService', () => {
  let service: EmpSideNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpSideNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
