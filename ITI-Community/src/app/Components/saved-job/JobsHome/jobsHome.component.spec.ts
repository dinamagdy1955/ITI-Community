import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsHome } from './jobsHome.component';

describe('RegistrationPageComponent', () => {
  let component: JobsHome;
  let fixture: ComponentFixture<JobsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsHome ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
