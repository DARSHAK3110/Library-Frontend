import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookComponent } from './user-book.component';

describe('UserBookComponent', () => {
  let component: UserBookComponent;
  let fixture: ComponentFixture<UserBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBookComponent]
    });
    fixture = TestBed.createComponent(UserBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
