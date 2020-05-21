import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanEligibilityTableComponent } from './loan-eligibility-table.component';

describe('LoanEligibilityTableComponent', () => {
  let component: LoanEligibilityTableComponent;
  let fixture: ComponentFixture<LoanEligibilityTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanEligibilityTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanEligibilityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
