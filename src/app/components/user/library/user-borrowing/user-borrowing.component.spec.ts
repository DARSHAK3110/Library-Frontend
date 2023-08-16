import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBorrowingComponent } from './user-borrowing.component';

describe('UserBorrowingComponent', () => {
  let component: UserBorrowingComponent;
  let fixture: ComponentFixture<UserBorrowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBorrowingComponent]
    });
    fixture = TestBed.createComponent(UserBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
