import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UamComponent } from './uam.component';

describe('UamComponent', () => {
  let component: UamComponent;
  let fixture: ComponentFixture<UamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
