import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureViewComponent } from './picture-view.component';

describe('PictureViewComponent', () => {
  let component: PictureViewComponent;
  let fixture: ComponentFixture<PictureViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
