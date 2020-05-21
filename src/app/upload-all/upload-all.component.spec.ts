import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAllComponent } from './upload-all.component';

describe('UploadAllComponent', () => {
  let component: UploadAllComponent;
  let fixture: ComponentFixture<UploadAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
