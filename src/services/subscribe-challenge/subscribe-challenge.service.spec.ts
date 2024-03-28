import { TestBed } from '@angular/core/testing';

import { SubscribeChallengeService } from './subscribe-challenge.service';

describe('SubscribeChallengeService', () => {
  let service: SubscribeChallengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscribeChallengeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
