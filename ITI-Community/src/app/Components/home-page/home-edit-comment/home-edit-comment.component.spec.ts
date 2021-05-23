import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEditCommentComponent } from './home-edit-comment.component';

describe('HomeEditCommentComponent', () => {
  let component: HomeEditCommentComponent;
  let fixture: ComponentFixture<HomeEditCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEditCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEditCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
