import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSentRequestesPageComponent } from './all-sent-requestes-page.component';

describe('AllSentRequestesPageComponent', () => {
  let component: AllSentRequestesPageComponent;
  let fixture: ComponentFixture<AllSentRequestesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSentRequestesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSentRequestesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
