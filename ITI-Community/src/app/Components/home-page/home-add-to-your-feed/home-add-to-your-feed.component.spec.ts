import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAddToYourFeedComponent } from './home-add-to-your-feed.component';

describe('HomeAddToYourFeedComponent', () => {
  let component: HomeAddToYourFeedComponent;
  let fixture: ComponentFixture<HomeAddToYourFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAddToYourFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAddToYourFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
