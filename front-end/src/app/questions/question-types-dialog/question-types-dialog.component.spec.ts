import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypesDialogComponent } from './question-types-dialog.component';

describe('QuestionTypesDialogComponent', () => {
  let component: QuestionTypesDialogComponent;
  let fixture: ComponentFixture<QuestionTypesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTypesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
