import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupProfilePageComponent } from './group-profile-page.component';

describe('GroupProfilePageComponent', () => {
  let component: GroupProfilePageComponent;
  let fixture: ComponentFixture<GroupProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupProfilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
