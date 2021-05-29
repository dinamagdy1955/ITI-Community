import { TestBed } from '@angular/core/testing';

import { GroupChatService } from './chats.service';

describe('GroupChatService', () => {
  let service: GroupChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
