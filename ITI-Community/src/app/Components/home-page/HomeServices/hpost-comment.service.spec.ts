import { TestBed } from '@angular/core/testing';

import { HPostCommentService } from './hpost-comment.service';

describe('HPostCommentService', () => {
  let service: HPostCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HPostCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
