import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSearchesComponent } from './job-searches.component';

describe('JobSearchesComponent', () => {
  let component: JobSearchesComponent;
  let fixture: ComponentFixture<JobSearchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobSearchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
