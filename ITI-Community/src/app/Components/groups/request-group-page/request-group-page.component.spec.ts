import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestGroupPageComponent } from './request-group-page.component';

describe('RequestGroupPageComponent', () => {
  let component: RequestGroupPageComponent;
  let fixture: ComponentFixture<RequestGroupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestGroupPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
