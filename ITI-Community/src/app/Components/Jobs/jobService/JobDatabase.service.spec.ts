/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JobDatabaseService } from './JobDatabase.service';

describe('Service: JobDatabase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobDatabaseService]
    });
  });

  it('should ...', inject([JobDatabaseService], (service: JobDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
