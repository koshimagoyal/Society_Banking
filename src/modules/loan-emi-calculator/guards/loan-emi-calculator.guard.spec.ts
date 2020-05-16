import { TestBed } from '@angular/core/testing';

import { LoanEmiCalculatorGuard } from './loan-emi-calculator.guard';

describe('LoanEmiCalculatorGuard', () => {
  let guard: LoanEmiCalculatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoanEmiCalculatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
