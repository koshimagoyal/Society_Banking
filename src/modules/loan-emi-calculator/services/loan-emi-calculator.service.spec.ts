import { TestBed } from '@angular/core/testing';

import { LoanEmiCalculatorService } from './loan-emi-calculator.service';

describe('LoanEmiCalculatorService', () => {
  let service: LoanEmiCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanEmiCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
