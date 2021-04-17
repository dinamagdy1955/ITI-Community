import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteBoxModelComponent } from './write-box-model.component';

describe('WriteBoxModelComponent', () => {
  let component: WriteBoxModelComponent;
  let fixture: ComponentFixture<WriteBoxModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteBoxModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteBoxModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
