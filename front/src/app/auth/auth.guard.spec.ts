import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
