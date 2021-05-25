import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacificSavedPostComponent } from './spacific-saved-post.component';

describe('SpacificSavedPostComponent', () => {
  let component: SpacificSavedPostComponent;
  let fixture: ComponentFixture<SpacificSavedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacificSavedPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacificSavedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
