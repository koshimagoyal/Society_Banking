import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanEmiCalculatorComponent } from './loan-emi-calculator.component';

describe('LoanEmiCalculatorComponent', () => {
  let component: LoanEmiCalculatorComponent;
  let fixture: ComponentFixture<LoanEmiCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanEmiCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanEmiCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
