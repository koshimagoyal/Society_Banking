import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousPageComponent } from './miscellaneous-page.component';

describe('MiscellaneousPageComponent', () => {
  let component: MiscellaneousPageComponent;
  let fixture: ComponentFixture<MiscellaneousPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
