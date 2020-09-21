import { TestBed } from '@angular/core/testing';

import { BmManagementService } from './bm-management.service';

describe('BmManagementService', () => {
  let service: BmManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BmManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
