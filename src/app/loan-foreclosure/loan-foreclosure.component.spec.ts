import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanForeclosureComponent } from './loan-foreclosure.component';

describe('LoanForeclosureComponent', () => {
  let component: LoanForeclosureComponent;
  let fixture: ComponentFixture<LoanForeclosureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanForeclosureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanForeclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
