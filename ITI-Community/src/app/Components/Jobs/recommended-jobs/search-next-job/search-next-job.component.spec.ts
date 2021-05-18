import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNextJobComponent } from './search-next-job.component';

describe('SearchNextJobComponent', () => {
  let component: SearchNextJobComponent;
  let fixture: ComponentFixture<SearchNextJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchNextJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNextJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
