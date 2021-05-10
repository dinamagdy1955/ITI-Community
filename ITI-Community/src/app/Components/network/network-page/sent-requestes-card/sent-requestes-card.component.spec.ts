import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentRequestesCardComponent } from './sent-requestes-card.component';

describe('SentRequestesCardComponent', () => {
  let component: SentRequestesCardComponent;
  let fixture: ComponentFixture<SentRequestesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentRequestesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentRequestesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
