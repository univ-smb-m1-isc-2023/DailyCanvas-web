import { TestBed } from '@angular/core/testing';

import { EntryTypeService } from './entry-type.service';

describe('EntryTypeService', () => {
  let service: EntryTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
