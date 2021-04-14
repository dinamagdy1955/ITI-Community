/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProfileBodyAccomplishmentsComponent } from './profile-body-Accomplishments.component';

describe('ProfileBodyAccomplishmentsComponent', () => {
  let component: ProfileBodyAccomplishmentsComponent;
  let fixture: ComponentFixture<ProfileBodyAccomplishmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBodyAccomplishmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBodyAccomplishmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
