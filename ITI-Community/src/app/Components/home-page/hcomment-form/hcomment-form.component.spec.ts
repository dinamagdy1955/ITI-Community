import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HCommentFormComponent } from './hcomment-form.component';

describe('HCommentFormComponent', () => {
  let component: HCommentFormComponent;
  let fixture: ComponentFixture<HCommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HCommentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
