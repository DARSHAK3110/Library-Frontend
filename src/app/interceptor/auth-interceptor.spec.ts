import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth-interceptor';
//import { JwtTokenInterceptor } from './jwt-token.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthInterceptor
      ]
  }));

  it('should create an instance', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});