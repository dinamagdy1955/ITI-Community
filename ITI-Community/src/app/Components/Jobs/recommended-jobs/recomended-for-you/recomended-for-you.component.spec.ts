import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendedForYouComponent } from './recomended-for-you.component';

describe('RecomendedForYouComponent', () => {
  let component: RecomendedForYouComponent;
  let fixture: ComponentFixture<RecomendedForYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendedForYouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendedForYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
