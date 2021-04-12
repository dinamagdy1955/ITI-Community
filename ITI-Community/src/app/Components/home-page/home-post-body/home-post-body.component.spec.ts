import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePostBodyComponent } from './home-post-body.component';

describe('HomePostBodyComponent', () => {
  let component: HomePostBodyComponent;
  let fixture: ComponentFixture<HomePostBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePostBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePostBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
