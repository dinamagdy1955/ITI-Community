import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkSugesstionCardComponent } from './network-sugesstion-card.component';

describe('NetworkSugesstionCardComponent', () => {
  let component: NetworkSugesstionCardComponent;
  let fixture: ComponentFixture<NetworkSugesstionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkSugesstionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkSugesstionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
