import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FyDividendCalculateComponent } from './fy-dividend-calculate.component';

describe('FyDividendCalculateComponent', () => {
  let component: FyDividendCalculateComponent;
  let fixture: ComponentFixture<FyDividendCalculateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FyDividendCalculateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FyDividendCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
