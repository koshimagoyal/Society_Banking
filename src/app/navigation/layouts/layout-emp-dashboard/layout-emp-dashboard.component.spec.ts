import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEmpDashboardComponent } from './layout-emp-dashboard.component';

describe('LayoutEmpDashboardComponent', () => {
  let component: LayoutEmpDashboardComponent;
  let fixture: ComponentFixture<LayoutEmpDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutEmpDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutEmpDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
