import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditEntryComponent } from './credit-entry.component';

describe('CreditEntryComponent', () => {
  let component: CreditEntryComponent;
  let fixture: ComponentFixture<CreditEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
