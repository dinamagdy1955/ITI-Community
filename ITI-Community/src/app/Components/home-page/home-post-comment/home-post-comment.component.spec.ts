import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePostCommentComponent } from './home-post-comment.component';

describe('HomePostCommentComponent', () => {
  let component: HomePostCommentComponent;
  let fixture: ComponentFixture<HomePostCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePostCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePostCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
