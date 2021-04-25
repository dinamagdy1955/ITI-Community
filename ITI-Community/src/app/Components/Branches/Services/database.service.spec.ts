import { TestBed } from '@angular/core/testing';

import { BranchDatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: BranchDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
