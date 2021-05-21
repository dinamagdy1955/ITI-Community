import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHomePostComponent } from './edit-home-post.component';

describe('EditHomePostComponent', () => {
  let component: EditHomePostComponent;
  let fixture: ComponentFixture<EditHomePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHomePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHomePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
