import { TestBed } from '@angular/core/testing';

import { ConnectionPageService } from './connection-page.service';

describe('ConnectionPageService', () => {
  let service: ConnectionPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
