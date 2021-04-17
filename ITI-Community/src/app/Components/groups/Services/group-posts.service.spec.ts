import { TestBed } from '@angular/core/testing';

import { GroupPostsService } from './group-posts.service';

describe('GroupPostsService', () => {
  let service: GroupPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
