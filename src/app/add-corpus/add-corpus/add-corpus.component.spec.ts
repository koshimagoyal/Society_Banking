import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCorpusComponent } from './add-corpus.component';

describe('AddCorpusComponent', () => {
  let component: AddCorpusComponent;
  let fixture: ComponentFixture<AddCorpusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCorpusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCorpusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
