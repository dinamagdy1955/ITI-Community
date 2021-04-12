import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWritePostComponent } from './home-write-post.component';

describe('HomeWritePostComponent', () => {
  let component: HomeWritePostComponent;
  let fixture: ComponentFixture<HomeWritePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeWritePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeWritePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
