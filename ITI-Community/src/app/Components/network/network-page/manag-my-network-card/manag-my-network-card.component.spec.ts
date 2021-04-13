import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagMyNetworkCardComponent } from './manag-my-network-card.component';

describe('ManagMyNetworkCardComponent', () => {
  let component: ManagMyNetworkCardComponent;
  let fixture: ComponentFixture<ManagMyNetworkCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagMyNetworkCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagMyNetworkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
