import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSideNavItemComponent } from './emp-side-nav-item.component';

describe('EmpSideNavItemComponent', () => {
  let component: EmpSideNavItemComponent;
  let fixture: ComponentFixture<EmpSideNavItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpSideNavItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpSideNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
