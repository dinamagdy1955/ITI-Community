import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkFriendRequestComponent } from './network-friend-request.component';

describe('NetworkFriendRequestComponent', () => {
  let component: NetworkFriendRequestComponent;
  let fixture: ComponentFixture<NetworkFriendRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkFriendRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkFriendRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
