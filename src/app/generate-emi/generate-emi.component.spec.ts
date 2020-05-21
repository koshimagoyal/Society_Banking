import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateEmiComponent } from './generate-emi.component';

describe('GenerateEmiComponent', () => {
  let component: GenerateEmiComponent;
  let fixture: ComponentFixture<GenerateEmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateEmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
