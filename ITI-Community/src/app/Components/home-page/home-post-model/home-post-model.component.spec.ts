import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePostModelComponent } from './home-post-model.component';

describe('HomePostModelComponent', () => {
  let component: HomePostModelComponent;
  let fixture: ComponentFixture<HomePostModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePostModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePostModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
