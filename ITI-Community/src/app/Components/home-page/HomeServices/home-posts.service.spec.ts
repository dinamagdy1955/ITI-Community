import { TestBed } from '@angular/core/testing';

import { HomePostsService } from './home-posts.service';

describe('HomePostsService', () => {
  let service: HomePostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomePostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
