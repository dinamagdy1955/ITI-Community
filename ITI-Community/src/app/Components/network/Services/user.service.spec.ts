import { TestBed } from '@angular/core/testing';

import { NetworkUserService } from './user.service';

describe('UserService', () => {
  let service: NetworkUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
