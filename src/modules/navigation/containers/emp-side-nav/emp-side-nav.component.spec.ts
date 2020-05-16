import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSideNavComponent } from './emp-side-nav.component';

describe('EmpSideNavComponent', () => {
  let component: EmpSideNavComponent;
  let fixture: ComponentFixture<EmpSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
