import { TestBed } from '@angular/core/testing';

import { TrackDatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: TrackDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
