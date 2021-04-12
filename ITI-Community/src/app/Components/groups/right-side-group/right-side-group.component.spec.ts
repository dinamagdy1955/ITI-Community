import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideGroupComponent } from './right-side-group.component';

describe('RightSideGroupComponent', () => {
  let component: RightSideGroupComponent;
  let fixture: ComponentFixture<RightSideGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightSideGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSideGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
