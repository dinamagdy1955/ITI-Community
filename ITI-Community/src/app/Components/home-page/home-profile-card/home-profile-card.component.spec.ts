import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProfileCardComponent } from './home-profile-card.component';

describe('HomeProfileCardComponent', () => {
  let component: HomeProfileCardComponent;
  let fixture: ComponentFixture<HomeProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeProfileCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
