import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth-interceptor';
import { JwtTokenInterceptor } from './jwt-token.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtTokenInterceptor
      ]
  }));

  it('should create an instance', () => {
    const interceptor: JwtTokenInterceptor = TestBed.inject(JwtTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
