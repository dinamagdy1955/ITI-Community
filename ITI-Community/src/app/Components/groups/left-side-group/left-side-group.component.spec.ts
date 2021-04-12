import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSideGroupComponent } from './left-side-group.component';

describe('LeftSideGroupComponent', () => {
  let component: LeftSideGroupComponent;
  let fixture: ComponentFixture<LeftSideGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftSideGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSideGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
