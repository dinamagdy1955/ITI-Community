import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterGroupPageComponent } from './center-group-page.component';

describe('CenterGroupPageComponent', () => {
  let component: CenterGroupPageComponent;
  let fixture: ComponentFixture<CenterGroupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterGroupPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
